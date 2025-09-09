import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Typography } from "@/components/ui/typography"
import { ArrowRight, Eye } from "lucide-react"

import { ToggleShowPassword } from "@/components/features/auth/ToggleShowPassword"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import axios from "axios"
import { userDataContext } from "../../../context/UserContext.jsx"

export const RegisterForm = ({ onSwitch, setView }) => {
  const { serverUrl, userData, setUserData } = useContext(userDataContext)

  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const handleSignUp = async (e) => {
    e.preventDefault()
    setErr("")
    setLoading(true)

    if (password !== confirmPassword) {
      setLoading(false)
      setErr("Passwords do not match") // แสดง error ผ่าน state แทน alert
      return
    }

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      )

      setUserData(result.data)
      setLoading(false)
      // Toast success
      setView("login")
      toast.success("Account created successfully!")
      navigate("/")
    } catch (error) {
      console.log(error)
      setUserData(null)
      setLoading(false)
      setErr(error.response.data.message)
      toast.error(message) // Toast แสดง error จาก server
    }
  }

  return (
    <div className="grid gap-6 relative">
      {/* ToastContainer ต้องใส่ไว้ใน component ที่ render */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="absolute top-[20px] rigth-[20px]"
      />
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email-register">Email</Label>
            <Input
              id="email-register"
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-register">Password</Label>
            <ToggleShowPassword
              id="password-register"
              placeholder="Enter your password"
              required
              value={password}
              setValue={setPassword} // ✅ เปลี่ยนเป็น prop ที่ชื่อกลางๆ
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <ToggleShowPassword
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              setValue={setConfirmPassword} // ✅ ใช้ setConfirmPassword
            />
            {err && <p className="text-red-500 text-sm">{err}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button type="submit" className="w-full">
            Create Account <ArrowRight className="w-4 h-4" />
          </Button>
          {/* <Button variant="neutral" className="w-full">
            Cancel
          </Button> */}
        </div>
      </form>
      <div className="flex justify-center">
        <Typography as="small" className="font-semibold">
          Already have an account ?{" "}
          <Button
            type="button"
            variant="reverse"
            onClick={onSwitch}
            className="bg-white hover:underline focus:outline-none"
          >
            Login
          </Button>
        </Typography>
      </div>
    </div>
  )
}
