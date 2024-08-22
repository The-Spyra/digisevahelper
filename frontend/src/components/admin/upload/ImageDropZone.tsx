import { FC, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import cn from "../../../utils/cn"

interface Props {
  setFile: (file: File) => void
  file: File | undefined
  imageUrl: string | undefined
  className?: string
}

const ImageDropZone: FC<Props> = ({ setFile, className, file, imageUrl }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0]
      if (selectedFile) {
        setFile(selectedFile)
      }
    },
    [setFile]
  )

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg h-44 w-full text-white",
        className
      )}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="h-full w-full flex items-center justify-center bg-custom-primary rounded-lg px-5">
          Drop the file here
        </div>
      ) : file ? (
        <div className="flex items-center justify-center size-56 w-full">
          <img src={URL.createObjectURL(file)} className="size-44" />
        </div>
      ) : imageUrl ? (
        <div className="flex items-center justify-center size-56 w-full">
          <img src={imageUrl} className="size-44" />
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-custom-primary rounded-lg px-5">
          Drag and drop a file here or click to select a file
        </div>
      )}
    </div>
  )
}

export default ImageDropZone
