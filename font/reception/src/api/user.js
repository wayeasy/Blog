import axios from '@/libs/api.request'

export const getUserList = (params) => {
  let data = {}
  data.pageindex = params.pageindex
  data.pagesize = params.pagesize
  data.keyword = params.keyword
  return axios.request({
    url: '/users/userList',
    method: 'get',
    params: data
  })
}

export const deleteUserApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/users/deleteUser',
    headers: {
      'cms-token': localStorage.getItem('aimy_cms_token'),
      'cms-channel': 0
    },
    method: 'get',
    params: data
  })
}

export const getUserInfoByIdApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/users/searchUserById',
    method: 'get',
    params: data
  })
}

export const updateUserByIdApi = (formDate) => {
  return axios.request({
    url: '/users/updateUserById',
    method: 'post',
    data: formDate
  })
}

export const addUserApi = (formData) => {
  return axios.request({
    url: '/users/addUser',
    method: 'post',
    data: formData
  })
}

export const loginApi = (formData) => {
  return axios.request({
    url: '/users/login',
    method: 'post',
    data: formData
  })
}

// 判断用户名是否被注册
export const isRegApi = (data) => {
  return axios.request({
    url: '/users/isReg',
    method: 'get',
    params: data
  })
}


