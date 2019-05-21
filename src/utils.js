
export const validateMail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const validateDate = (date) => {
  var today = new Date()
  var currentDay = String(today.getDate()).padStart(2, '0')
  var todayMonth = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
  var todayYear = today.getFullYear()
  var formDate = new Date(date)
  var formDay = String(formDate.getDate()).padStart(2, '0')
  var formMonth = String(formDate.getMonth() + 1).padStart(2, '0') // January is 0!
  var formYear = formDate.getFullYear()

  if (formYear) {
    if (formYear > todayYear) {
      return false
    } else if (formYear < todayYear) {
      return true
    } else if (formMonth > todayMonth) {
      return false
    } else if (formMonth < todayMonth) {
      return true
    } else if (currentDay > formDay) {
      return true
    } else {
      return false
    }
  }
}
