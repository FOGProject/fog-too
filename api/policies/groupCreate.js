module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.group.create"))
    return next();
  res.forbidden("Group create permission required");
};