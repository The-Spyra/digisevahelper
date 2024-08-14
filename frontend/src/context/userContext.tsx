import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import User from "../types/user.type"
import api, { handleAxiosError } from "../utils/api"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

interface contextType {
  user: User | undefined
}

const userConext = createContext<contextType>({
  user: undefined,
})

export const UserProvier = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  useEffect(() => {
    if (Cookies.get("token"))
      api
        .get("/user")
        .then(({ data }) => {
          if (data.success) {
            setUser(data.user)
          } else {
            toast.error(data.message)
          }
        })
        .catch((error) => {
          handleAxiosError(error, navigate)
        })
  }, [navigate])

  return <userConext.Provider value={{ user }}>{children}</userConext.Provider>
}

export const useUser = () => {
  return useContext(userConext)
}
