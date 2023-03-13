<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user';
import Loader from '../components/Loader.vue';
const store = useUserStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  console.log("FromRoute", route.fullPath)
  const url = route.fullPath || window.location.href
  const idToken = url.split('#')[1].split('=')[1]
  store.setToken(idToken)
  router.push({ name: 'home'})
})

</script>

<template>
  <div class="callback">
    <h3>Singing you in...</h3>
    <div class="my-3">
      <Loader />
    </div>
  </div>
</template>