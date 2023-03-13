<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router'
import RecordService from '@/api/RecordService';
import { format } from 'date-fns'
import { useConfirm } from "primevue/useconfirm";


const store = useUserStore()
const router = useRouter()
const recordService = new RecordService()
const userRecords = ref(null)
const totalRecords = ref(null)
const loading = ref(false)
const lazyParams = ref(null)
const confirm = useConfirm()

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

const resetLazyParams = () => {
  lazyParams.value = {
    page: 1,
    per_page: 5
  }
}

const onPage = (event) => {
  lazyParams.value = {
    page: event.page + 1,
    per_page: event.rows
  }
  loadLazyData({...lazyParams.value})
}

const confirmDelete = (recordId) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => {
      recordService.deleteUserRecord(store.$state.userToken, recordId)
          .then((response) => {
            resetLazyParams()
            loadLazyData({...lazyParams.value})
          })
          .catch((error) => console.log("Error deleting the record", error))
    },
    reject: () => {
      // do nothing
    }
  });
}

onMounted(() => {
  resetLazyParams()
  loadLazyData({...lazyParams.value})
})
</script>

<template>
  <div class="my-4 w-full">
    <ConfirmDialog></ConfirmDialog>
    <DataTable :value="userRecords" stripedRows lazy paginator :rows="5" dataKey="record_id"
               :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 30rem" :totalRecords="totalRecords" 
               :loading="loading" @page="onPage($event)" 
               paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
               currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
      <template #empty> No user records found. </template>
      <Column field="date"  header="Date" sortable>
        <template #body="slotProps">
          {{ format(new Date(slotProps.data.date), "PPPpp") }}
        </template>
      </Column>
      <Column field="amount"  header="Amount" sortable>
        <template #body="slotProps">
          $ {{slotProps.data.amount}}
        </template>
      </Column>
      <Column field="user_balance"  header="User Balance" sortable>
        <template #body="slotProps">
          $ {{slotProps.data.user_balance}}
        </template>
      </Column>
      <Column field="operation_response" header="Operation Response"></Column>
      <Column field="deleted" header="Status">
        <template #body="slotProps"> 
          <Tag v-if="slotProps.data.deleted" icon="pi pi-times" class="bg-red-200" severity="danger" value="Archived" rounded></Tag>
          <Tag v-else icon="pi pi-check" severity="success" value="Active" rounded></Tag>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <Button v-if="!slotProps.data.deleted" @click="confirmDelete(slotProps.data.record_id)" icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel" v-tooltip="'Delete Record'" />
          <Button v-else icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel" disabled  />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
