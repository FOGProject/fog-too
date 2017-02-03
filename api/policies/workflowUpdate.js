module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.workflow.update"))
    return next();
  res.forbidden("Workflow update permission required");
};