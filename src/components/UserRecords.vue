<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import RecordService from '@/api/RecordService';
import { format } from 'date-fns'

const store = useUserStore()
const recordService = new RecordService()
const userRecords = ref(null)
const totalRecords = ref(null)
const loading = ref(false)
const lazyParams = ref(null)

const loadLazyData = (lazyParams) => {
  loading.value = true
  recordService.getUserRecords(store.$state.userToken, lazyParams)
    .then((response) => {
      loading.value = false
      userRecords.value = response.data.data
      totalRecords.value = response.data.total
    })
    .catch((err) => {
      console.log(err)
    })
}

const onPage = (event) => {
  lazyParams.value = {
    page: event.page + 1,
    per_page: event.rows
  }
  loadLazyData({...lazyParams.value})
}

onMounted(() => {
  lazyParams.value = {
    page: 1,
    per_page: 5
  }

  loadLazyData({...lazyParams.value})
})
</script>

<template>
  <div class="my-4 w-full">
    <DataTable :value="userRecords" removableSort stripedRows lazy paginator :rows="5" dataKey="record_id"
               :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 30rem" :totalRecords="totalRecords" 
               :loading="loading" @page="onPage($event)" 
               paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
               currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
      <template #empty> No user records found. </template>
      <Column field="date" sortable header="Date">
        <template #body="slotProps">
          {{ format(new Date(slotProps.data.date), "PPPpp") }}
        </template>
      </Column>
      <Column field="amount" sortable header="Amount">
        <template #body="slotProps">
          $ {{slotProps.data.amount}}
        </template>
      </Column>
      <Column field="user_balance" sortable header="User Balance">
        <template #body="slotProps">
          $ {{slotProps.data.user_balance}}
        </template>
      </Column>
      <Column field="operation_response" header="Operation Response"></Column>
      <Column field="deleted" header="Deleted">

      </Column>
    </DataTable>
  </div>
</template>
