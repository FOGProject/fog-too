module.exports = function(req, res, next) {
  if(_.get(req, "user.role.permissions.stock.image.destroy"))
    return next();
  res.send(401);
};