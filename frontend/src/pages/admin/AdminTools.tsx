import { useEffect, useState } from "react"
import Tool from "../../types/tool.type"
import NewTool from "../../components/admin/NewTool"
import api, { handleAxiosError } from "../../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import UpdateTool from "../../components/admin/UpdateTool"

const AdminTools = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [tools, setTools] = useState<Tool[]>([])

  const onNewTool = (tool: Tool) => {
    setTools((prev) => [...prev, tool])
  }

  const onToolDelete = (id: string) => {
    setTools((prev) => prev.filter((e) => e._id != id))
  }

  const onToolUpdate = (tool: Tool) => {
    setTools((prev) => {
      return prev.map((e) => (e._id == tool._id ? tool : e))
    })
  }

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const { data } = await api.get(`/admin/tool?name=${search}`)
        if (data.success) {
          setTools(data.tools)
        } else {
          toast.error(data.name)
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
        <NewTool
          onNewTool={onNewTool}
          className="bg-custom-primary text-white rounded-full px-3 py-2"
        >
          New
        </NewTool>
      </div>
      <div className="h-full overflow-y-auto mb-20 pe-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5">
          {tools.map((e, i) => (
            <UpdateTool
              key={i}
              tool={e}
              className="bg-custom-primary rounded-xl h-20 "
              onToolUpdate={onToolUpdate}
              onToolDelete={onToolDelete}
            >
              <p className="text-xl">{e.name}</p>
              <p>{e.redirectUrl}</p>
            </UpdateTool>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminTools
