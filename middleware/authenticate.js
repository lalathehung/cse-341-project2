const isAuthenticated = (req, res, next) => {
    console.log("--- Auth Check Triggered ---");
    console.log("Session User Data:", req.session.user);
    
    // return res.status(401).json("Auth Middleware is working!"); 

    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access.");
    }
    next();
};

module.exports = { isAuthenticated };