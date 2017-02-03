module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.host.read"))
    return next();
  res.forbidden("Host read permission required");
};