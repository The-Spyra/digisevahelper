import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import api, { handleAxiosError } from "../utils/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import Navbar from "../components/Navbar"

const formSchema = z
  .object({
    email: z.string().email({ message: "Email is invalid" }),
    shopName: z.string(),
    phone: z.string(),
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
        toast.success("Verfication Link sent to the mail", { duration: 3000 })
        setTimeout(() => navigate(-1), 3000)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      handleAxiosError(error, navigate)
    }
  }

  return (
    <div className=" min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full py-10">
        <div className="md:w-[40%] p-[55px] bg-gradient-to-tl from-[#046350] to-[#67ECD1] shadow-xl rounded-xl">
          <div className="flex flex-col items-center gap-5 bg-white rounded-xl px-[36px] py-8">
            <p className="text-2xl md:text-4xl">Create an account</p>
            <form
              className="flex flex-col gap-3 w-full"
              onSubmit={handleSubmit(submit)}
            >
              <label>Email</label>
              <input
                {...register("email")}
                placeholder="Email"
                type="text"
                className="outline-none border-2 rounded h-[48px] w-full px-2"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <label>Shop Name</label>
              <input
                {...register("shopName")}
                placeholder="Shop Name"
                type="text"
                className="outline-none border-2 rounded h-[48px] w-full px-2"
              />
              {errors.shopName && (
                <p className="text-red-500">{errors.shopName.message}</p>
              )}
              <label>Phone Number</label>
              <input
                {...register("phone")}
                placeholder="Phone Number"
                type="text"
                className="outline-none border-2 rounded h-[48px] w-full px-2"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
              <label>Password</label>
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className="outline-none border-2 rounded h-[48px] w-full px-2"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <label>Confirm Password</label>
              <input
                {...register("confirmPassword")}
                placeholder="Confirm password"
                type="password"
                className="outline-none border-2 rounded h-[48px] w-full px-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
              <button className="bg-[#1570EF] w-full rounded py-2 hover:bg-[#325f9f] transition-all duration-150 text-white">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
