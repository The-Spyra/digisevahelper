import { useCallback, useEffect, useState } from "react"
import User from "../../types/user.type"
import { Link, useNavigate } from "react-router-dom"
import api, { handleAxiosError } from "../../utils/api"
import { toast } from "sonner"

const AdminUsers = () => {
  const naviagte = useNavigate()
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const { data } = await api.get(`/admin/user?name=${search}`)
        if (data.success) {
          setUsers(data.users)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        handleAxiosError(error, naviagte)
      }
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [naviagte, search])

  const toggleBlock = useCallback(
    async (userId: string, blocked: boolean) => {
      try {
        const { data } = await api.put("/admin/user/block", { userId, blocked })
        if (data) {
          setUsers((prev) => {
            return prev.map((e) => (e._id == userId ? { ...e, blocked } : e))
          })
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        handleAxiosError(error, naviagte)
      }
    },
    [naviagte]
  )

  const verfiyBanner = useCallback(
    async (userId: string) => {
      try {
        const { data } = await api.put("/admin/user/verifyBanner", { userId })
        if (data.success) {
          setUsers((prev) => {
            const temp = prev.map((e) =>
              e._id == userId ? { ...e, bannerVerified: true } : e
            )
            return temp
          })
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        handleAxiosError(error, naviagte)
      }
    },
    [naviagte]
  )

  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="flex items-center gap-4 ">
        <input
          value={search}
          onChange={(e) => {
            e.preventDefault()
            setSearch(e.target.value)
          }}
          type="text"
          placeholder="Search services by name"
          className="outline-none bg-custom-primary bg-opacity-50 rounded-full w-full px-3 placeholder:text-custom-secondary py-2"
        />
      </div>

      <div className="h-full overflow-y-auto mb-20 w-full">
        <div className="flex flex-col items-center gap-2 pb-5 w-full">
          {users.map((e, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-custom-primary rounded-full w-full px-3 py-2"
            >
              <div className="flex items-centere gap-2 ">
                <p>{i + 1}.</p>
                <p>{e.shopName}</p>
              </div>
              <div className="flex items-centere gap-1">
                <Link
                  target="_blank"
                  to={e.bannerUrl}
                  className="rounded-full px-2 py-1 bg-white"
                >
                  view banner
                </Link>
                <button
                  className="rounded-full px-2 py-1 bg-white"
                  disabled={e.bannerVerified}
                  onClick={(ev) => {
                    ev.preventDefault()
                    verfiyBanner(e._id)
                  }}
                >
                  {e.bannerVerified ? "Verified" : "verfiy banner"}{" "}
                </button>
                <button
                  onClick={(ev) => {
                    ev.preventDefault()
                    toggleBlock(e._id, !e.blocked)
                  }}
                  className={`rounded-full px-2 py-1 bg-white ${
                    e.blocked ? "text-custom-primary" : "text-red-500"
                  }`}
                >
                  {e.blocked ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
