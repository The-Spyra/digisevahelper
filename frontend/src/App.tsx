import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Verify from "./pages/Verify"
import AdminRoutes from "./components/admin/AdminRoutes"
import AdminTools from "./pages/admin/AdminTools"
import AdminLogin from "./pages/admin/AdminLogin"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="tools" element={<AdminTools />} />
      </Route>
    </Routes>
  )
}

export default App
