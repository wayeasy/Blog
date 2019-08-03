import axios from '@/libs/api.request'

// 新增分类
export const addArticleApi = (formData) => {
  return axios.request({
    url: '/article/addArticle',
    method: 'post',
    data: formData
  })
}

// 查询所有文章
export const getArtListApi = (params) => {
  let data = {}
  data.pageindex = params.pageindex
  data.pagesize = params.pagesize
  data.keyword = params.keyword
  return axios.request({
    url: '/article/articleList',
    method: 'get',
    params: data
  })
}

// 查询所有分类
export const getAllCateListApi = () => {
  return axios.request({
    url: '/cate/allCateList',
    method: 'get'
  })
}

// 根据ID删除文章
export const deleteArticleApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/article/deleteArticle',
    method: 'get',
    params: data
  })
}

// 根据ID获取文章信息
export const getArtInfoByIdApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/article/searchArtById',
    method: 'get',
    params: data
  })
}

// 根据文章分类获取所有文章
export const getArtInfoByCateApi = (params) => {
  // let data = {}
  // data.pageindex = params.pageindex
  // data.pagesize = params.pagesize
  // data.cateId = id
  return axios.request({
    url: '/article/searchArtByCate',
    method: 'get',
    params: params
  })
}

// 根据ID修改文章信息(没有修改文章封面)
export const updateArtByIdApi = (formData) => {
  return axios.request({
    url: '/article/updateArtById',
    method: 'post',
    data: formData
  })
}
// 根据ID修改文章信息(修改文章封面)
export const updateArticleApi = (formData) => {
  return axios.request({
    url: '/article/updateArticle',
    method: 'post',
    data: formData
  })
}