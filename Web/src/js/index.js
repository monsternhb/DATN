const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const publicPath = path.join(__dirname, '../assets'); // set static folder when they try to look up
const route = require('../routes');
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(publicPath));
app.use(methodOverride('_method'));
// connect to db
const db = require('../config/db');
db.connect();
// Add middleware
app.use(express.urlencoded({ extended: true }));

//handle js post
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Cookie
app.use(cookieParser());

// Template engine

app.engine(
  'hbs',
  hbs.engine({
    extname: '.hbs',

    helpers: {
      formatDate(time) {
        let newTime = String(time);
        let index = newTime.indexOf('(');
        return newTime.slice(0, index);
      },

      foo() {
        return 'Foo';
      },
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// console.log("a", path.join(__dirname, "../assets/css/base.css"));

// route init
route(app);

// socket connection
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('client message', msg => {
    console.log('Click ' + msg + ' from Web client');
  });
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
