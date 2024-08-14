import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import api, { handleAxiosError } from "../utils/api"
import { toast } from "sonner"

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
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      handleAxiosError(error, navigate)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-5">
        <p className="text-4xl">Login</p>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col items-center gap-2"
        >
          <input
            {...register("email")}
            placeholder="Email"
            type="text"
            className="outline-none border-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="outline-none border-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
