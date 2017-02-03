module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.host.update"))
    return next();
  res.forbidden("Host update permission required");
};