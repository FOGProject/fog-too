module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.role.destroy"))
    return next();
  res.send(401);
};