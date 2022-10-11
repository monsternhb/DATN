const historyRouter = require('./history');
const alarmRouter = require('./alarm');
const registerRouter = require('./register');
const homeRouter = require('./home');
const loginRouter = require('./login');

function route(app) {
  app.use('/history', historyRouter);
  app.use('/alarm', alarmRouter);
  app.use('/register', registerRouter);
  app.use('/home', homeRouter);
  app.use('/', loginRouter);
}

module.exports = route;
