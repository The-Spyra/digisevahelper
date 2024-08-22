import { FC, ReactNode, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/Dialog"
import cn from "../../utils/cn"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import api, { handleAxiosError } from "../../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import Tool from "../../types/tool.type"
import CustomInput from "./shared/CustomInput"
import CustomSubmitButton from "./shared/CustomSubmitButton"

interface Props {
  children: ReactNode
  className?: string
  onNewTool: (tool: Tool) => void
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name cannot empty" }),
  redirectUrl: z.string().url({ message: "Enter a valid url" }),
})

type formType = z.infer<typeof formSchema>

const NewTool: FC<Props> = ({ children, className, onNewTool }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<formType>({ resolver: zodResolver(formSchema) })

  const createToole = async (body: formType) => {
    try {
      const { data } = await api.post("/admin/tool", body)

      if (data.success) {
        onNewTool(data.tool)
        toast.success(data.message)
        setOpen(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      handleAxiosError(error, navigate)
    }
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }

    setOpen(open)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={cn("outline-none", className)}>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Tool</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col items-center gap-3"
          onSubmit={handleSubmit(createToole)}
        >
          <CustomInput {...register("name")} placeholder="Name" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <CustomInput
            {...register("redirectUrl")}
            placeholder="Redirect Url"
          />
          {errors.redirectUrl && (
            <p className="text-red-500">{errors.redirectUrl.message}</p>
          )}
          <CustomSubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewTool
