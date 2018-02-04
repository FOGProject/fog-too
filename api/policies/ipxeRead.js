module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.ipxe.read"))
    return next();
  res.forbidden("iPXE read permission required");
};
