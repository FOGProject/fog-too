module.exports = function(req, res, next) {
  if(_.get(req, "user.role.permissions.stock.workflow.create"))
    return next();
  res.send(401);
};