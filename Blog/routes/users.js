const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

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
      res.json({code: 0, message: '添加失败!'})
    } else {
      res.json({code: 1, message: '添加成功!'})
    }
  })
})

module.exports = router;
