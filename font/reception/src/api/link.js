import axios from '@/libs/api.request'

export const addLinkApi = (formData) => {
  return axios.request({
    url: '/link/addLink',
    method: 'post',
    data: formData
  })
}

export const getLinkListApi = (params) => {
  let data = {}
  data.pageindex = params.pageindex
  data.pagesize = params.pagesize
  data.keyword = params.keyword
  return axios.request({
    url: '/link/linkList',
    method: 'get',
    params: data
  })
}

export const deleteLinkApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/link/deleteLink',
    method: 'get',
    params: data
  })
}

export const getLinkInfoByIdApi = (id) => {
  let data = {}
  data.id = id
  return axios.request({
    url: '/link/searchLinkById',
    method: 'get',
    params: data
  })
}

export const updateLinkByIdApi = (formDate) => {
  return axios.request({
    url: '/link/updateLinkById',
    method: 'post',
    data: formDate
  })
}