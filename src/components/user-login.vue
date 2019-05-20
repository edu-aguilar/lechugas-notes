<template>
  <div class="login-wrapper">
    <input v-model="mail" type="email" name="email" id>
    <input v-model="password" type="password" name="pw" id>
    <button :disabled="!isFormFilled" v-on:click="login">Login</button>
  </div>
</template>

<script>

import {validateMail} from '@/utils.js'

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
      const baseURI = 'https://jsonplaceholder.typicode.com/users'
      this.$http.get(baseURI)
      .then((result) => {
        console.log(result.data);
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
input + input {
  margin-top: $space;
}
button {
  margin-top: $space;
}

</style>
