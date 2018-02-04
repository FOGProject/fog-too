module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.ipxe.create"))
    return next();
  res.forbidden("iPXE create permission required");
};
