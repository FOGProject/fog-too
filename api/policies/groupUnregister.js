module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.group.unregister"))
    return next();
  res.forbidden("Group unregister permission required");
};