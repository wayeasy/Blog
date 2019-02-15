import axios from '@/libs/api.request'

// 新增分类
export const addCateApi = (formData) => {
  return axios.request({
    url: '/cate/addCate',
    method: 'post',
    data: formData
  })
}

// 查询所有分类
export const getCateListApi = (params) => {
  let data = {}
  data.pageindex = params.pageindex
  data.pagesize = params.pagesize
  data.keyword = params.keyword
  return axios.request({
    url: '/cate/cateList',
    method: 'get',
    params: data
  })
}

// 根据ID删除分类
export const deleteCateApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/cate/deleteCate',
    method: 'get',
    params: data
  })
}

// 根据ID获取分类信息
export const getCateInfoByIdApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/cate/searchCateById',
    method: 'get',
    params: data
  })
}

// 根据ID修改分类信息
export const updateCateByIdApi = (formData) => {
  return axios.request({
    url: '/cate/updateCateById',
    method: 'post',
    data: formData
  })
}