import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import api, { handleAxiosError } from "../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const formSchema = z
  .object({
    email: z.string().email({ message: "Email is invalid" }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password != confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't march",
        path: ["confirmPassword"],
      })
    }
  })

type formType = z.infer<typeof formSchema>

const Register = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  })

  const submit = async (body: formType) => {
    try {
      const { data } = await api.post("/auth/register", body)
      if (data.success) {
        navigate("/verify")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      handleAxiosError(error, navigate)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-5">
        <p className="text-4xl">Register</p>
        <form
          className="flex flex-col items-center gap-3"
          onSubmit={handleSubmit(submit)}
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
          <input
            {...register("confirmPassword")}
            placeholder="Confirm password"
            type="password"
            className="outline-none border-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <button>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
