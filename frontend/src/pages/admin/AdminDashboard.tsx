import { useEffect, useState } from "react"
import Service from "../../types/service.type"
import { handleAxiosError } from "../../utils/api"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import adminApi from "../../utils/adminApi"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const { data } = await adminApi.get(`/admin/service?name=${search}`)
        if (data.success) {
          setServices(data.services)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        handleAxiosError(error, navigate)
      }
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [navigate, search])

  return (
    <div className="flex flex-col gap-0 h-full w-full">
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
        <Link
          to={"/admin/newService"}
          className="bg-custom-primary text-white rounded-full px-3 py-2"
        >
          New
        </Link>
      </div>
      <div className="h-full w-full overflow-y-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-5 gap-5 py-5 h-full">
          {services.map((e, i) => (
            <Link
              to={`/admin/service/${e._id}`}
              key={i}
              className="flex items-center gap-2 bg-custom-primary rounded-lg px-3"
            >
              <img
                src={e.imageUrl}
                alt={e.name}
                className="size-20 rounded-lg"
              />
              <p className="text-2xl">{e.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
