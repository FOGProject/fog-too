module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.image.destroy"))
    return next();
  res.forbidden("Image destroy permission required");
};