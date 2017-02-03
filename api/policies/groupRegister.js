module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.group.register"))
    return next();
  res.forbidden("Group register permission required");
};