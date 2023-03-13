<script setup>
import UserRecords from '../components/UserRecords.vue';
</script>

<template>
  <div class="records">
    <UserRecords />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .records {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
