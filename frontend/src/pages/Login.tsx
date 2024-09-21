import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import api, { handleAxiosError } from "../utils/api"
import { toast } from "sonner"
import Navbar from "../components/Navbar"

const formSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  password: z.string().min(1, { message: "Password field cannot be empty" }),
})

type formType = z.infer<typeof formSchema>

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formType>({ resolver: zodResolver(formSchema) })

  const submit = async (body: formType) => {
    try {
      const { data } = await api.post("/auth/login", body)
      if (data.success) {
        localStorage.setItem("token", data.token)
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      handleAxiosError(error, navigate)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center mt-10 md:w-[40%] justify-center self-center py-6 md:py-[80px]  bg-gradient-to-tl from-[#046350] to-[#67ECD1] rounded-xl">
        <div className="flex flex-col items-center justify-center gap-5 bg-white rounded-xl py-8 px-5 w-[80%]">
          <p className="text-2xl md:text-4xl">Login to your account</p>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col w-full items-center px-5 md:px-[100px] py-3 gap-2"
          >
            <label className="hidden md:block" htmlFor="">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="Email"
              type="text"
              className="outline-none border-2 w-full px-1 py-1 md:py-[12px] rounded"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <label className="hidden md:block" htmlFor="">
              Password
            </label>

            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              className="outline-none border-2 w-full px-1 py-1 md:py-[12px]  rounded"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <button
              type="submit"
              className="self-center bg-[#2AA88F] py-2 rounded-md text-white w-full"
            >
              Login
            </button>
            <p className="text-[#98A2B3] text-sm text-center self-center">
              Didn't have an account?
              <Link to={"/Register"} className="text-[#2AA88F] underline">
                Sign Up
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
