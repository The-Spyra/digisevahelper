import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Doc from "./pages/Doc"
import Charges from "./pages/Charges"
import Forms from "./pages/Forms"
import EditingTools from "./pages/EditingTools"
import Posts from "./pages/Posts"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Verify from "./pages/Verify"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminRoutes from "./components/admin/AdminRoutes"
import AdminTools from "./pages/admin/AdminTools"
import AdminPosters from "./pages/admin/AdminPosters"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminForms from "./pages/admin/AdminForms"
import NewService from "./pages/admin/NewService"
import ServiceDetails from "./pages/admin/ServiceDetails"
import AdminUsers from "./pages/admin/AdminUsers"
import PaymentPlans from "./pages/Payment"
import TermsAndCondition from "./pages/TermsAndCondition"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doc" element={<Doc />} />
      <Route path="/charges" element={<Charges />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/editing-tools" element={<EditingTools />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="payment" element={<PaymentPlans />} />
      <Route path="/terms-and-condition" element={<TermsAndCondition />} />
      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="" element={<AdminDashboard />} />
        <Route path="newService" element={<NewService />} />
        <Route path="service/:id" element={<ServiceDetails />} />
        <Route path="forms" element={<AdminForms />} />
        <Route path="tools" element={<AdminTools />} />
        <Route path="posters" element={<AdminPosters />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  )
}

export default App
