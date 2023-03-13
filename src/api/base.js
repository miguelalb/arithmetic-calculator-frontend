import axios from "axios"
const base_url = import.meta.env.VITE_SERVICE_ENDPOINT || ''

const apiClient = axios.create({
  baseURL: base_url,
  withCredentials: false,
  headers: { 
    'Content-Type': 'application/json'
  },
})

export default apiClient
