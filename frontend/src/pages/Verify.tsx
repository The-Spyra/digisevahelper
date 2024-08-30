import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import api, { handleAxiosError } from "../utils/api"
import { toast } from "sonner"
import Navbar from "../components/Navbar"
import { storage } from "../utils/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import User from "../types/user.type"

const uploadImage = async (file: File, email: string) => {
  const storageRef = ref(storage, `banners/${email.split("@")[0]}`)
  const uploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(`Upload is ${Math.floor(progress)}% done`)
    },
    (error) => {
      console.error("Error uploading file:", error)
    }
  )
  const url = await getDownloadURL(uploadTask.snapshot.ref)
  return url
}

const Verify = () => {
  const [params] = useSearchParams()
  const token = params.get("token")
  const [user, setUser] = useState<User>()
  const [banner, setBanner] = useState<File>()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const submit = async () => {
    if (user && banner)
      try {
        const res = await uploadImage(banner, user.email)
        const { data } = await api.post("/auth/verify", {
          bannerUrl: res,
          token,
        })
        if (data.success) {
          toast.success("Account is Verfied", { duration: 3000 })
          setTimeout(() => navigate("/login"), 3000)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        handleAxiosError(error, navigate)
      }
  }

  useEffect(() => {
    if (token) {
      setLoading(true)
      api
        .post("/auth/unverifiedUser", { token })
        .then(({ data }) => {
          if (data.success) {
            setUser(data.user)
          } else {
            toast.error(data.message)
          }
        })
        .catch((error) => {
          handleAxiosError(error, navigate)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [token, navigate])

  if (loading) {
    return (
      <div className="h-screen">
        <Navbar />
        <div className="flex items-center justify-center ">
          <p>Loading</p>
        </div>
      </div>
    )
  }

  return (
    <div className=" min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full py-10">
        <div className="md:w-[40%] p-[55px] bg-gradient-to-tl from-[#046350] to-[#67ECD1] shadow-xl rounded-xl">
          <div className="flex flex-col items-center gap-5 bg-white rounded-xl px-[36px] py-8">
            <p className="text-2xl md:text-4xl">Verify account</p>
            <form
              className="flex flex-col gap-3 w-full"
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
            >
              <label>Email</label>
              <label
                htmlFor=""
                className="outline-none border-2 rounded h-[48px] w-full px-2 flex items-center "
              >
                {user?.email}
              </label>

              <label>Shop Name</label>
              <label
                htmlFor=""
                className="outline-none border-2 rounded h-[48px] w-full px-2 flex items-center "
              >
                {user?.shopName}
              </label>

              <label>Phone Number</label>
              <label
                htmlFor=""
                className="outline-none border-2 rounded h-[48px] w-full px-2 flex items-center "
              >
                {user?.phone}
              </label>
              <label>Upload my banner</label>
              <label className="px-8 py-3 bg-[#39CBAE] text-black shadow-md rounded">
                <input
                  onChange={(e) => {
                    if (e.target.files) {
                      setBanner(e.target.files[0])
                    }
                  }}
                  accept="image/*"
                  type="file"
                  className="hidden"
                />
                {banner ? banner.name : "Click here to upload"}
              </label>
              <div className="flex gap-5 items-center justify-evenly mt-5">
                <button
                  type="button"
                  className="bg-[#E25353] px-5 shadow-md  rounded-3xl py-2 hover:bg-[#af4444] transition-all duration-150 text-white"
                >
                  Reject
                </button>
                <button
                  type="submit"
                  className="bg-[#2FD7B5] px-5 shadow-md  rounded-3xl py-2 hover:bg-[#389f8b] transition-all duration-150 text-white"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verify
