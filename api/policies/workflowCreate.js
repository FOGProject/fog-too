module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.workflow.create"))
    return next();
  res.forbidden("Workflow create permission required");
};