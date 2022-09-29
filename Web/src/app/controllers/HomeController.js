class HomeController {
  // [GET] / history
  index(req, res) {
    res.render("home");
  }

  // [GET] / history / : slug
  show(req, res) {}
}

module.exports = new HomeController();
