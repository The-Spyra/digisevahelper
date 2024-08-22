import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../shared/Sheet"
import BurgerMenu from "../shared/BurgerMenu"

const links: { name: string; to: string }[] = [
  {
    name: "SERVICES",
    to: "/admin",
  },
  {
    name: "FORMS",
    to: "/admin/forms",
  },
  {
    name: "EDITING TOOLS",
    to: "/admin/tools",
  },
  {
    name: "POSTERS",
    to: "/admin/posters",
  },
]

const AdminNavbar = () => {
  return (
    <header className="flex items-center md:justify-center gap-10 py-5 rounded-b-xl font-bold bg-custom-primary w-full px-5">
      <MobileNav />
      <Links className="hidden md:block" />
    </header>
  )
}

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <BurgerMenu />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col items-center gap-10 bg-custom-primary"
      >
        <p className="text-4xl font-semibold">Admin</p>
        <div className="flex flex-col items-center gap-5">
          <Links />
        </div>
      </SheetContent>
    </Sheet>
  )
}

const Links = ({ className }: { className?: string }) => {
  return links.map((e, i) => (
    <Link to={e.to} key={i} className={className}>
      {e.name}
    </Link>
  ))
}

export default AdminNavbar
