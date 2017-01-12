module.exports = function(req, res, next) {
  if(_.get(req, "user.role.permissions.stock.host.read"))
    return next();
  res.send(401);
};