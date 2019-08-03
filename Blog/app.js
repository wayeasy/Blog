var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const cors = require('cors');
const cookieParaser = require('cookie-parser');
const session = require('express-session');

const redis = require('redis')
const client = redis.createClient('6379', '120.77.220.214');

// 连接redis失败
client.on("error", function(error) {
  console.log(error);
  `user_token:${ud}`
});

// 连接redis成功
client.on("ready", function(info) {
  console.log('redis连接成功');
  // `user_token:${ud}`
});

// 引入路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin')
var cateRouter = require('./routes/cate')
var artRouter = require('./routes/article')
var linkRouter = require('./routes/link')

// 创建express实例
var app = express();
app.use(cookieParaser());
app.use(session({
  secret:'keyboard cat', //值可以随便取
  resave:false,
  saveUninitialized:true,
  cookie:{
    // maxAge:1000*60*30
    secure: false
  },
  rolling:true //只要页面由刷新，session值就会被保存，如果为false则只要半小时以后不管有没有操作，session都会消失
}));
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
app.use('/admin', adminRouter)
app.use('/cate', cateRouter)
app.use('/article', artRouter)
app.use('/link', linkRouter)

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

app.all('*', function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"); 
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
  res.header('Access-Control-Allow-Credentials', 'true'); 
  res.header("X-Powered-By",' 3.2.1') 
  next(); 
});

// // 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/Blog', err => {
  if (err) {
    console.error('数据库链接失败!' + err)
  } else {
    console.log('数据库链接成功!')
  }
})

// 账号密码连接数据库
// mongoose.connect('mongodb://BlogAdmin:Buwangchuxin.1@localhost:27017/Blog?authSource=Blog', err => {
//   if (err) {
//     res.send('数据库链接失败!' + err)
//   } else {
//     console.log('数据库链接成功!')
//   }
// })
// 监听端口
app.listen(9000, () => {
  console.log('http://127.0.0.1:9000')
})

// 导出express实例
module.exports = app;
