module.exports = function(req, res, next) {
  if(_.get(req, "user.permissions.stock.workflow.destroy"))
    return next();
  res.forbidden("Workflow destroy permission required");
};