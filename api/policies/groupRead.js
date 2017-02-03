module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.group.read"))
    return next();
  res.forbidden("Group read permission required");
};