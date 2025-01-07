<template>
  <nav :class="isDarkMode ? 'navbar dark-mode' : 'navbar'">
    <h1 class="navbar-title">Where in the world?</h1>
    <button class="dark-mode-toggle" @click="toggleDarkMode">
      <span>{{ isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode" }}</span>
    </button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle("dark-mode", this.isDarkMode);
      const event = new Event("dark-mode-changed");
      document.body.dispatchEvent(event);
    },
  },
};
</script>

<style>
.navbar {
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  color: black; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px; /* Add padding for better spacing */
  height: 60px; /* Set a fixed height */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color:white;
  color: black;
  z-index: 10;
}

.navbar-title {
  font-size: 24px;
  font-weight: bold;
}

.dark-mode-toggle {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 16px;
  color: black;
  cursor: pointer;
}

.dark-mode {
  background-color: #333;
  color: white;
}

.dark-mode .dark-mode-toggle {
  color: white;
}

body.dark-mode {
  background-color: #121212;
  color: white;
}
</style>
