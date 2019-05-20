<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <div class="tabs">
      <div class="header">
        <button @click="toggleMode(options.CREATE)">crear usuario</button>
        <button @click="toggleMode(options.LOGIN)">login usuario</button>
      </div>
      <div class="content">
        <p v-if="mode === options.CREATE">Formulario creación usuario</p>
        <UserLogin v-if="mode === options.LOGIN"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserLogin from "@/components/user-login.vue";

const OPTIONS = {
  CREATE: 1,
  LOGIN: 2
};

export default {
  name: "home",
  components: {
    UserLogin
  },
  data: function() {
    return {
      options: OPTIONS,
      mode: OPTIONS.LOGIN
    };
  },
  methods: {
    toggleMode: function(mode) {
      this.mode = mode;
    }
  }
};
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
}
</style>