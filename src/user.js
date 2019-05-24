import { getYearsFromDate } from '@/utils.js'
import axios from 'axios'

export const createUser = function (mail, name, password, birthday) {
  const baseURL = 'http://localhost:3000/users'
  const data = {
    email: mail,
    name: name,
    password: password,
    age: getYearsFromDate(birthday)
  }

  return axios.post(baseURL, JSON.stringify(data))
}

export const loginUser = function (mail, password) {
  const baseURL = 'http://localhost:3000/users/login'
  const data = {
    email: mail,
    password: password
  }

  return axios.post(baseURL, JSON.stringify(data))
}

export const clearSession = function () {
  const baseURL = 'http://localhost:3000/users/logout'
  return axios.post(baseURL)
}
