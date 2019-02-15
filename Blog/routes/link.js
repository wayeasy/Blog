let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

let linkSchema = new mongoose.Schema({
  linkname: String,
  linkurl: String,
  stationmaster: String,
  createDate: Date
})

let linkModel = mongoose.model('link', linkSchema, 'link')

// 新增链接
router.post('/addLink', (req, res) => {
  let linkInfo = {}
  linkInfo.linkname = req.body.linkname
  linkInfo.stationmaster = req.body.stationmaster
  linkInfo.linkurl = req.body.linkurl
  linkInfo.createDate = new Date()

  let linkInstanse = new linkModel(linkInfo)

  linkInstanse.save(err => {
    if (err) {
      res.send({status: 0, message: err})
    }
    res.send({status: 1, message: '添加成功'})
  })
})

// 查询所有链接
router.get('/linkList', (req, res) => {
  let pageindex = parseInt(req.query.pageindex)
  let pagesize = parseInt(req.query.pagesize)
  let keyword = req.query.keyword
  // 分页偏移量
  let offset = (pageindex - 1) * pagesize
  keyword = new RegExp(keyword)
  // 模糊查询多个字段并分页
  linkModel.find({$or:[{"linkname": keyword}, {linkurl: keyword}, {stationmaster: keyword}]}, (err, linkList) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    res.send({status: 1, message: "请求成功", data: linkList, total: linkList.length})
  }).skip(offset).limit(pagesize)
})

// 删除链接
router.get('/deleteLink', (req, res) => {
  const id = req.query.id
  linkModel.findById(id, (err, linkData) => {
    linkData.remove(err => {
      if (err) {
        res.send({status: 0, message: err})
      } 
      res.send({status: 1, message: '删除成功'})
    })
  })
})

// 根据ID查询链接
router.get('/searchLinkById', (req, res) => {
  const id = req.query.id
  linkModel.findById(id, (err, linkData) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    res.send({status: 1, message: '请求成功', data: linkData})
  })
})

// 根据ID修改链接
router.post('/updateLinkById', (req, res) => {
  const id = req.body._id
  linkModel.findById(id, (err, linkData) => {
    linkData.linkname = req.body.linkname
    linkData.linkurl = req.body.linkurl
    linkData.stationmaster = req.body.stationmaster
    
    linkData.save(err => {
      if (err) {
        res.send({status: 0, message: err})
      } else {
        res.send({status: 1, message: '修改成功'})
      }
    })
  })
})

module.exports = router