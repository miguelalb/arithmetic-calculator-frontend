import apiClient from "./base";
import axiosRetry from "axios-retry";


class OperationService {
  newOperation(operationRequestData, token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    return apiClient.post('/operations', operationRequestData, {
      headers: headers
  })
  }

  getAvailableOperations(token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    return apiClient.get('/operations', {
      headers: headers
    })
  }
  
  pollForResults(recordId, token) {
    axiosRetry(apiClient, {
      retryDelay: axiosRetry.exponentialDelay,
      retries: 5,
      retryCondition: () => true
      })
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    return apiClient.get(`/operations/poll-results/${recordId}`, {
      headers: headers
    })
  }
}

export default OperationService
