class AlarmController {
  // [GET] / alarm
  index(req, res) {
    res.render("alarm");
  }


}

module.exports = new AlarmController();
