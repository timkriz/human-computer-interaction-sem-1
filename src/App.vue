<template>
  <!--
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/izposoja">Izposoja</router-link>
  </nav>
  -->
  <router-view/>
</template>

<style>
@import '../public/variables.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
}

html, body {
  height:100%;
  background-color: var(--background-light-grey) !important;
}

.iti {
  display: flex !important;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.form-control:focus, .form-select:focus {
  border-color: var(--background-blue) !important;
  box-shadow: 0 0 0 0.25rem rgb(47 42 80 / 25%) !important;
}

.btn-primary {
  background-color: var(--background-blue) !important;
  border: none !important;
}

.form-check-input:checked {
    background-color: var(--background-blue) !important;
    border-color: var(--background-blue) !important;
}
.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgb(47 42 80 / 25%) !important;
}

</style>
