var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signupForm");
};

exports.login = function(req, res) {
  res.render("login");
};
exports.homePage = function(req, res) {
  res.render("homePage");
};
exports.servicesList = function(req, res) {
  res.render("servicesList");
};
exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
exports.workersList = function(req, res) {
  res.render("/workersList/:service");
};
exports.workersListMap = function(req, res) {
  res.render("/workersListMap/:zip_code");
};
exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};