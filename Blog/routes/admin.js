let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
const redis = require('redis')
// const client = redis.createClient('6379', '127.0.0.1');
const client = redis.createClient('6379', '120.77.220.214');

const adminSchema = new mongoose.Schema({
  username: String,
  age: Number,
  email: String,
  sex: Number,
  address: String,
  createDate: Date,
  password: String,
  synopsis: String
})

let adminModel = mongoose.model('admin', adminSchema, 'admin')

// 添加管理员
router.post('/addAdmin', (req, res) => {
  let adminInfo = {}
  adminInfo.username = req.body.username
  adminInfo.age = req.body.age
  adminInfo.email = req.body.email
  adminInfo.sex = req.body.sex
  adminInfo.address = req.body.address
  adminInfo.password = req.body.password
  adminInfo.createDate = new Date()
  adminInfo.synopsis = req.body.synopsis
  var adminInstance = new adminModel(adminInfo)
  adminInstance.save(err => {
    if (err) {
      res.json({status: 0, message: '添加失败!'})
    } else {
      res.json({status: 1, message: '添加成功!'})
    }
  })
})

// 查询所有管理员
router.get('/adminList', (req, res) => {
  let pageindex = parseInt(req.query.pageindex)
  let pagesize = parseInt(req.query.pagesize)
  let keyword = req.query.keyword
  // 分页偏移量
  let offset = (pageindex - 1) * pagesize
  keyword = new RegExp(keyword)
  // 模糊查询多个字段并分页
  adminModel.find({$or:[{"username" : keyword}, {"address" : keyword}, {"email" : keyword}]}, (err, adminList) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    res.send({status: 1, message: "请求成功", data: adminList, total: adminList.length})
  }).skip(offset).limit(pagesize)
})

// 删除管理员
router.get('/deleteAdmin', (req, res) => {
  const id = req.query.id
  adminModel.findById(id, (err, adminData) => {
    adminData.remove(err => {
      if (err) {
        res.send({status: 0, message: err})
      } 
      res.send({status: 1, message: '删除成功'})
    })
  })
})

// 根据ID查询管理员信息
router.get('/searchAdminById', (req, res) => {
  const id = req.query.id
  adminModel.findById(id, (err, adminData) => {
    if (err) {
      res.send({status: 0, message: '请求失败'})
    }
    res.send({status: 1, message: '请求成功', data: adminData})
  })
})

// 判断是否已有人注册过该用户名
router.get('/isRegiste', (req, res) => {
  const username = req.query.username
  adminModel.find({username: username}, (err, adminData) => {
    if (adminData.length > 0) {
      res.send({status: 1, message: '该用户名已被注册'})
    } else {
      res.send({status: 0, message: '该用户名未被注册'})
    }
  })
})

// 根据ID修改管理员信息
router.post('/updateAdminById', (req, res) => {
  const id = req.body._id
  adminModel.findById(id, (err, adminData) => {
    adminData.username = req.body.username
    adminData.age = req.body.age
    adminData.email = req.body.email
    adminData.sex = req.body.sex
    adminData.address = req.body.address
    adminData.password = req.body.password
    adminData.synopsis = req.body.synopsis
    adminData.save(err => {
      if (err) {
        res.send({status: 0, message: '修改失败'})
      } else {
        res.send({status: 1, message: '修改成功'})
      }
    })
  })
})

// 登录
router.get('/login', (req, res) => {
  const username = req.query.username
  const password = req.query.password
  adminModel.find({username: username, password: password}, (err, adminList) => {
    if (err) {
      res.send({status: 0, message: '请求失败'})
    }
    if (adminList.length < 1) {
      res.send({status: 2, message: '该用户不是管理员'})
    } else { 
      client.select("0", function (error) {
        if (error) {
            console.log(error);
        } else {
            // client.set("node_redis_key", JSON.stringify({ "name": "wolfy", age: 28 }), function (error, res) {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log(res);
            //     };
            //     //操作完成，关闭redis连接
            //     
            // });
            const user_token = adminList[0]._id + new Date().getTime()
            client.set(`user_token:${adminList[0]._id}`, user_token, redis.print)
            // 设置redis user_token过期时间
            client.expire(`user_token:${adminList[0]._id}`, 1800);
            // client.end(true);
            res.send({status: 1, message: '登录成功', user_token: user_token, id: adminList[0]._id})
        };
      });
    }
  })
})

// 用户是否登录
router.get('/isLogin', (req, res) => {
  const id = req.query.id
  const user_token = req.headers.user_token
  client.select("0", (err) => {
    if (err) {
      res.status('500').send()
    } else {
      client.get(`user_token:${id}`, (err, resp) => {
        if (err) {
          res.status('500').send()
        } else {
          if (resp == null) {
            res.send({status: 2, message: '登录过期,请重新登录', resp: resp})
          } else {
            if (resp != user_token) {
              // console.log('resp', resp)
              // console.log('user_token', user_token)
              res.send({status: 3, message: '登录过期,请重新登录', resp: resp, user_token: user_token})
            } else {
              res.status('200').send({status: 1, message: '已登录'})
            }
          }
        }
      })
    }
  })
})

module.exports = router;