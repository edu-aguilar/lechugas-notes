<template>
  <div class="create-user-wrapper">
    <div class="input-container">
      <label for="email">Email:</label>
      <input v-model="mail" type="text" id="email">
    </div>
    <div class="input-container">
      <label for="name">Name:</label>
      <input v-model="name" type="text" id="name">
    </div>
    <div class="input-container">
      <label for="password">Password:</label>
      <input v-model="password" type="text" id="password">
    </div>
    <div class="input-container">
      <label for="birthdate">Fecha nacimiento:</label>
      <input v-model="birthdate" type="date" id="birthdate">
    </div>
    <button :disabled="!isFormFilled" type="submit" v-on:click="create" value="Create User">Register</button>
  </div>
</template>

<script>

import { validateMail, isBefore, getYearsFromDate, routeChanger } from '@/utils.js'

export default {
  name: 'CreateUser',
  data: function () {
    return {
      mail: 'mailexample@gmail.com',
      name: 'nameexample',
      password: 'passwordexample',
      birthdate: ''
    }
  },
  computed: {
    isFormFilled: function () {
      return validateMail(this.mail) && this.name && this.password && isBefore(this.birthdate)
    }
  },
  methods: {
    routerToHome: function () {
      routeChanger(this, '/')
    },
    create: function () {
      const baseURL = 'http://localhost:3000/users'
      const data = {
        email: this.mail,
        name: this.name,
        password: this.password,
        age: getYearsFromDate(this.birthdate)
      }
      let commonHeaders = {
        'Content-Type': 'application/json'
      }
      this.$http.post(baseURL, JSON.stringify(data), {
        headers: commonHeaders
      })
        .then((result) => {
          console.log(result.data)
          this.routerToHome()
        })
    }
  }
}
</script>

<style scoped lang="scss">
$space: 1rem;

.create-user-wrapper {
  padding: $space;
}
div.input-container {
  display: flex;
  flex-direction: column;
}
input + input {
  margin-top: $space;
}
button {
  margin-top: $space;
}
</style>
