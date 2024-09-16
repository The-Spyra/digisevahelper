import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import Poster from "../types/poster.type"
import api, { handleAxiosError } from "../utils/api"
import { toast } from "sonner"
import { useUser } from "../context/userContext"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../utils/firebase"

function Posts() {
  const navigate = useNavigate()
  const { user } = useUser()

  const [file, setFile] = useState<File>()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [search, setSearch] = useState("")
  const [posters, setPosters] = useState<Poster[]>([])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const { data } = await api.get(`/poster?name=${search}`)

        if (data.success) {
          setPosters(data.posters)
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

  const updateBanner = async (bannerUrl: string) => {
    try {
      const { data } = await api.patch("/user/banner", { bannerUrl })
      if (data.success) {
        toast.success(data.message)
        setUploadProgress(0)
        setUploading(false)
        setFile(undefined)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      handleAxiosError(error, navigate)
    }
  }

  const uploadBanner = async () => {
    if (file) {
      setUploading(true)
      const storageRef = ref(storage, `banner/${user?.email.split("@")[0]}+new`)
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
            updateBanner(imageUrl)
          })
        }
      )
    } else {
      toast.error("Please select a file")
    }
  }


  const downloadPoster = async (posterId: string) => {
    try {
      const response = await api.get(`/poster/download?posterId=${posterId}`, {
        responseType: "arraybuffer", // Important: This tells Axios to treat the response as an ArrayBuffer
      })
      const data = response.data
      console.log(data)
      const blob = new Blob([data], { type: "image/jpeg" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      console.log(url)
      link.href = url
      link.download = "image.jpg" // Desired file name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.log(error)
      handleAxiosError(error, navigate)
    }
  }

  return (
    <div className="bg-[#DDE2E1] pb-5">
      <Navbar />
      <div className=" flex flex-col justify-center">
        <h1 className="font-extrabold text-[26px] md:text-[64px] text-center mt-20">
          POSTS
        </h1>
        <label className="relative self-center flex gap-4  justify-between md:w-[70%] w-[90%] px-3 py-2 bg-[#05846A8C] rounded-[100px] h-[30px] md:h-[30px] md:h-[50px] items-center">
          <svg
            width="25"
            height="25"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.88889 13.6111C3.88889 8.24169 8.24169 3.88889 13.6111 3.88889C18.9805 3.88889 23.3334 8.24169 23.3334 13.6111C23.3334 18.9805 18.9805 23.3334 13.6111 23.3334C8.24169 23.3334 3.88889 18.9805 3.88889 13.6111ZM13.6111 0C6.09392 0 0 6.09392 0 13.6111C0 21.1284 6.09392 27.2223 13.6111 27.2223C16.6684 27.2223 19.4904 26.2143 21.7626 24.5125L31.6807 34.4305C32.44 35.1898 33.6712 35.1898 34.4305 34.4305C35.1898 33.6712 35.1898 32.44 34.4305 31.6807L24.5125 21.7626C26.2143 19.4904 27.2223 16.6684 27.2223 13.6111C27.2223 6.09392 21.1284 0 13.6111 0Z"
              fill="#212121"
            />
          </svg>
          <input
            value={search}
            onChange={(e) => {
              e.preventDefault()
              setSearch(e.target.value)
            }}
            type="text"
            placeholder="Search For Posts"
            className="w-full placeholder:text-[#00000054] placeholder:text-center font-semibold border-none outline-none px-2 bg-transparent"
          />
        </label>
        <div className="md:w-[70%] px-[6px] w-full self-center mt-10 flex flex-col md:flex-row items-center gap-5 md:gap-5">
          <div className="md:w-[60%] w-full p-5 flex flex-col justify-center items-center gap-5 h-full bg-gradient-to-br from-[#096C59] to-[#12D2AC] shadow-lg rounded-3xl">
            <div className="flex md:flex-row flex-col gap-10 ">
              <div className="flex flex-col gap-2 justify-start">
                <label className="font-semibold">Shop Name</label>
                <input
                  value={user?.shopName}
                  type="text"
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <label className="font-semibold">Contact Number</label>
                <input value={user?.phone} type="text" className="rounded-md" />
              </div>
            </div>
            <button className="px-8 py-3 bg-[#11534F] rounded-3xl text-white font-semibold">
              SUBMIT
            </button>
          </div>
          <div className="md:w-[40%]  px-[6px] py-5 flex flex-col justify-center items-center gap-5 bg-gradient-to-br from-[#096C59] to-[#12D2AC] shadow-lg rounded-3xl h-full w-full">
            <div className="flex md:flex-row flex-col gap-10 ">
              <div className="flex flex-col gap-2 justify-start">
                <label className="font-semibold">Upload Banner</label>
                <input
                  onChange={(e) => {
                    e.preventDefault()
                    if (e.target.files) {
                      setFile(e.target.files[0])
                    }
                  }}
                  type="file"
                  className="rounded-md hidden"
                  id="file"
                />
                <label
                  className="md:w-[200px] w-[150px] h-[30px] px-2 rounded-md bg-white"
                  htmlFor="file"
                >
                  {file ? file.name : "Upload Images"}
                </label>
              </div>
              <div className="flex  gap-2 justify-center items-end">
                <a
                  target="_blank"
                  href={user?.bannerUrl}
                  type="text"
                  className="w-[150px] px-2 h-[30px] rounded-md bg-white"
                >
                  Preview
                </a>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                uploadBanner()
              }}
              disabled={uploading}
              className="px-8 py-3 bg-[#11534F] rounded-3xl text-white font-semibold"
            >
              {uploading ? `${uploadProgress}%` : "SUBMIT"}
            </button>
          </div>
        </div>
        <div className="px-[6px] md:px-8 flex flex-col">
          <div className="w-full rounded-[100px] mt-10 flex justify-between px-5 bg-[#1A8F78] h-[30px] md:h-[50px] items-center">
            <h1 className="text-[13px] md:text-[30px] font-semibold text-black">
              POSTER NAME
            </h1>
            <h1 className="text-[13px] md:text-[30px] font-semibold text-black">
              DOWNLOAD LINK
            </h1>
          </div>
          {posters.map((e, i) => (
            <div
              key={i}
              className="w-full rounded-[100px] mt-2 md:mt-3 py-1 flex justify-between px-5 border border-black h-[30px] md:h-[50px] items-center"
            >
              <h1 className="text-[13px] md:text-[30px] font-semibold text-black">
                {e.name}
              </h1>
              <button
                onClick={(ev) => {
                  ev.preventDefault()
                  downloadPoster(e._id)
                }}
                className="px-5 md:px-10 flex justify-center items-center bg-[#207C6A] text-white font-semibold rounded-[100px]"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts
