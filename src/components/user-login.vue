<template>
  <div class="login-wrapper">
    <input v-model="mail" type="email" name="email">
    <input v-model="password" type="password" name="pw">
    <button :disabled="!isFormFilled" v-on:click="login">Login</button>
    <div class="login-message"> </div>
  </div>
</template>

<script>

import { validateMail } from '@/utils.js'
import { loginUser } from '@/user.js'
export default {
  name: 'UserLogin',
  data: function () {
    return {
      mail: 'adrianfernandezdiazg@gmail.com',
      password: '123123123'
    }
  },
  computed: {
    isFormFilled: function () {
      return validateMail(this.mail) && this.password
    }
  },
  methods: {
    login: function () {
      loginUser(this.mail, this.password)
        .then(this._onUserLoged)
        .catch(this._onUserLogedError)
    },
    _onUserLoged (response) {
      this._printLogingUserMessage('green', response.data.message)
      this._setAuthToken(response.data.token)
      setTimeout(() => {
        this.$router.push('/profile')
      }, 3000)
    },
    _onUserLogedError (req) {
      this._printLogingUserMessage('red', req.response.data)
    },
    _printLogingUserMessage (color, text) {
      document.querySelector('.login-message').style.color = color
      document.querySelector('.login-message').textContent = text
      this.$emit('showSpinner')
    },
    _setAuthToken (token) {
      this.$http.defaults.headers.common['Authorization'] = token
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
.login-message {
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
