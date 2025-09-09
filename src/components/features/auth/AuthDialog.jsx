import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { ArrowRight } from "lucide-react"

export function AuthDialog() {
  const [view, setView] = useState("login")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Login <ArrowRight className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs lg:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {view === "login" ? "Login" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-teal-700">
            Welcome to Re:Furnish
          </DialogDescription>
        </DialogHeader>
        {view === "login" ? (
          <LoginForm onSwitch={() => setView("register")} />
        ) : (
          <RegisterForm onSwitch={() => setView("login")} setView={setView} />
        )}
      </DialogContent>
    </Dialog>
  )
}
