module.exports = function(req, res, next) {
  if(_.get(req, "user.role.permissions.stock.role.assign"))
    return next();
  res.send(401);
};