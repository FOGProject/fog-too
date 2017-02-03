module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.image.create"))
    return next();
  res.forbidden("Image create permission required");
};