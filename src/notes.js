import axios from 'axios'

export const getNotes = function () {
  const baseURL = 'http://localhost:3000/tasks'
  return axios.get(baseURL)
}

export const getFilteredNotes = function (field, completed, description) {
  const baseURL = 'http://localhost:3000/tasks?limit=16&'
  const filters = []

  /// tasks?sortBy=createdAt:asc&completed=true
  if (field !== 'default') {
    filters.push(`sortBy=${field}`)
  }

  if (completed !== 'all') {
    filters.push(`completed=${completed}`)
  }

  if (description) {
    filters.push(`description=${description}`)
  }

  return axios.get(baseURL + filters.join('&'))
}

export const deleteNote = function (key) {
  const baseURL = `http://localhost:3000/tasks/${key}`

  return axios.delete(baseURL)
}
