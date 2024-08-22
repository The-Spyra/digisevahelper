import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/Dialog"
import Tool from "../../types/tool.type"
import cn from "../../utils/cn"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api, { handleAxiosError } from "../../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import CustomInput from "./shared/CustomInput"

interface Props {
  children: ReactNode
  className?: string
  onToolUpdate: (too: Tool) => void
  tool: Tool
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name cannot empty" }),
  redirectUrl: z.string().url({ message: "Enter a valid url" }),
})

type formType = z.infer<typeof formSchema>

const UpdateTool: FC<Props> = ({ onToolUpdate, children, className, tool }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<formType>({ resolver: zodResolver(formSchema) })

  useEffect(() => {
    setValue("name", tool.name)
    setValue("redirectUrl", tool.redirectUrl)
  }, [tool, setValue])

  const updateTools = useCallback(
    async (body: formType) => {
      try {
        const { data } = await api.put(`/admin/tool/${tool._id}`, body)

        if (data.success) {
          onToolUpdate(data.tool)
          toast.success(data.message)
          setOpen(false)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        handleAxiosError(error, navigate)
      }
    },
    [navigate, onToolUpdate, tool._id]
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn("outline-none", className)}>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Update Tool</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-1 items-center"
          onSubmit={handleSubmit(updateTools)}
        >
          <CustomInput {...register("name")} placeholder="Name" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <CustomInput
            {...register("redirectUrl")}
            placeholder="Redirect Url"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <button type="submit" className="">
            Save
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTool
