<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <CreateUser> </CreateUser>
    
    <UserLogin msg="msg example"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CreateUser from '@/components/CreateUser.vue'
import UserLogin from '@/components/user-login.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateUser,
    UserLogin
  }
}
</script>
