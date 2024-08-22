import { FC, ReactNode, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/Dialog"
import Form from "../../types/form.type"
import cn from "../../utils/cn"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api, { handleAxiosError } from "../../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../utils/firebase"
import FileDropZone from "./upload/FileDropZone"
import { FileIcon } from "lucide-react"
import CustomInput from "./shared/CustomInput"
import CustomSubmitButton from "./shared/CustomSubmitButton"

interface Props {
  children: ReactNode
  className?: string
  onNewForm: (form: Form) => void
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
})

type formType = z.infer<typeof formSchema>

const NewForm: FC<Props> = ({ children, className, onNewForm }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File>()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<formType>({ resolver: zodResolver(formSchema) })

  const createForm = async (body: formType) => {
    if (!file) {
      toast.error("Please select a form to upload")
      return
    }

    setUploading(true)
    const storageRef = ref(storage, `form/${body.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(progress)
      },
      (error) => {
        console.log("Uplaod failed: ", error)
        toast.error(error.message)
      },
      () => {
        getDownloadURL(storageRef).then((fileUrl) => {
          api
            .post("/admin/form", { ...body, fileUrl })
            .then(({ data }) => {
              if (data.success) {
                onNewForm(data.form)
                onOpenChange(false)
              } else {
                toast.error(data.message)
              }
            })
            .catch((error) => {
              handleAxiosError(error, navigate)
            })
            .finally(() => {
              setOpen(false)
            })
        })
      }
    )
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
      setFile(undefined)
      setUploading(false)
      setUploadProgress(0)
    }

    setOpen(open)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={cn("outline-none", className)}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-5 bg-white">
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
        </DialogHeader>
        {file ? (
          <div className="flex flex-col items-center justify-center gap-5 bg-custom-primary text-white w-full rounded-lg h-44">
            <FileIcon className="size-10" />
            <p>{file.name}</p>
          </div>
        ) : (
          <FileDropZone file={file} setFile={setFile} />
        )}
        <form
          className="flex flex-col items-center gap-2 w-full"
          onSubmit={handleSubmit(createForm)}
        >
          <CustomInput {...register("name")} placeholder="Name" type="text" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {uploading ? <div>{uploadProgress}%</div> : <CustomSubmitButton />}
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewForm
