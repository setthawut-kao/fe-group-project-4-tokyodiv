import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useRef, useState } from "react";

export default function EditUser({ initialUser = {}, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});
  const hasHydrated = useRef(false);

  // โหมดแก้ไข
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (hasHydrated.current) return;
    setFormData((fd) => ({
      ...fd,
      firstName: initialUser.firstName || "",
      lastName: initialUser.lastName || "",
      email: initialUser.email || "",
    }));
    hasHydrated.current = true;
  }, [initialUser.firstName, initialUser.lastName, initialUser.email]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((fd) => ({ ...fd, [id]: value }));
    setErrors((er) => ({ ...er, [id]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Please enter your first name";
    if (!formData.lastName.trim()) newErrors.lastName = "Please enter your last name";
    if (!formData.email.trim()) newErrors.email = "Please enter your email";

    const wantsPwChange =
      formData.currentPassword || formData.newPassword || formData.confirmNewPassword;

    if (wantsPwChange) {
      if (!formData.currentPassword)
        newErrors.currentPassword = "Please enter your current password";
      if (formData.newPassword.length < 6)
        newErrors.newPassword = "New password must be at least 6 characters";
      if (formData.newPassword !== formData.confirmNewPassword)
        newErrors.confirmNewPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
    };
    if (formData.newPassword) {
      payload.currentPassword = formData.currentPassword;
      payload.newPassword = formData.newPassword;
    }

    try {
      await onSave?.(payload);
      alert("Saved!");
      setIsEditing(false); // ออกจากโหมดแก้ไขเมื่อบันทึกสำเร็จ
    } catch (err) {
      alert(err?.message || "Failed to save.");
    }
  };

  const handleCancel = () => {
    // รีเซ็ตค่ากลับจาก initialUser และออกจากโหมดแก้ไข
    setFormData({
      firstName: initialUser.firstName || "",
      lastName: initialUser.lastName || "",
      email: initialUser.email || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setErrors({});
    setIsEditing(false);
    onCancel?.();
  };

  const fields = [
    { id: "firstName", label: "First Name", type: "text" },
    { id: "lastName", label: "Last Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "currentPassword", label: "Current Password (optional)", type: "password" },
    { id: "newPassword", label: "New Password (optional)", type: "password" },
    { id: "confirmNewPassword", label: "Confirm New Password", type: "password" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center">
        <h2 className="font-extrabold text-4xl my-5">EDIT PROFILE</h2>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

      </div>

      <div className="space-y-5 bg-emerald-100 p-6 rounded-lg font-sans max-w-md w-full">
        {fields.map(({ id, label, type }) => (
          <div key={id} className="space-y-1">
            <label htmlFor={id} className="text-sm font-bold text-black">
              {label}
            </label>
            {errors[id] && <p className="text-xs text-red-600 font-medium">{errors[id]}</p>}
            <input
              id={id}
              type={type}
              placeholder={label}
              value={formData[id]}
              onChange={handleChange}
              disabled={!isEditing} // ปิดการแก้ไขถ้าไม่อยู่ในโหมดแก้ไข
              className={`w-full rounded-md border px-3 py-2 text-black placeholder:text-gray-500
                          ${!isEditing ? "bg-gray-200 cursor-not-allowed" : "bg-white"}
                          focus:outline-none focus:ring-2 focus:ring-black 
                          ${errors[id] ? "border-red-500" : "border-black"}`}
            />
          </div>
        ))}

        {/* ปุ่มด้านล่าง: แสดงตามโหมด */}
        {!isEditing ? (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full rounded-md border border-black bg-emerald-300 px-6 py-2 font-bold text-black
                         shadow-[4px_4px_0_0_#000] hover:bg-emerald-400 transition-all duration-150 cursor-pointer"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="w-full rounded-md border border-black bg-emerald-300 px-6 py-2 font-bold text-black
                         shadow-[4px_4px_0_0_#000] hover:bg-emerald-400 transition-all duration-150 cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full rounded-md border border-black bg-white px-6 py-2 font-bold text-black
                         shadow-[4px_4px_0_0_#000] hover:bg-gray-100 transition-all duration-150 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        <p className="text-xs font-semibold text-black">
          💡 Leave password fields empty if you don’t want to change it.
        </p>
      </div>
    </div>
  );
}
