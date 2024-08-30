import { ReactNode } from "react"
import Navbar from "../components/Navbar"

const TermsAndCondition = () => {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center py-10 px-5 gap-5 sm:px-20">
        <p className="text-2xl md:text-5xl text-center">Terms and Conditions</p>

        <Title>1. Introduction</Title>

        <Description>
          Welcome to Chooscod These Terms and Conditions govern your use of our
          payment services provided through Razorpay. By using our services, you
          agree to comply with and be bound by these terms.
        </Description>

        <Title>2. Payment Processing</Title>

        <Description>
          We use Razorpay to process payments for our products and services.
          Razorpay is a secure payment gateway that facilitates transactions
          through various payment methods, including credit/debit cards, net
          banking, and digital wallets.
        </Description>

        <Title>3. Payment Information</Title>

        <Description>
          When you make a payment through our website, Razorpay collects and
          processes your payment information. We do not store or have access to
          your payment details. All transactions are encrypted and handled
          securely by Razorpay.
        </Description>

        <Title>4. Security</Title>

        <Description>
          We are committed to ensuring the security of your payment information.
          Razorpay employs industry-standard security measures to protect your
          data. However, we recommend that you also take precautions to protect
          your personal information, such as using strong passwords and keeping
          your login credentials confidential.
        </Description>

        <Title>5. Dispute Resolution</Title>

        <Description>
          In the event of any disputes related to payments or transactions,
          please contact our customer support team. We will work with you and
          Razorpay to resolve any issues promptly.
        </Description>

        <Title>6. Changes to Terms</Title>

        <Description>
          We reserve the right to update or modify these Terms and Conditions at
          any time. Any changes will be effective immediately upon posting on
          our website. It is your responsibility to review these terms
          periodically for any updates.
        </Description>

        <Title>7. Contact Us</Title>

        <Description>
          If you have any questions or concerns about these Terms and Conditions
          or our payment services, please contact us at:
        </Description>

        <div className="w-full">
          <p>Chooscod</p>
          <p>
            Spunic Business Space, Near Nit Calicut , Calicut , Kerala 673601,
            India
          </p>
          <p>Chooscod@gmail.com</p>
          <p>+91 80755 65598</p>
        </div>
      </div>
    </div>
  )
}

const Title = ({ children }: { children: ReactNode }) => {
  return <p className="text-xl md:text-2xl">{children}</p>
}

const Description = ({ children }: { children: ReactNode }) => {
  return <p className="md:text-xl">{children}</p>
}

export default TermsAndCondition
