const historyRouter = require('./history');
const alarmRouter = require('./alarm');
const registerRouter = require('./register');
const homeRouter = require('./home');
const loginRouter = require('./login');
const adminRouter = require('./admin');
const deviceRouter = require('./device');
const supplierRouter = require('./supplier');


function route(app) {
  app.use('/history', historyRouter);
  app.use('/alarm', alarmRouter);
  app.use('/register', registerRouter);
  app.use('/home', homeRouter);
  app.use('/admin', adminRouter);
  app.use('/supplier', supplierRouter);
  app.use('/device', deviceRouter);
  app.use('/', loginRouter);
}

module.exports = route;
