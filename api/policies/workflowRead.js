module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.workflow.read"))
    return next();
  res.forbidden("Workflow read permission required");
};