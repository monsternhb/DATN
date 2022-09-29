class RegisterController {
  // [GET] / history
  index(req, res) {
    res.render("register");
  }

  // [GET] / history / : slug
  show(req, res) {}
}

module.exports = new RegisterController();
