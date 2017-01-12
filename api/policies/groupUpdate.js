module.exports = function(req, res, next) {
  if(_.get(req, "user.role.permissions.stock.group.update"))
    return next();
  res.send(401);
};