var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const cors = require('cors');

// 引入路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 创建express实例
var app = express();



// view engine setup
// 设置使用ejs模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件的使用
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用路由文件
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 捕获异常和错误
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 错误时执行的句柄函数
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/Blog', err => {
  if (err) {
    console.error('数据库链接失败!' + err)
  } else {
    console.log('数据库链接成功!')
  }
})

// 监听端口
app.listen(9000, () => {
  console.log('http://127.0.0.1:9000')
})

// 导出express实例
module.exports = app;
