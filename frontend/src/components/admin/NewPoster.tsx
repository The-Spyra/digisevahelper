import { FC, ReactNode, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/Dialog"
import Poster from "../../types/poster.type"
import cn from "../../utils/cn"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handleAxiosError } from "../../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../utils/firebase"
import CustomInput from "./shared/CustomInput"
import CustomSubmitButton from "./shared/CustomSubmitButton"
import ImageDropZone from "./upload/ImageDropZone"
import adminApi from "../../utils/adminApi"

interface Props {
  children: ReactNode
  className?: string
  onNewPoster: (poster: Poster) => void
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
})

type formType = z.infer<typeof formSchema>

const NewPoster: FC<Props> = ({ children, className, onNewPoster }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File>()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetPoster,
  } = useForm<formType>({ resolver: zodResolver(formSchema) })

  const createPoster = async (body: formType) => {
    if (file) {
      setUploading(true)
      const storageRef = ref(storage, `poster/${body.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setUploadProgress(progress)
        },
        (error) => {
          console.log("Uplaod failed: ", error)
          toast.error(error.message)
        },
        () => {
          getDownloadURL(storageRef).then((imageUrl) => {
            adminApi
              .post("/admin/poster", { ...body, imageUrl })
              .then(({ data }) => {
                if (data.success) {
                  onNewPoster(data.poster)
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
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      resetPoster()
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
          <DialogTitle>Create Poster</DialogTitle>
        </DialogHeader>
        <ImageDropZone file={file} setFile={setFile} imageUrl="" />
        <form
          className="flex flex-col items-center gap-2 w-full"
          onSubmit={handleSubmit(createPoster)}
        >
          <CustomInput {...register("name")} placeholder="Name" type="text" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {uploading ? (
            <p>{uploadProgress}%</p>
          ) : (
            <CustomSubmitButton type="submit" />
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewPoster
