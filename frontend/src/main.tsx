import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "sonner"
import { UserProvier } from "./context/userContext.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvier>
        <Toaster richColors />
        <App />
      </UserProvier>
    </BrowserRouter>
  </StrictMode>
)
