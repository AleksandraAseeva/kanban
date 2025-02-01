<template>
  <div id="app" :class="{ 'dark-theme': isDarkMode, 'light-theme': !isDarkMode }">
    <nav>
      <!-- <router-link to="/">Home</router-link> | -->
      <router-link to="/addtask">AddTask</router-link> |
      <router-link to="/kanbantasks">My Tasks</router-link> |
      <router-link to="/settings">⚙️</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isDarkMode"]), // Добавляем геттер для получения состояния темы
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
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

.dark-theme {
    background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
  color: rgb(211, 211, 211); /* Светлый текст */
}

.dark-theme a {
  color: rgb(228, 228, 228)
}

.dark-theme h1, .dark-theme h2, .dark-theme label  {
  color: rgb(255, 255, 255)
}

.light-theme {
  background: linear-gradient(90deg, #aea4e3, #d3ffe8);
  color: #000000; /* Темный текст */
}
</style>
