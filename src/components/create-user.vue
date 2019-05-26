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
      <input v-model="password" type="password" id="password">
    </div>
    <div class="input-container">
      <label for="birthdate">Fecha nacimiento:</label>
      <input v-model="birthdate" type="date" id="birthdate">
    </div>
    <button :disabled="!isFormFilled" type="submit" v-on:click="create" value="Create User">Register</button>
    <div class="create-user-message"></div>
  </div>
</template>

<script>
import { validateMail, isBefore, isACorrectName } from '@/utils.js'
import { createUser } from '@/user.js'

export default {
  name: 'CreateUser',
  data: function () {
    return {
      mail: 'adrianfernandezdiazg@gmail.com',
      name: 'nameexample',
      password: 'asdasdasdas',
      birthdate: ''
    }
  },
  computed: {
    isFormFilled: function () {
      return validateMail(this.mail) &&
        isACorrectName(this.name) &&
        this.password &&
        isBefore(this.birthdate)
    }
  },
  methods: {
    create: function () {
      createUser(this.mail, this.name, this.password, this.birthdate)
        .then(this._onUserCreated)
        .catch(this._onUserCreatedError)
    },
    _onUserCreated (response) {
      this._printCreatingUserMessage('white', response.data.message)
      this.$emit('showSpinner')
      this._setAuthToken(response.data.token)
      setTimeout(() => {
        this.$router.push('/profile')
      }, 3000)
    },
    _onUserCreatedError (req) {
      this._printCreatingUserMessage('red', req.response.data)
    },
    _printCreatingUserMessage (color, text) {
      document.querySelector('.create-user-message').style.color = color
      document.querySelector('.create-user-message').textContent = text
    },
    _setAuthToken (token) {
      this.$http.defaults.headers.common['Authorization'] = token
    }
  }
}
</script>

<style scoped lang="scss">
$space: 1rem;

.create-user-wrapper {
  padding: $space;
}
.create-user-message {
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
