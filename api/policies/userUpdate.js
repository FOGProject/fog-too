module.exports = function(req, res, next) {
  if(_.get(req, "user.role.permissions.stock.user.update"))
    return next();
  res.send(401);
};