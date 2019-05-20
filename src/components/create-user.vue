<template>

    <div class="login-wrapper">
    <div class="input-container">
           <label for="email">Email: </label>  
           <input v-model="mail" type="text" id="email">
    </div>
     <div class="input-container">
           <label for="name">Name: </label> 
           <input v-model="name" type="text" id="name">
    </div>
    <div class="input-container">
           <label for="password">Password: </label>  
           <input v-model="password" type="text" id="password">
     </div>
      <div class="input-container">
           <label for="birthdate">Fecha nacimiento: </label>  
           <input v-model="birthdate" type="text" id="birthdate">
     </div>
            <button :disabled="!isFormFilled" type="submit" v-on:click="create" value="Create User"> Register</button>
    </div>

</template>

<script>

import {validateMail} from '@/utils.js'

export default {
    name: 'CreateUser',
    props: {
    },
    data: function() {
        return {
            mail: 'mailexample@gmail.com',
            name: 'nameexample',
            password: 'passwordexample',
            birthdate: 'birthdateexample'
        }
    },
    computed: {
        isFormFilled: function() {
            return validateMail(this.mail) && this.name && this.password && this.birthdate
        }
    },
    methods: {
        create: function () {
            console.log("hola que tal soy colosal"+this.name)
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

