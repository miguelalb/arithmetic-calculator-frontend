<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user';
import UserService from '@/api/UserService.js'
import OperationService from '@/api/OperationService.js'

const router = useRouter()
const store = useUserStore()
const userService = new UserService()
const operationService = new OperationService()

const user = ref(null)
const availableOperations = ref(null)
const operationRequest = ref({})
const errorMessage = ref(null)
const isInvalid = ref(false)
const loading = ref(false)

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const resetValues = () => {
  loading.value = true
  errorMessage.value = null
  isInvalid.value = false
}

const onSubmit = (e) => {
  resetValues()
  if (operationRequest.value.num2 && !operationRequest.value.num1){
    errorMessage.value = "Invalid Operation: Needs first operand value to perform this operation"
    isInvalid.value = true
    loading.value = false
  }

  operationService.newOperation({...operationRequest.value}, store.$state.userToken)
    .then((response) => {
      resetValues()
      router.push({ name: 'operation-results', params: {recordId: response.data.RecordId} })
    })
    .catch((error) => {
      if (error.response) {
        errorMessage.value = error.response.data
        isInvalid.value = true
        loading.value = false
      }
    })
  
}

onMounted(() => {
  userService.getUserBalance(store.$state.userToken)
    .then((response) => {
      user.value = response.data
    })
    .catch((err) => console.log(err));
  
  operationService.getAvailableOperations(store.$state.userToken)
    .then((response) => {
      const availableOperationsSortedbyCost = response.data.data.sort((a, b) => a.cost - b.cost)
      availableOperations.value = availableOperationsSortedbyCost
    })
    .catch((err) => console.log(err));
}) 

</script>

<template>
  <div class="operations mt-3">
    <div v-if="user">
      <h2>Your current Balance: <span class="font-bold">${{user.UserBalance}}</span></h2>
      <h2>Select an operation type:</h2>
      <h3 v-if="errorMessage" class="text-red-600">{{ errorMessage }}</h3>
      <form @submit.prevent="onSubmit" class="my-3">
        <div class="my-2">
          <Dropdown v-model="operationRequest.operation_type" :options="availableOperations" filter optionLabel="type" optionValue="type" placeholder="Select an Operation" class="w-full md:w-14rem" :class="{'p-invalid': isInvalid}">
            <template #value="slotProps"></template>
            <template #option="slotProps">
              <div class="flex align-items-center justify-content-between">
                <div>{{ capitalizeFirstLetter(slotProps.option.type) }}</div>
                
                <div>${{ slotProps.option.cost }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div v-if="operationRequest.operation_type">
          <div v-if="operationRequest.operation_type==='RANDOM_STRING'">
            <Button type="submit" class="my-3" :loading="loading" label="Get Random String" />
          </div>

          <div v-else-if="operationRequest.operation_type==='SQUARE_ROOT'">
            <div>
              <h4 class="my-2">Enter a number you want the square root for:</h4>
            <InputNumber id="square-root" v-model="operationRequest.single_number" inputId="locale-user" :minFractionDigits="2" />
            </div>
            <Button type="submit" class="my-3" :loading="loading" label="Calculate" />
          </div>

          <div v-else>
            <div>
              <h4 class="my-2">Enter the first operand:</h4>
              <InputNumber id="first-operand" v-model="operationRequest.num1" inputId="locale-user" :minFractionDigits="2" />
            </div>

            <div>
              <h4>Enter the second operand:</h4>
              <InputNumber id="second-operand" v-model="operationRequest.num2" inputId="locale-user" :minFractionDigits="2" />
            </div>
            <Button type="submit" class="my-3" :loading="loading" label="Calculate" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped>
@media (min-width: 1024px) {
  .operations {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 1023px) {
  .operations {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
