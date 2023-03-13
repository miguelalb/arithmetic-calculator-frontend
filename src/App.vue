<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <MainHeader />
      <Navbar />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
