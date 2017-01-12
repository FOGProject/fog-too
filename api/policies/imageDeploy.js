module.exports = function(req, res, next) {
  if(_.get(req, "user.role.permissions.stock.image.deploy"))
    return next();
  res.send(401);
};