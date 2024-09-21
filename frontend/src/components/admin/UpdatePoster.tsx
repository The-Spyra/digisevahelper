import { FC, ReactNode, useCallback, useEffect, useState } from "react"
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
  onPosterUpdate: (poster: Poster) => void
  onPosterDelete: (id: string) => void
  poster: Poster
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
})

type formType = z.infer<typeof formSchema>

const UpdatePoster: FC<Props> = ({
  children,
  className,
  onPosterUpdate,
  onPosterDelete,
  poster,
}) => {
  const navigate = useNavigate()
  const [deleteMode, setDeleteMode] = useState(false)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File>()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<formType>({ resolver: zodResolver(formSchema) })

  useEffect(() => {
    setValue("name", poster.name)
  }, [poster, setValue])

  const putPoster = useCallback(
    async (body: { name?: string; imageUrl?: string }) => {
      try {
        const { data } = await adminApi.put(`/admin/poster/${poster._id}`, body)
        if (data.success) {
          onPosterUpdate(data.poster)
          toast.success(data.message)
          onOpenChange(false)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        handleAxiosError(error, navigate)
      }
    },
    [poster, navigate, onPosterUpdate]
  )

  const updatePoster = async (body: formType) => {
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
            putPoster({ ...body, imageUrl })
          })
        }
      )
    } else {
      putPoster({ ...body })
    }
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setFile(undefined)
      setUploading(false)
      setUploadProgress(0)
      setDeleteMode(false)
    }

    setOpen(open)
  }

  const deletePoster = useCallback(async () => {
    try {
      const { data } = await adminApi.delete(`/admin/poster/${poster._id}`)
      if (data.success) {
        onPosterDelete(poster._id)
        toast.success(data.message)
        setOpen(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      handleAxiosError(error, navigate)
    }
  }, [poster._id, onPosterDelete, navigate])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={cn("outline-none", className)}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-5 bg-white">
        <DialogHeader>
          <DialogTitle>Update Poster</DialogTitle>
        </DialogHeader>
        {deleteMode ? (
          <div className="flex items-center gap-5 w-full">
            <CustomSubmitButton
              onClick={(e) => {
                e.preventDefault()
                setDeleteMode(false)
              }}
              type="button"
              children="No"
            />
            <CustomSubmitButton
              onClick={(e) => {
                e.preventDefault()
                deletePoster()
              }}
              type="button"
              children="Yes"
              className="bg-red-500"
            />
          </div>
        ) : (
          <>
            <div className="flex items-center w-full">
              <ImageDropZone
                className="outline-none"
                setFile={setFile}
                file={file}
                imageUrl={poster.imageUrl}
              />
            </div>
            <form
              className="flex flex-col items-center gap-2 w-full"
              onSubmit={handleSubmit(updatePoster)}
            >
              <CustomInput
                {...register("name")}
                placeholder="Name"
                type="text"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              {uploading ? (
                <div>{uploadProgress}</div>
              ) : (
                <>
                  <CustomSubmitButton type="submit" />
                  <CustomSubmitButton
                    onClick={(e) => {
                      e.preventDefault()
                      setDeleteMode(true)
                    }}
                    type="button"
                    children="Delete"
                    className="bg-red-500"
                  />
                </>
              )}
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UpdatePoster
