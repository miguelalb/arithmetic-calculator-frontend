import apiClient from "./base";

class RecordService {
  getUserRecords(token, {page, per_page}) {
    const searchParams = new URLSearchParams()
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }

    if (page){
      searchParams.append('page', page)
    }
    if (per_page) {
      searchParams.append('per_page', per_page)
    }
    
    return apiClient.get('/records',  {
      headers: headers,
      params: searchParams
    })
  }
  
  deleteUserRecord(token, record_id){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  
    return apiClient.delete(`/records/${record_id}` , {
      headers: headers
    })
  }
}

export default RecordService
