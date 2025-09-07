import axios from 'axios'

// Prefer build-time env (Vite), fall back to window-injected var, then localhost
const baseURL = import.meta?.env?.VITE_API_BASE 
  || (typeof window !== 'undefined' ? window.__API_BASE__ : undefined) 
  || 'http://localhost:8000'

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export default api
