module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.group.update"))
    return next();
  res.forbidden("Group update permission required");
};