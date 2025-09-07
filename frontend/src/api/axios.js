import axios from 'axios'

// Use VITE_API_BASE environment variable with fallback to production URL
const baseURL = import.meta.env.VITE_API_BASE 

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export default api
