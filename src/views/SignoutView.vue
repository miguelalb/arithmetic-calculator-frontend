<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user';
import Loader from '../components/Loader.vue';

const store = useUserStore()
const router = useRouter()

onMounted(() => {
  store.removeToken()
  router.push({ name: 'signin' })
})
</script>

<template>
  <div class="signout">
    <Loader />
    <h3>Singing you out...</h3>
  </div>
</template>