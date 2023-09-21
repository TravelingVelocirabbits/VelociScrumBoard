const router = require('./routes/Router');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const session = require('express-session');
const request = require('request-promise');

const PORT = 3000;
const app = express();

// connect with mongoose database
mongoose
  .connect(
    'mongodb+srv://connorelikeyes:D36U8CGSL5maEh9h@cluster0.vxtr5rx.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

//handles parsing data & allows form data requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: true
}))

//statically serve everything in dist folder on static call
app.use(express.static(path.join(__dirname, '../dist')));
app.use(
  '/stylesheets',
  express.static(path.join(__dirname, '../client/stylesheets'))
);

//serves dynamic clientside rendered page for /board
app.get('/board', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


//Router to serve middleware & response
app.use('/route', router);




//Global error handler
app.use((req, res) =>
  res.status(404).send('Status Code 404: Page not found...')
);
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred in global error handler' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(PORT, () =>
  console.log('Listening in on PORT: ', PORT)
);
