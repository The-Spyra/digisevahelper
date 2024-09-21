import axios, { isAxiosError } from "axios"
import { NavigateFunction } from "react-router-dom"
import { toast } from "sonner"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = token
  }
  return req
})

export const handleAxiosError = (
  error: unknown,
  navigate: NavigateFunction
) => {
  if (isAxiosError(error)) {
    if (error.response?.data.error == "unauthorized") {
      localStorage.removeItem("token")
      navigate("/login")
    }

    if (error.response?.data.error == "blocked") {
      navigate("/login")
    }

    if (error.response?.data.error == "unverified") {
      navigate("/verify")
    }

    if (error.response?.data.error == "admin-unauthorized") {
      localStorage.removeItem("adminToken")
      navigate("/admin/login")
    }

    if (error.response?.data.error == "subscription") {
      navigate("/payment")
    }

    if (error.response?.data.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error(error.message)
    }
  } else {
    toast.error("Something went wrong")
  }
}

export default api
