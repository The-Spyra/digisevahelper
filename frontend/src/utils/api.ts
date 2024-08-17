import axios, { isAxiosError } from "axios"
import { NavigateFunction } from "react-router-dom"
import { toast } from "sonner"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
})

export const handleAxiosError = (
  error: unknown,
  navigate: NavigateFunction
) => {
  if (isAxiosError(error)) {
    if (error.response?.data.error == "unauthorized") {
      navigate("/login")
    }

    if (error.response?.data.error == "unverified") {
      navigate("/verify")
    }

    if (error.response?.data.error == "admin-unauthorized") {
      navigate("/admin/login")
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
