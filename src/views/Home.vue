<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <CreateUser></CreateUser>
    <UserLogin msg="msg example"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateUser from '@/components/create-user.vue'
import UserLogin from '@/components/user-login.vue'

export default {
  name: 'home',
  components: {
    CreateUser,
    UserLogin
  }
}
</script>
