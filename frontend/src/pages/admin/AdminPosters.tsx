import { useEffect, useState } from "react"
import Poster from "../../types/poster.type"
import NewPoster from "../../components/admin/NewPoster"
import { handleAxiosError } from "../../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import UpdatePoster from "../../components/admin/UpdatePoster"
import adminApi from "../../utils/adminApi"

const AdminPosters = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [posters, setPosters] = useState<Poster[]>([])

  const onNewPoster = (poster: Poster) => {
    setPosters((prev) => [...prev, poster])
  }

  const onPosterDelete = (id: string) => {
    setPosters((prev) => prev.filter((e) => e._id != id))
  }

  const onPosterUpdate = (poster: Poster) => {
    setPosters((prev) => {
      return prev.map((e) => (e._id == poster._id ? poster : e))
    })
  }

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const { data } = await adminApi.get(`/admin/poster?name=${search}`)
        if (data.success) {
          setPosters(data.posters)
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
        <NewPoster
          onNewPoster={onNewPoster}
          className="bg-custom-primary text-white rounded-full px-3 py-2"
        >
          New
        </NewPoster>
      </div>

      <div className="h-full overflow-y-auto mb-20 pe-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-4 gap-5 pb-5">
          {posters.map((e, i) => (
            <UpdatePoster
              key={i}
              poster={e}
              onPosterUpdate={onPosterUpdate}
              onPosterDelete={onPosterDelete}
              className="flex flex-col gap-2 bg-custom-primary rounded-xl p-3"
            >
              <img src={e.imageUrl} alt="" className="rounded-xl h-full" />
              <p>{e.name}</p>
            </UpdatePoster>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPosters
