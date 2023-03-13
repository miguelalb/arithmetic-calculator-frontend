<script setup>
import { ref, onMounted } from 'vue';
import RecordService from '@/api/RecordService';
import { format } from 'date-fns'

const recordService = new RecordService()
const userRecords = ref(null)

onMounted(() => {
  recordService.getUserRecords()
    .then((response) => {
      userRecords.value = response.data.data
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<template>
  <div class="my-2">
    <DataTable :value="userRecords" tableStyle="min-width: 20rem">
      <Column field="date" header="Date">
        <template #body="slotProps">
          {{ format(new Date(slotProps.data.date), "MMM/dd/yyyy p") }}
        </template>
      </Column>
      <Column field="amount" header="Amount"></Column>
      <Column field="user_balance" header="User Balance"></Column>
      <Column field="operation_response" header="Operation Response"></Column>
    </DataTable>
  </div>
</template>
