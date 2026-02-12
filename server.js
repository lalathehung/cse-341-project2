const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Session 
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));

// Passport 
app.use(passport.initialize());
app.use(passport.session());

// CORS setting
app.use(cors({ 
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: '*' 
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// 5. Passport GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', 
    session: true 
}),
(req, res) => {
    
    req.session.user = req.user; 
    res.redirect('/');
});

// Swagger UI 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API 
app.use('/', require('./routes/index.js'));

// Database
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