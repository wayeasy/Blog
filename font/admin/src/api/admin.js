import axios from '@/libs/api.request'

// 新增管理员
export const addAdminApi = (formData) => {
  return axios.request({
    url: '/admin/addAdmin',
    method: 'post',
    data: formData
  })
}

// 查询所有管理员
export const getAdminListApi = (params) => {
  let data = {}
  data.pageindex = params.pageindex
  data.pagesize = params.pagesize
  data.keyword = params.keyword
  return axios.request({
    url: '/admin/adminList',
    method: 'get',
    params: data
  })
}

// 根据ID删除管理员
export const deleteAdminApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/admin/deleteAdmin',
    method: 'get',
    params: data
  })
}

// 根据ID获取管理员信息
export const getAdminInfoByIdApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/admin/searchAdminById',
    method: 'get',
    params: data
  })
}

// 根据ID修改管理员信息
export const updateAdminByIdApi = (formDate) => {
  return axios.request({
    url: '/admin/updateAdminById',
    method: 'post',
    data: formDate
  })
}

// 查询用户名是否被注册
export const isRegisteApi = (username) => {
  return axios.request({
    url: '/admin/isRegiste',
    method: 'get',
    params: {
      username: username
    }
  })
}

// 登录
export const loginApi = (data) => {
  return axios.request({
    url: '/admin/login',
    method: 'get',
    params: data
  })
}

// 判断用户是否登录
export const isLoginApi = (data) => {
  return axios.request({
    url: '/admin/isLogin',
    headers: {
      user_token: data.user_token
    },
    method: 'get',
    params: {
      id: data.id
    }
  })
}