import axios from 'axios'

export const getNotes = function () {
  const baseURL = 'http://localhost:3000/tasks'
  return axios.get(baseURL)
}

export const deleteNote = function (key) {
  const baseURL = `http://localhost:3000/tasks/${key}`

  return axios.delete(baseURL)
}
