const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;
const publicPath = path.join(__dirname, '../assets'); // set static folder when they try to look up
const route = require('../routes');

app.use(express.static(publicPath));

// connect to db
const db = require('../config/db');
db.connect();
// Add middleware
app.use(express.urlencoded({ extended: true }));

//handle js post
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine

app.engine('hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// console.log("a", path.join(__dirname, "../assets/css/base.css"));

// route init
route(app);

//route

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
