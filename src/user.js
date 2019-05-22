import { getYearsFromDate } from '@/utils.js'

export const createUser = function (componentContext, mail, name, password, birthday) {
  const baseURL = 'http://localhost:3000/users'
  const data = {
    email: mail,
    name: name,
    password: password,
    age: getYearsFromDate(birthday)
  }
  componentContext.$http.post(baseURL, JSON.stringify(data))
    .then((result) => {
      document.querySelector('.create-user-message').style.color = 'green'
      document.querySelector('.create-user-message').textContent = result.data.message
      componentContext.$http.defaults.headers.common['Authorization'] = result.data.token
      setTimeout(() => { componentContext.routerToHome() }, 3000)
    })
    .catch((e) => {
      document.querySelector('.create-user-message').textContent = e.response.data
    })
}

export const loginUser = function (componentContext, mail, password) {
  const baseURL = 'http://localhost:3000/users/login'
  const data = {
    email: mail,
    password: password
  }

  componentContext.$http.post(baseURL, JSON.stringify(data))
    .then((result) => {
      document.querySelector('.login-message').style.color = 'green'
      document.querySelector('.login-message').textContent = result.data.message
      componentContext.$http.defaults.headers.common['Authorization'] = result.data.token
      setTimeout(() => { componentContext.routerToHome() }, 3000)
    })
    .catch((e) => {
      document.querySelector('.login-message').textContent = e.response.data
    })
}
