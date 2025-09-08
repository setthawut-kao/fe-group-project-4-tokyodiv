import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";

export const ShippingForm = ({ formData, setFormData }) => {
  // ฟังก์ชันสำหรับอัปเดต state ของฟอร์ม
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div className="space-y-6">
      <Typography as="h2" className="text-2xl font-bold">
        Shipping Details
      </Typography>
      <div className="grid gap-2">
        <Label htmlFor="recipientName">Full Name</Label>
        <Input
          id="recipientName"
          placeholder="Enter recipient's full name"
          value={formData.recipientName}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          placeholder="Enter full shipping address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
