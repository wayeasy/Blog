let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

let cateSchema = new mongoose.Schema({
  catename: String,
  orderNum: Number,
  description: String,
  isEnable: Number,
  createDate: Date
})

let cateModel = mongoose.model('cate', cateSchema, 'cate')

// 添加文章分类
router.post('/addCate', (req, res) => {
  let cateInfo = {}
  cateInfo.catename = req.body.catename
  cateInfo.orderNum = req.body.orderNum
  cateInfo.description = req.body.description
  cateInfo.isEnable = req.body.isEnable
  cateInfo.createDate = new Date()
  let cateInstance = new cateModel(cateInfo)
  cateInstance.save(err => {
    if (err) {
      res.send({status: 0, message: err})
    } else {
      res.send({status: 1, message: '添加成功'})
    }
  })
})

// 查询所有分类
router.get('/cateList', (req, res) => {
  let pageindex = parseInt(req.query.pageindex)
  let pagesize = parseInt(req.query.pagesize)
  let keyword = req.query.keyword
  // 分页偏移量
  let offset = (pageindex - 1) * pagesize
  keyword = new RegExp(keyword)
  // 模糊查询多个字段并分页
  cateModel.find({$or:[{"catename" : keyword}]}, (err, cateList) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    res.send({status: 1, message: "请求成功", data: cateList, total: cateList.length})
  }).skip(offset).limit(pagesize)
})

// 删除分类
router.get('/deleteCate', (req, res) => {
  const id = req.query.id
  cateModel.findById(id, (err, cateData) => {
    cateData.remove(err => {
      if (err) {
        res.send({status: 0, message: err})
      } 
      res.send({status: 1, message: '删除成功'})
    })
  })
})

// 根据ID查询分类
router.get('/searchCateById', (req, res) => {
  const id = req.query.id
  cateModel.findById(id, (err, cateData) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    res.send({status: 1, message: '请求成功', data: cateData})
  })
})

// 根据ID修改分类信息
router.post('/updateCateById', (req, res) => {
  const id = req.body._id
  cateModel.findById(id, (err, cateData) => {
    cateData.catename = req.body.catename
    cateData.isEnable = req.body.isEnable
    cateData.description = req.body.description
    cateData.orderNum = req.body.orderNum

    cateData.save(err => {
      if (err) {
        res.send({status: 0, message: err})
      } else {
        res.send({status: 1, message: '修改成功'})
      }
    })
  })
})

module.exports = router