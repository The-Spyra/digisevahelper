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
import { useLocation, useNavigate } from "react-router-dom"

interface contextType {
  user: User | undefined
}

const userConext = createContext<contextType>({
  user: undefined,
})

export const UserProvier = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem("token"))
      api
        .get("/user")
        .then(({ data }) => {
          if (data.success) {
            if (data.user) {
              setUser(data.user)
            } else {
              setUser(undefined)
            }
          } else {
            toast.error(data.message)
          }
        })
        .catch((error) => {
          handleAxiosError(error, navigate)
        })
  }, [navigate, location.pathname])

  return <userConext.Provider value={{ user }}>{children}</userConext.Provider>
}

export const useUser = () => {
  return useContext(userConext)
}
