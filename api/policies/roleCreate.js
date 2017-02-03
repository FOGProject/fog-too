module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.role.create"))
    return next();
  res.forbidden("Role create permission required");
};