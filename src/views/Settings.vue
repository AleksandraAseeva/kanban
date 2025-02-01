<template>
  <div class="settings">
    <h2>Настройки темы</h2>
    <label>
      <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" />
      Переключить на темную тему
    </label>
  </div>
</template>

<script>
export default {
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode;
    },
  },
  methods: {
    toggleDarkMode() {
      this.$store.dispatch('toggleDarkMode');
    },
  },
};
</script>

<style scoped>
.settings {
  padding: 20px;
}
</style>