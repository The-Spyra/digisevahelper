import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api, { handleAxiosError } from "../../utils/api"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../utils/firebase"
import { PlusIcon, TrashIcon } from "lucide-react"
import ImageDropZone from "../../components/admin/upload/ImageDropZone"
import CustomInput from "../../components/admin/shared/CustomInput"
import CustomSubmitButton from "../../components/admin/shared/CustomSubmitButton"
import serviceFormSchema from "../../schema/serviceFormSchema"
import Service from "../../types/service.type"

type formType = z.infer<typeof serviceFormSchema>

const ServiceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [service, setService] = useState<Service>()
  const [file, setFile] = useState<File>()

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<formType>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      documents: [""],
      provided: false,
      minPrice: 0,
      maxPrice: 0,
    },
  })
  const provided = watch("provided")
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  })

  useEffect(() => {
    if (service) {
      console.log(service)
      setValue("name", service.name)
      setValue("description", service.description)
      setValue("documents", service.documents)
      setValue("redirectUrl", service.redirectUrl)
      setValue("provided", service.provided)
      setValue("minPrice", service.minPrice)
      setValue("maxPrice", service.maxPrice)
    }
  }, [service, setValue])

  useEffect(() => {
    api
      .get(`/admin/service/${id}`)
      .then(({ data }) => {
        if (data.success) {
          setService(data.service)
        } else {
          toast.error(data.message)
        }
      })
      .catch((error) => {
        handleAxiosError(error, navigate)
      })
  }, [id, navigate, setValue])

  const putApiCall = (body: formType & { imageUrl?: string }) => {
    api
      .post("/admin/service", body)
      .then(({ data }) => {
        if (data.success) {
          navigate(-1)
        } else {
          toast.error(data.message)
        }
      })
      .catch((error) => {
        handleAxiosError(error, navigate)
      })
  }

  const updateService = (body: formType) => {
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
          setUploadProgress(progress)
        },
        (error) => {
          console.log("Upload failed: ", error)
          setError(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
            putApiCall({ ...body, imageUrl })
          })
        }
      )
    } else {
      putApiCall(body)
    }
  }

  return (
    <div className="flex flex-col items-center h-full w-full">
      <form
        className="flex flex-col items-center justify-between w-full h-full pb-10"
        onSubmit={handleSubmit(updateService)}
      >
        <div className="flex items-center h-full w-full gap-10">
          <div className="flex flex-col gap-3 pb-3 items-center w-full h-full">
            <ImageDropZone
              file={file}
              setFile={setFile}
              imageUrl={service?.imageUrl || ""}
            />
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
                <p>Min</p>
                <CustomInput
                  {...register("minPrice", { valueAsNumber: true })}
                  type="number"
                  className="Min price"
                />
                <p>Max</p>
                <CustomInput
                  {...register("maxPrice", {
                    valueAsNumber: true,
                    setValueAs: (val) => (isNaN(val) ? 0 : parseInt(val)),
                  })}
                  type="number"
                  className="Max price"
                />
              </div>
            )}

            {errors.minPrice && (
              <p className="text-red-500">{errors.minPrice.message}</p>
            )}
            {errors.maxPrice && (
              <p className="text-red-500">{errors.maxPrice.message}</p>
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

export default ServiceDetails
