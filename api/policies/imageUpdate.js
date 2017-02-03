module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.image.update"))
    return next();
  res.forbidden("Image update permission required");
};