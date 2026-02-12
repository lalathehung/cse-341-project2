const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
   console.log('Logout requested. Session before:', req.session.user);

   req.logout((err) => {
      if (err) {
         console.log('Logout error:', err);
         return res.status(500).json({ error: 'Logout failed' });
      }

      req.session.destroy((err) => {
         if (err) {
            console.log('Session destroy error:', err);
            return res.status(500).json({ error: 'Session destroy failed' });
         }

         res.clearCookie('connect.sid', { 
            path: '/', 
            httpOnly: true, 
            secure: true,  
            sameSite: 'none'
         });
         req.session = null;
         console.log('Logout successful');
         res.redirect('/');
      });
   });
});

router.get('/', (req, res) => {
   res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
});

router.get('/login', passport.authenticate('github'));

router.use('/books', require('./books'));
router.use('/categories', require('./categories'));

module.exports = router;