<<<<<<< HEAD
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
=======
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
>>>>>>> 1798bb6ac483571ea286220524f1d663364bc13b

export const ToggleShowPassword = ({
  id,
  placeholder,
  required,
  value,
<<<<<<< HEAD
  setValue,
}) => {
  const [showPassword, setShowPassword] = useState(false)
=======
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
>>>>>>> 1798bb6ac483571ea286220524f1d663364bc13b

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleChange = (e) => setValue(e.target.value)

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="pr-10"
        onChange={handleChange}
        value={value}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={togglePasswordVisibility}
        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}
