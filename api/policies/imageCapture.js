module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.image.capture"))
    return next();
  res.send(401);
};