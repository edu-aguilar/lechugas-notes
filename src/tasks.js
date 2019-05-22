import axios from 'axios'

export const getNotes = function () {
  const baseURL = 'http://localhost:3000/tasks'
  return axios.get(baseURL)
}
