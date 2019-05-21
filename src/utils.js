import moment from 'moment'

export const validateMail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const isBefore = (formDate) => {
  return moment(formDate).isBefore()
}

export const getYearsFromDate = (formDate) => {
  return moment().diff(formDate, 'years')
}

export const routeChanger = function (componentContext, destiny) {
  const context = componentContext
  context.$router.push(destiny)
}
