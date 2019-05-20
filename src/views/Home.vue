<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <UserLogin msg="msg example"/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserLogin from '@/components/user-login.vue'

export default {
  name: 'home',
  components: {
    UserLogin
  }
}
</script>
