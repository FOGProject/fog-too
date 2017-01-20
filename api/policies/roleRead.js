module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.role.read"))
    return next();
  res.send(401);
};