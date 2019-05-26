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

export const getUserAllInfo = function () {
  const baseURL = 'http://localhost:3000/users/me'

  return axios.get(baseURL)
}

export const updateUserInfo = function (email, name, age, newPassword) {
  const baseURL = 'http://localhost:3000/users/me'
  const data = {
    email: email || undefined,
    name: name || undefined,
    age: age || undefined,
    password: newPassword || undefined
  }
  return axios.patch(baseURL, JSON.stringify(data))
}

export const uploadUserAvatar = function (avatar) {
  const baseURL = 'http://localhost:3000/users/me/avatar'
  const formData = new FormData()
  formData.append('avatar', avatar)

  return axios.post(baseURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
