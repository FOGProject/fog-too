module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.ipxe.update"))
    return next();
  res.forbidden("iPXE update permission required");
};
