const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const port = 3000;
const methodOverride = require('method-override');
const publicPath = path.join(__dirname, '../assets'); // set static folder when they try to look up
const route = require('../routes');
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const mqtt = require('mqtt');

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
        let index = newTime.indexOf('G');
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

//mqtt connection
const host = 'broker.mqttdashboard.com';
const portMqtt = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${portMqtt}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

// socket connection
io.on('connection', socket => {
  console.log('a user connected');

  // receive msg control plc from client
  socket.on('client message', msg => {
    // pulish msg to mqtt topic = controlplc
    client.publish('controlplc', msg, { qos: 0, retain: false }, error => {
      if (error) {
        console.error(error);
      }
    });

    console.log('Click ' + msg + ' from Web client');
  });

  // receive msg total product from client
  socket.on('client message01', msg => {
    //pulish msg to mqtt topic = totalX
    client.publish(
      msg.publicName,
      msg.publicValue,
      { qos: 0, retain: false },
      error => {
        if (error) {
          console.error(error);
        }
      }
    );
    console.log(msg.publicName, msg.publicValue);
  });
});

client.on('connect', () => {
  console.log('Mqtt Connected');
});

// subcribe topic followplc
const topicSub = ['quantityS1', 'quantityS2', 'quantityS3'];
topicSub.forEach(topic => {
  client.subscribe(topic, () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
});

// receive msg from topic follow plc
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString());
  const topicSever = topic;
  const msg = payload.toString();
  // send to client
  io.emit(topicSever, msg);
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
