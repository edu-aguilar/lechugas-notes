<template>
  <div class="login-wrapper">
    <input v-model="mail" type="email" name="email">
    <input v-model="password" type="password" name="pw">
    <button :disabled="!isFormFilled" v-on:click="login">Login</button>
    <div class="login-error"> </div>
  </div>
</template>

<script>

import { validateMail, routeChanger } from '@/utils.js'

export default {
  name: 'UserLogin',
  data: function () {
    return {
      mail: 'edu@domain.com',
      password: 'password'
    }
  },
  computed: {
    isFormFilled: function () {
      return validateMail(this.mail) && this.password
    }
  },
  methods: {
    routerToHome: function () {
      routeChanger(this, '/')
    },
    login: function () {
      const baseURL = 'http://localhost:3000/users/login'
      const data = {
        email: this.mail,
        password: this.password
      }
      let commonHeaders = {
        'Content-Type': 'application/json'
      }
      this.$http.post(baseURL, JSON.stringify(data), {
        headers: commonHeaders
      })
        .then((result) => {
          console.log(result)
        })
        .catch((e) => {
          document.querySelector(".login-error").textContent = "Usuario y/o contraseña incorrectos. Por favor, inténtalo de nuevo"
        })
    }
  }
}
</script>

<style scoped lang="scss">

$space: 1rem;

.login-wrapper {
  padding: $space;
  display: flex;
  flex-direction: column;
}
.login-error {
  font-size: 12px;
  color: red;
  font-style: oblique;
}
input + input {
  margin-top: $space;
}
button {
  margin-top: $space;
}

</style>
