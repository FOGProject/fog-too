module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.user.update"))
    return next();
  res.forbidden("User update permission required");
};