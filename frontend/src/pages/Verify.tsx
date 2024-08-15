import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import api, { handleAxiosError } from "../utils/api"
import { toast } from "sonner"
import Navbar from "../components/Navbar"

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
      <div className="h-screen">
        <Navbar />
        <div className="flex items-center justify-center ">
          <p>Loading</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center ">
        <Navbar />
        <p>Please verify your account with the link sent to your email</p>
      </div>
    </div>
  )
}

export default Verify
