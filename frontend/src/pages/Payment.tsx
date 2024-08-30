import Navbar from "../components/Navbar"
import useRazorpay from "react-razorpay"
import api, { handleAxiosError } from "../utils/api"
import { toast } from "sonner"
import { useUser } from "../context/userContext"
import { Link, useNavigate } from "react-router-dom"

const PaymentPlans = () => {
  const [Razorpay] = useRazorpay()
  const { user } = useUser()
  const navigate = useNavigate()

  const handlePayment = async (id: number) => {
    try {
      const { data } = await api.post("/payment/order", {
        planType: `plan${id}`,
      })

      if (!data.success) {
        toast.error(data.message)
        return
      }

      const order = data.order
      console.log(order)

      const options = {
        key: "rzp_test_eGQQ4H7ZlC8Nip", // Enter the Key ID generated from the Dashboard
        amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: async function (response: any) {
          try {
            const { data } = await api.post("/payment/verify", {
              razorpayResponse: response,
              userId: user?._id,
              planType: `plan${id}`,
            })
            if (data.success) {
              toast.success(data.message)
            } else {
              toast.error(data.message)
            }
          } catch (error) {
            handleAxiosError(error, navigate)
          }
        },
        prefill: {
          name: "DIGI SEVA HELPER",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      }

      const rzp1 = new Razorpay(options)

      rzp1.on("payment.failed", function (response: any) {
        console.log(response)
        toast.error(response.error.description, { duration: 10000 })
      })

      rzp1.open()
    } catch (error) {
      handleAxiosError(error, navigate)
    }
  }

  const plans = [
    {
      id: 1,
      name: "Plan 1",
      price: "399/month",
      features: ["Have access To everything Accept Posts"],
      locked: user?.planType == "plan3" || user?.planType == "plan2",
    },
    {
      id: 2,
      name: "Add on Plan",
      price: "1399/month",
      features: ["Adding posts to the plan 1"],
      locked: user?.planType != "plan1",
    },
    {
      id: 3,
      name: "Plan 2",
      price: "1499/month",
      features: ["Full Access to the Website"],
      locked: user?.planType == "plan1" || user?.planType == "plan2",
    },
  ]

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center py-10">
        <p className="text-6xl font-semibold text-custom-primary">Plans</p>
        <Link to={"/terms-and-condition"} className="text-gray-500">
          Terms and Conditions
        </Link>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-8 bg-white">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border border-custom-primary rounded-lg p-6 bg-white w-64 text-center shadow-lg"
          >
            <h2 className="text-black text-2xl mb-4 underline">{plan.name}</h2>
            <p className="text-primary text-xl mb-6">{plan.price}</p>
            <ul className="mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-black text-lg my-2">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                e.preventDefault()
                handlePayment(plan.id)
              }}
              disabled={plan.locked}
              className="mt-4 px-4 py-2 disabled:bg-gray-600 bg-custom-primary text-white rounded hover:bg-opacity-90 transition"
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentPlans
