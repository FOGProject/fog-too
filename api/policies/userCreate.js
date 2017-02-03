module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.user.create"))
    return next();
  res.forbidden("User create permission required");
};