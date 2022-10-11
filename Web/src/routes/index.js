const historyRouter = require('./history');
const alarmRouter = require('./alarm');
const registerRouter = require('./register');
const homeRouter = require('./home');

function route(app) {
  app.use('/history', historyRouter);
  app.use('/alarm', alarmRouter);
  app.use('/register', registerRouter);
  app.use('/home', homeRouter);
  app.get('/', (req, res) => {
    res.render('login');
  });
}

module.exports = route;
