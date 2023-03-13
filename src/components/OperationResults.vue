<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user';
import OperationService from '@/api/OperationService.js'
import Loader from '@/components/Loader.vue'

const router = useRouter()
const route = useRoute()
const store = useUserStore()
const operationService = new OperationService()

const operationResults = ref(null)
const timedOut = ref(false);
const errorMessage = ref(null)

const goToNewOperation = () => {
  router.push({ name: 'home'})
}

onMounted(() => {
  operationService.pollForResults(route.params.recordId, store.$state.userToken)
  .then((response) => {
    operationResults.value = response.data
  })
  .catch((error) => {
    const errText = "Invalid Operation: Please make sure you input all required and valid data."
    if (error.response) {
        errorMessage.value = error.response.data || errText
      }
    else {
      errorMessage.value = errText
    }
  })

  setTimeout(() => {
    timedOut.value = true
  }, 4000);
})
</script>

<template>
  <div class="operation-results mt-3">
    <div v-if="operationResults">
      <h2>Result:</h2>
      <h2 class="text-bold mb-4 text-green-500">{{ operationResults.operation_response }}</h2>
      <h4>Operaton Cost: ${{ operationResults.amount }}</h4>
      <h4>Remaining Balance: ${{ operationResults.user_balance }} </h4>
      <Button label="New Operation" class="my-3" @click="goToNewOperation" />
    </div>
    
    <div v-else-if="timedOut">
      <h3 class="my-2 text-red-600">Invalid Operation</h3>
      <h4>{{ errorMessage }}</h4>
      <Button label="New Operation" class="my-3" @click="goToNewOperation" />
    </div>
    
    <div v-else>
      <Loader />
      <p class="my-3">Loading results...</p>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .operation-results {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 1023px) {
  .operation-results {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
