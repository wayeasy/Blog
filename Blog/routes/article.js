let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let multer = require('multer')
let fs = require('fs')
// let upload = multer({dest: 'uploads/'}) //配置文件上传的目录

let articleSchema = new mongoose.Schema({
  artname: String,
  author: String,
  createDate: Date,
  imgSrc: String,
  content: String,
  artCate: String,
  cateId: String
})

let artModel = mongoose.model('article', articleSchema, 'article')

const fileSrc = './public/files/'
// 控制文件存储
let storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, fileSrc);  //文件存放目录
  },
  filename: (req, file, cb) => {
    const extName = file.originalname.substring(file.originalname.lastIndexOf('.'))
    cb(null, file.fieldname + '_' + new Date().getTime() + extName)
  }
})

// 通过storage选项来对上传行为进行定制化
let upload = multer({storage: storage})

// 新增文章
router.post('/addArticle', upload.single("file"),  (req, res) => {
  var fileInfo = req.file
  var filepath = fileInfo.path.toString().replace('public', '')
  // console.log(333, req.body.artCate)
  let artCate = JSON.parse(req.body.artCate)
  let artInfo = {}
  artInfo.artname = req.body.artname
  artInfo.author = req.body.author
  artInfo.createDate = new Date()
  artInfo.imgSrc = filepath
  artInfo.content = req.body.content
  artInfo.artCate = req.body.artCate
  artInfo.cateId = artCate._id
  
  let artInstance = new artModel(artInfo)
  artInstance.save(err => {
    if (err) {
      res.send({status: 0, message: err})
    }
    res.send({status: 1, message: '上传成功'})
  })
})

// 存放文章图片
router.post('/articleImg', upload.single("file"), (req, res) => {
  var fileInfo = req.file
  var filepath = fileInfo.path.toString().replace('public', '')
  res.send({status: 1, url: filepath})
})

// 查询所有文章
router.get('/articleList', (req, res) => {
  let pageindex = parseInt(req.query.pageindex)
  let pagesize = parseInt(req.query.pagesize)
  // 分页偏移量
  let offset = (pageindex - 1) * pagesize
  let keyword = req.query.keyword
  keyword = new RegExp(keyword)
  
  // 模糊查询多个字段并分页
  artModel.find({$or:[{"artname": keyword}, {content: keyword}, {author: keyword}]}, (err, artList) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    artModel.count({}, (err, count) => {
      res.send({status: 1, message: "请求成功", data: artList, total: count})
    })
    
  }).skip(offset).limit(pagesize)
})

// 删除文章
router.get('/deleteArticle', (req, res) => {
  const id = req.query.id
  artModel.findById(id, (err, artData) => {
    artData.remove(err => {
      if (err) {
        res.send({status: 0, message: err})
      } 
      res.send({status: 1, message: '删除成功'})
    })
  })
})

// 删除指定分类下的所有文章
router.get('/deleteArticleByCate', (req, res) => {
  const cateId = req.query.cateId
  artModel.remove({cateId: cateId}, err => {
    if (err) {
      res.send({status: 0, message: err})
    } 
    res.send({status: 1, message: '删除成功'})
  })
})

// 根据ID查询文章
router.get('/searchArtById', (req, res) => {
  const id = req.query.id
  artModel.findById(id, (err, artData) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    res.send({status: 1, message: '请求成功', data: artData})
  })
})

// 查询分类下的所有文章
router.get('/searchArtByCate', (req, res) => {
  let pageindex = parseInt(req.query.pageindex)
  let pagesize = parseInt(req.query.pagesize)
  // 分页偏移量
  let offset = (pageindex - 1) * pagesize

  const cateId = req.query.cateId
  artModel.find({cateId: cateId}, (err, artData) => {
    if (err) {
      res.send({status: 0, message: err})
    }
    artModel.count({cateId: cateId}, (err, count) => {
      res.send({status: 1, message: "请求成功", data: artData, total: count})
    })
    // res.send({status: 1, message: '请求成功', data: artData, total: artData.length})
  }).skip(offset).limit(pagesize)
  
})

// 根据ID修改文章(没有修改文章封面)
router.post('/updateArtById', (req, res) => {
  const id = req.body._id
  artModel.findById(id, (err, artData) => {
    artData.artname = req.body.artname
    artData.author = req.body.author
    artData.content = req.body.content
    artInfo.artCate = req.body.artCate
    artData.save(err => {
      if (err) {
        res.send({status: 0, message: err})
      } else {
        res.send({status: 1, message: '修改成功'})
      }
    })
  })
})

// 修改文章(修改了文章封面)
router.post('/updateArticle', upload.single("file"),  (req, res) => {
  var fileInfo = req.file
  var filepath = fileInfo.path.toString().replace('public', '')
  const id = req.body.id
  artModel.findById(id, (err, artData) => {
    artData.artname = req.body.artname
    artData.author = req.body.author
    artData.content = req.body.content
    artData.imgSrc = filepath
    artData.artCate = req.body.artCate
    artData.save(err => {
      if (err) {
        res.send({status: 0, message: err})
      } else {
        res.send({status: 1, message: '修改成功'})
      }
    })
  })
  
})

module.exports = router