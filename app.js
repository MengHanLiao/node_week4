var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const options = {
  swaggerOptions: {
    defaultModelsExpandDepth: -1
  }
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

var app = express();
require('./connection');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use(postsRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile, options));

app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "找不到頁面"
  })
});

module.exports = app;
