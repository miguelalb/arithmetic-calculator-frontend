import apiClient from "./base";

class RecordService {
  getUserRecords(page, per_page, date_start, date_end, balance_start, balance_end) {
    const searchParams = new URLSearchParams()
    if (page){
      searchParams.append('page', page)
    }
    if (per_page) {
      searchParams.append('per_page', per_page)
    }
    if (date_start) {
      searchParams.append('date_start', date_start)
    }
    if (date_end) {
      searchParams.append('date_end', date_end)
    }
    if (balance_start) {
      searchParams.append('balance_start', balance_start)
    }
    if (balance_end) {
      searchParams.append('balance_end', balance_end)
    }
    return apiClient.get('/records',  {params: searchParams})
  }
}

export default RecordService
