<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="tabs">
      <div class="header">
        <button @click="toggleMode(options.CREATE)">crear usuario</button>
        <button @click="toggleMode(options.LOGIN)">login usuario</button>
      </div>
      <div class="content">
        <CreateUser v-on:showSpinner="_showSpinner" v-if="mode === options.CREATE"/>
        <UserLogin v-on:showSpinner="_showSpinner" v-if="mode === options.LOGIN"/>
      </div>
      <div v-if="showSpinner" class="lds-hourglass"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateUser from '@/components/create-user.vue'
import UserLogin from '@/components/user-login.vue'

const OPTIONS = {
  CREATE: 1,
  LOGIN: 2
}

export default {
  name: 'home',
  components: {
    CreateUser,
    UserLogin
  },
  data: function () {
    return {
      options: OPTIONS,
      mode: OPTIONS.LOGIN,
      showSpinner: false
    }
  },
  methods: {
    toggleMode: function (mode) {
      this.mode = mode
    },
    _showSpinner () {
      this.showSpinner = true;
    }
  }
}
</script>

<style scoped lang="scss">
$vue-color: #42b983;
$border: solid 2px $vue-color;

.tabs {
  max-width: 700px;
  margin: 0 auto;

  .header {
    width: 100%;
    border-bottom: $border;

    button {
      width: 50%;
      padding: 0.5rem;
      border-color: white;

      & + button {
        border-left: $border;
      }
    }
  }
  .lds-hourglass {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 6px;
  box-sizing: border-box;
  $color: green;
  border: 26px solid $color;
  border-color: $color transparent $color transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
}

</style>
