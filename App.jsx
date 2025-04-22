import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bookingCode: "",
    name: "",
    idNumber: "",
    specialRequest: "",
    arrivalDate: "",
    idImage: null,
    agreed: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-lg p-6 space-y-4">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">🔍 Bắt đầu check-in</h2>
            <Input
              name="bookingCode"
              placeholder="Nhập mã đặt phòng hoặc SĐT"
              value={formData.bookingCode}
              onChange={handleInputChange}
            />
            <Button className="w-full mt-4" onClick={handleNext}>Tiếp tục</Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">🧾 Nhập thông tin cá nhân</h2>
            <Input name="name" placeholder="Họ và tên" value={formData.name} onChange={handleInputChange} />
            <Input name="idNumber" placeholder="Số CMND/CCCD" value={formData.idNumber} onChange={handleInputChange} />
            <Input name="arrivalDate" type="date" value={formData.arrivalDate} onChange={handleInputChange} />
            <Textarea name="specialRequest" placeholder="Yêu cầu đặc biệt (nếu có)" value={formData.specialRequest} onChange={handleInputChange} />
            <Input type="file" name="idImage" onChange={handleInputChange} />
            <Button className="w-full mt-4" onClick={handleNext}>Tiếp tục</Button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">✍️ Ký xác nhận</h2>
            <div className="flex items-center space-x-2">
              <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} />
              <label>Tôi đồng ý với chính sách khách sạn</label>
            </div>
            <Button className="w-full mt-4" onClick={handleNext} disabled={!formData.agreed}>
              Hoàn tất check-in
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">🎉 Check-in thành công!</h2>
            <p className="mb-2">Cảm ơn bạn đã check-in tại Khách sạn ABC.</p>
            <p className="mb-4">🕒 Nhận phòng từ: 14:00 hôm nay</p>
            <div className="bg-white border p-4 rounded shadow">[MÃ QR CODE Ở ĐÂY]</div>
            <Button className="w-full mt-4">Trở về trang chủ</Button>
          </div>
        )}
      </div>
    </div>
  );
}