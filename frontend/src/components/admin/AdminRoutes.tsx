import { Outlet } from "react-router-dom"
import AdminNavbar from "./AdminNavbar"

const AdminRoutes = () => {
  return (
    <div className="flex flex-col items-center gap-5 h-screen overflow-hidden">
      <AdminNavbar />
      <div className="h-full w-full px-10">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminRoutes
