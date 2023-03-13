import apiClient from "./base";

class RecordService {
  getUserRecords(token, {page, per_page, date_start, date_end, balance_start, balance_end}) {
    const searchParams = new URLSearchParams()
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    console.log("Did I send this?", page)
    console.log("Did I send this?", per_page)

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
    
    return apiClient.get('/records',  {
      headers: headers,
      params: searchParams
    })
  }
}

export default RecordService
