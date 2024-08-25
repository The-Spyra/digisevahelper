import React from 'react';
import Navbar from '../components/Navbar';
import useRazorpay from "react-razorpay";

const PaymentPlans = () => {
    const [Razorpay] = useRazorpay();

const handlePayment = async () => {
 //  Create order on your backend

  const options = {
    key: "rzp_test_eGQQ4H7ZlC8Nip", // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Acme Corp",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    handler: function (response:any) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: "Piyush Garg", 
      email: "youremail@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response:any) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });

  rzp1.open();
};
  const plans = [
    { name: 'Plan 1', price: '399/month', features: ["Have access To everything Accept Posts"] },
    { name: 'Add on Plan', price: '1399/month', features: ['Adding posts to the plan 1'] },
    { name: 'Plan 2', price: '1499/month', features: ['Full Access to the Website'] }
  ];

  return (
    <div>
        <Navbar/>
    <div className="flex justify-center items-center gap-8 p-8 bg-white">
      {plans.map((plan, index) => (
        <div
          key={index}
          className="border border-primary rounded-lg p-6 bg-white w-64 text-center shadow-lg"
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
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition">
            Choose Plan
          </button>
        </div>
      ))}
    </div>

    </div>
  );
};

export default PaymentPlans;
