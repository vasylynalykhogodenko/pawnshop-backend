const passport = require('passport');
const authenticateJWT = passport.authenticate('jwt', { session: false });

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRole };