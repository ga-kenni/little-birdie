
function requireLoggedIn(req, res, next) {
    if (req.session.userId) {
      next()
    } else {
      res.status(403).json({message: 'Not logged in'})
    }
}

module.exports = requireLoggedIn