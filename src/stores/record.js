import { defineStore } from "pinia";

export const useRecordStore = defineStore('record', {
  state: () => {
    return {
      userRecords: []
    }
  },
  
  actions: {
    setRecords(records) {
      this.userRecords = records;
    },
    
    clearRecords() {
      this.userRecords = []
    }
  }
})
