<template>
  <div class="user-profile">
    <h1>This is the profile view</h1>
    <div class="content">
       <ShowNotes></ShowNotes>
        <button class="logout-button" v-on:click="logOut">Logout</button>
    </div>
  </div>
</template>

<script>
import ShowNotes from '@/components/show-notes.vue'
import { clearSession } from '@/user.js'

export default {
  name: 'userprofile',
  components: {
    ShowNotes
  },
  methods: {
    logOut: function () {
      clearSession()
      this._clearAuthToken()
      this.$router.push('/')
    },
    _clearAuthToken () {
      this.$http.defaults.headers.common['Authorization'] = null
    }
  }
}
</script>
<style>
  button.logout-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>
