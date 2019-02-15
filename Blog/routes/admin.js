let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

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

module.exports = router;