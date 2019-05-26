<template>
  <div id="app">
    <header>
    <div>
    Welcome to the Notes App
    </div>
    <nav id="nav">
      <router-link to="/"> Home</router-link> &nbsp&nbsp
      <router-link to="/about"> About</router-link>
    </nav>
    </header>
    <router-view/>
    <footer>
      <p> Notes app </p>
      <p> Contact: adrianfernandezf@gmail.com </p>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: black;
    &.router-link-exact-active {
      color:white ;
    }
  }
}
div#app {
  height: 100%;
  position: relative;
  overflow: hidden;
}
header, footer {
  color: black;
  background-color: palegoldenrod;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}
header { 
  justify-content: space-between;
  padding: 0 10px;
}
nav {
  display: flex;
}
nav a {
  right: 0;
  color: black;
  text-decoration: none;
}
footer { 
  height: 30px;
  bottom: 0;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>
