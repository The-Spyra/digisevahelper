import Navbar from "../components/Navbar"
import DocReq from "../components/DocReq"
import { useEffect, useState } from "react"
import Service from "../types/service.type"
import { useNavigate } from "react-router-dom"
import api, { handleAxiosError } from "../utils/api"
import { toast } from "sonner"

function Doc() {
  const navigate = useNavigate()
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    api
      .get("/service/docs")
      .then(({ data }) => {
        if (data.success) {
          setServices(data.services)
        } else {
          toast.error(data.message)
        }
      })
      .catch((error) => {
        handleAxiosError(error, navigate)
      })
  }, [navigate])

  return (
    <div className="bg-[#DDE2E1] min-h-screen flex flex-col">
      <Navbar />
      <h1 className="font-extrabold text-[26px] md:text-[64px] text-center mt-20">
        Documents Required
      </h1>
      <label className="relative self-center mt-5 flex gap-4 items-center justify-between w-[90%] md:w-[70%] px-3 py-2 bg-[#05846A8C] rounded-[100px] h-[50px]">
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
          type="text"
          placeholder="Search Services"
          className="w-full placeholder:text-[#00000054] placeholder:text-center font-semibold border-none outline-none px-2 bg-transparent"
        />
      </label>
      <div className="md:px-8 px-[6px] flex flex-col">
        <div className="grid grid-cols-2 md:grid-cols-3 justify-between gap-4 md:gap-8 mt-12 md:mt-5">
          {services.map((e, i) => (
            <DocReq key={i} title={e.name} docs={e.documents} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doc
