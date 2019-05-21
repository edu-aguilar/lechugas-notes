<template>
  <div class="create-user-wrapper">
    <div class="input-container">
      <label for="email">Email:</label>
      <input v-model="mail" type="text" id="email">
    </div>
    <div class="input-container">
      <label for="name">Name:</label>
      <input v-model="name" id="name">
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
     <div class="create-user-error"> </div>
  </div>
</template>

<script>

import { validateMail, isBefore, getYearsFromDate, routeChanger, isACorrectName } from '@/utils.js'

export default {
  name: 'CreateUser',
  data: function () {
    return {
      mail: 'adrianfernandezdiazg@gmail.com',
      name: 'nameexample',
      password: 'asdas',
      birthdate: ''
    }
  },
  computed: {
    isFormFilled: function () {
      return validateMail(this.mail) && isACorrectName(this.name) && this.password && isBefore(this.birthdate)
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
          document.querySelector('.create-user-error').style.color = 'green'
          document.querySelector('.create-user-error').textContent = 'Enhorabuena! El registro ha salido bien. Vamos a redirigirte...'
          setTimeout(() => { this.routerToHome() }, 3000);
          
        })
        .catch((e) => {
          const errorParsed = JSON.parse(JSON.stringify(e))
          if (errorParsed.response.data.code === 11000) {
            document.querySelector('.create-user-error').textContent = 'Este mail ya está registrado, por favor, inténtalo con otro'
          } else if (errorParsed.response.data.errors.password) {
            document.querySelector('.create-user-error').textContent = 'La contraseña debe contener, al menos, 7 caracteres'
          }
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
.create-user-error {
  font-size: 12px;
  color: red;
  font-style: oblique;
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
