import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import api, { handleAxiosError } from "../utils/api"
import { toast } from "sonner"

const Verify = () => {
  const [params] = useSearchParams()
  const token = params.get("token")

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      setLoading(true)
      api
        .post("/auth/verify", { token })
        .then(({ data }) => {
          if (data.success) {
            navigate("/login")
          } else {
            toast.error(data.message)
          }
        })
        .catch((error) => {
          handleAxiosError(error, navigate)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [token, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Please verify your account with the link sent to your email</p>
    </div>
  )
}

export default Verify
