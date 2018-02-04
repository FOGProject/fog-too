module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.ipxe.destroy"))
    return next();
  res.forbidden("iPXE destroy permission required");
};
