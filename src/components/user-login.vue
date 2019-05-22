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
    login: function () {
      loginUser(this, this.mail, this.password)
    },
    routerToHome: function () {
      this.$router.push('/home')
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
