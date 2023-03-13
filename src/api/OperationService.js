import apiClient from "./base";
import axiosRetry from "axios-retry";


class OperationService {
  newOperation(operationRequestData) {
    console.log("Data to Send", operationRequestData)
    return apiClient.post('/operations', operationRequestData)
  }

  getAvailableOperations() {
    return apiClient.get('/operations')
  }
  
  pollForResults(recordId) {
    axiosRetry(apiClient, {
      retryDelay: axiosRetry.exponentialDelay,
      retries: 3,
      retryCondition: () => true
      })
    return apiClient.get(`/operations/poll-results/${recordId}`)
  }
}

export default OperationService
