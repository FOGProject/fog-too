module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.user.read"))
    return next();
  res.forbidden("User read permission required");
};