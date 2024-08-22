import { useEffect, useState } from "react"
import NewForm from "../../components/admin/NewForm"
import Form from "../../types/form.type"
import api, { handleAxiosError } from "../../utils/api"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import UpdateForm from "../../components/admin/UpdateForm"
import { FileIcon } from "lucide-react"

const AdminForms = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [forms, setForms] = useState<Form[]>([])

  const onNewForm = (form: Form) => {
    setForms((prev) => [...prev, form])
  }

  const onFormDelete = (id: string) => {
    setForms((prev) => prev.filter((e) => e._id != id))
  }

  const onFormUpdate = (form: Form) => {
    setForms((prev) => {
      return prev.map((e) => (e._id == form._id ? form : e))
    })
  }

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const { data } = await api(`/admin/form?name=${search}`)

        if (data.success) {
          if (data.success) {
            setForms(data.forms)
          } else {
            toast.error(data.message)
          }
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
        <NewForm
          onNewForm={onNewForm}
          className="bg-custom-primary text-white rounded-full px-3 py-2"
        >
          News
        </NewForm>
      </div>
      <div className="h-full overflow-y-auto mb-20 pe-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5">
          {forms.map((e, i) => (
            <UpdateForm
              onFormUpdate={onFormUpdate}
              onFormDelete={onFormDelete}
              form={e}
              key={i}
              className="flex flex-col items-center text-white h-44 justify-center bg-custom-primary rounded-lg"
            >
              <FileIcon className="size-16" />
              <p className="text-2xl">{e.name}</p>
            </UpdateForm>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminForms
