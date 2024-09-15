import { useState } from "react"
import { z } from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api, { handleAxiosError } from "../../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../utils/firebase"
import { PlusIcon, TrashIcon } from "lucide-react"
import ImageDropZone from "../../components/admin/upload/ImageDropZone"
import CustomInput from "../../components/admin/shared/CustomInput"
import CustomSubmitButton from "../../components/admin/shared/CustomSubmitButton"
import serviceFormSchema from "../../schema/serviceFormSchema"

type formType = z.infer<typeof serviceFormSchema>

const NewService = () => {
  const [file, setFile] = useState<File>()
  const navigate = useNavigate()

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [_error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<formType>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      documents: [""],
      provided: false,
      price: "",
    },
  })

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "documents",
  })

  const provided = watch("provided")

  const createService = (body: formType) => {
    console.log(body)
    if (file) {
      setUploading(true)
      const storageRef = ref(storage, `service/${body.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(Number(progress.toPrecision(1)))
          console.log(progress)
        },
        (error) => {
          console.log("Upload failed: ", error)
          setError(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            try {
              api
                .post("/admin/service", { ...body, imageUrl: downloadURL })
                .then(({ data }) => {
                  if (data.success) {
                    navigate(-1)
                  } else {
                    toast.error(data.message)
                  }
                })
            } catch (error) {
              handleAxiosError(error, navigate)
            }
          })
        }
      )
    } else {
      toast.error("File not selected")
    }
  }

  return (
    <div className="flex flex-col items-center h-full w-full">
      <form
        className="flex flex-col gap-5 items-center justify-between w-full h-full pb-10"
        onSubmit={handleSubmit(createService)}
      >
        <div className="flex flex-col md:flex-row items-center h-full w-full gap-10">
          <div className="flex flex-col gap-3 pb-3 items-center w-full h-full">
            <ImageDropZone file={file} setFile={setFile} imageUrl="" />
            <CustomInput {...register("name")} placeholder="Name" />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <CustomInput
              {...register("redirectUrl")}
              placeholder="Redirect Url"
            />
            {errors.redirectUrl && (
              <p className="text-red-500">{errors.redirectUrl.message}</p>
            )}
            <textarea
              {...register("description")}
              placeholder="Description"
              className="outline-none border-2 border-custom-primary px-3 py-2 w-full rounded-lg h-full"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
            <div className="flex items-center gap-5">
              <input {...register("provided")} type="checkbox" />
              <p>Provided</p>
            </div>
            {provided && (
              <div className="flex items-center gap-5 w-full">
                <CustomInput {...register("price")} placeholder="Price" />
              </div>
            )}

            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 items-center h-full w-[80%]">
            <div className="flex items-center gap-5 bg-custom-primary w-full justify-between px-3 py-2 rounded-lg">
              <p className="text-lg text-white ">Documents required</p>
              <PlusIcon
                className="cursor-pointer text-white"
                onClick={(e) => {
                  e.preventDefault()
                  append("")
                }}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              {fields.map((e, i) => (
                <div key={e.id} className="flex items-center gap-2">
                  <CustomInput
                    {...register(`documents.${i}`)}
                    placeholder={`Document ${i + 1}`}
                  />
                  <TrashIcon
                    className="text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      remove(i)
                    }}
                  />
                </div>
              ))}
            </div>
            {errors.documents && (
              <p className="text-red-500">{errors.documents.message}</p>
            )}
          </div>
        </div>
        {uploading ? (
          <div>{uploadProgress}% uploaded</div>
        ) : (
          <div className="flex items-center gap-5 w-full">
            <CustomSubmitButton
              onClick={(e) => {
                e.preventDefault()
                navigate(-1)
              }}
              type="button"
              children="Cancel"
              className="bg-red-500"
            />
            <CustomSubmitButton type="submit" />
          </div>
        )}
      </form>
    </div>
  )
}

export default NewService
