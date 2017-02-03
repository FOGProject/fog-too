module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.image.read"))
    return next();
  res.forbidden("Image read permission required");
};