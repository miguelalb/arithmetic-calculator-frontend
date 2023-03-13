<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import OperationService from '@/api/OperationService.js'
import Loader from '@/components/Loader.vue'

const router = useRouter()
const route = useRoute()
const operationService = new OperationService()

const operationResults = ref(null)
const timedOut = ref(false);
const errorMessage = ref(null)

const goToNewOperation = () => {
  router.push({ name: 'home'})
}

onMounted(() => {
  operationService.pollForResults(route.params.recordId)
  .then((response) => {
    console.log("Operation Response", response.data)
    operationResults.value = response.data
  })
  .catch((err) => {
    console.log(err)
    errorMessage.value = err
  })

  setTimeout(() => {
    timedOut.value = true
  }, 4000);
})
</script>

<template>
  <div>
    <div v-if="operationResults">
      <h4>Result:</h4>
      <h2 class="text-bold mb-4">{{ operationResults.operation_response }}</h2>
      <h4>Operaton Cost: ${{ operationResults.amount }}</h4>
      <h4>Remaining Balance: ${{ operationResults.user_balance }} </h4>
      <Button label="New Operation" class="my-3" @click="goToNewOperation" />
    </div>
    
    <div v-else-if="timedOut">
      <h4 class="my-2">Invalid Operation</h4>
      <h4>{{ errorMessage }}</h4>
      <Button label="New Operation" class="my-3" @click="goToNewOperation" />
    </div>
    
    <div v-else>
      <Loader />
      <p class="my-3">Loading results...</p>
    </div>
  </div>
</template>