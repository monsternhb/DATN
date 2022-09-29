class AlarmController {
  // [GET] / history
  index(req, res) {
    res.render("alarm");
  }

  // [GET] / history / : slug
  show(req, res) {}
}

module.exports = new AlarmController();
