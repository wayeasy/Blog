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

