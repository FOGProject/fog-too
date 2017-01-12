module.exports = function(req, res, next) {
  if(_.get(req, "user.role.permissions.stock.image.capture"))
    return next();
  res.send(401);
};