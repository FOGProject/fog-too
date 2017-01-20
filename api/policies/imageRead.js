module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.image.read"))
    return next();
  res.send(401);
};