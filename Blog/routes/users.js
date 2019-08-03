const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const redis = require('redis')
const client = redis.createClient('6379', '120.77.220.214');

// 定义集合骨架
const usersSchema = new mongoose.Schema({
  username: String,
  age: Number,
  email: String,
  sex: Number,
  address: String,
  createDate: Date,
  password: String
})

// 得到骨架模型
const usersModel = mongoose.model('users', usersSchema, 'users')

// 添加用户
router.post('/addUser', (req, res) => {
  let userInfo = {}
  userInfo.username = req.body.username
  userInfo.age = req.body.age
  userInfo.email = req.body.email
  userInfo.sex = req.body.sex
  userInfo.address = req.body.address
  userInfo.password = req.body.password
  userInfo.createDate = new Date()
  var usersInstance = new usersModel(userInfo)
  usersInstance.save(err => {
    if (err) {
      res.json({status: 0, message: '添加失败!'})
    } else {
      res.json({status: 1, message: '添加成功!'})
    }
  })
})

// 查询所有用户
router.get('/userList', (req, res) => {
  let pageindex = parseInt(req.query.pageindex)
  let pagesize = parseInt(req.query.pagesize)
  let keyword = req.query.keyword
  // 分页偏移量
  let offset = (pageindex - 1) * pagesize
  keyword = new RegExp(keyword)
  // 模糊查询多个字段并分页
  usersModel.find({$or:[{"username" : keyword}, {"address" : keyword}, {"email" : keyword}]}, (err, userList) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    res.send({status: 1, message: "请求成功", data: userList, total: userList.length})
  }).skip(offset).limit(pagesize)
})

// 删除用户
router.get('/deleteUser', (req, res) => {
  const id = req.query.id
  usersModel.findById(id, (err, userData) => {
    userData.remove(err => {
      if (err) {
        res.send({status: 0, message: err})
      } 
      res.send({status: 1, message: '删除成功'})
    })
  })
})

// 根据ID查询用户信息
router.get('/searchUserById', (req, res) => {
  const id = req.query.id
  usersModel.findById(id, (err, userData) => {
    if (err) {
      res.send({status: 0, message: '请求失败'})
    }
    res.send({status: 1, message: '请求成功', data: userData})
  })
})

// 判断用户是否登录
router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  usersModel.find({"username": username, "password": password}, (err, userInfo) => {
    if (err) {
      res.send({status: 0, message: '请求失败'})
    }
    if (userInfo.length < 1) {
      res.send({status: 0, message: '登录失败,请先注册'})
    } else {
      const user_token = userInfo[0]._id + new Date().getTime()
      client.set(`user_token:${userInfo[0]._id}`, user_token, redis.print);
      res.send({status: 1, message: '登录成功', user_token: user_token})
    }
    
  })
})

// 判断用户名是否被注册
router.get('/isReg', (req, res) => {
  const username = req.query.username
  usersModel.find({username: username}, (err, userLsit) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    if (userLsit.length > 0) {
      res.send({status: 2, message :'该用户名已被注册'})
    } else {
      res.send({status: 1, message :'该用户名未被注册'})
    }
  })
})


// 根据ID修改用户信息
router.post('/updateUserById', (req, res) => {
  const id = req.body._id
  usersModel.findById(id, (err, userData) => {
    userData.username = req.body.username
    userData.age = req.body.age
    userData.email = req.body.email
    userData.sex = req.body.sex
    userData.address = req.body.address
    userData.password = req.body.password

    userData.save(err => {
      if (err) {
        res.send({status: 0, message: '修改失败'})
      } else {
        res.send({status: 1, message: '修改成功'})
      }
    })
  })
})

module.exports = router;
