import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomInput from "../../components/admin/shared/CustomInput"
import CustomSubmitButton from "../../components/admin/shared/CustomSubmitButton"
import api, { handleAxiosError } from "../../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const formSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
})

type formType = z.infer<typeof formSchema>

const AdminLogin = () => {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formType>({ resolver: zodResolver(formSchema) })

  const login = async (body: formType) => {
    try {
      const { data } = await api.post("/admin/auth/login", body)

      console.log(data)
      if (data.success) {
        navigate("/admin")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      handleAxiosError(error, navigate)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-5 rounded-lg shadow-custom-primary shadow-lg p-5">
        <div className="flex flex-col items-center gap-2">
          <p className="text-4xl font-semibold text-custom-primary">Login</p>
          <p>This login page is only for admins</p>
        </div>
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit(login)}
        >
          <CustomInput {...register("username")} placeholder="Username" />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <CustomInput
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <CustomSubmitButton type="submit" />
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
