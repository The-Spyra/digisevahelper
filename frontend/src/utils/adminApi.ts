import axios from "axios"

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

adminApi.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken")
  if (token) {
    req.headers.Authorization = token
  }
  return req
})

export default adminApi
