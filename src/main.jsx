import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { App } from "./App"
import { BrowserRouter } from "react-router-dom"
import UserContext from "./context/UserContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </StrictMode>
)
