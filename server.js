const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false ,
        saveUninitialized: true ,
    }))
    //This is the basic express session({..}) initialization.
    .use(passport.initialize())
    //init passport on every route call.
    .use(passport.session())
    //allow passport to use "express-session"
    // // CORS
    .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Routes
app.use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
app.use(cors({ origin: '*'}))
app.use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //user.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    //});
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: 'api-docs', session: false}),
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and running on port ${port}`);
            console.log(`Swagger UI: http://localhost:${port}/api-docs`);
        });
    }
});