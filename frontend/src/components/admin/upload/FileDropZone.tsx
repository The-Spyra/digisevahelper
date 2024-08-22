import { FC, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import cn from "../../../utils/cn"

interface Props {
  setFile: (file: File) => void
  file: File | undefined
  className?: string
}

const FileDropZone: FC<Props> = ({ file, setFile, className }) => {
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
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg h-44 w-full bg-custom-primary text-white px-5",
        className
      )}
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="h-full w-full flex items-center justify-center bg-custom-primary rounded-lg"></div>
      ) : isDragActive ? (
        "Drop the file here"
      ) : (
        "Drag and drop a file here or click to select a file"
      )}
    </div>
  )
}

export default FileDropZone
