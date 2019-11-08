import axios from 'axios'
import { HOST } from './Host.js'

export async function getSetDetail (params) {
  const url = HOST + '/playlist/detail'
  return axios.get(url, { params })
}

export function getMusic (params) {
  const url = HOST + '/song/url'
  return axios.get(url, { params })
}

export async function getRank (params) {
  const url = HOST + '/top/list'
  return axios.get(url, { params })
}
