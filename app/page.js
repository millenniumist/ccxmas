"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

export default function ChristmasRegistration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    phone: "",
    age: "",
    dietary: "",
    notes: "",
    familySize: "1", 
    address: "",
  });
  const [tapCount, setTapCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleCornerTap = () => {
    setTapCount((prev) => {
      if (prev + 1 >= 7) {
        window.location.href = "/admin/login";
        return 0;
      }
      return prev + 1;
    });

    setTimeout(() => setTapCount(0), 3000);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const colors = ["#ff0000", "#00ff00", "#ffffff"];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      disableForReducedMotion: true,
    });
  };

  // In handleSubmit function, update the formData structure:
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const submissionData = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    nickName: formData.nickName.trim(),
    phone: formData.phone.trim(),
    age: formData.age,
    dietary: formData.dietary?.trim() || null,
    notes: formData.notes?.trim() || null,
    familySize: formData.familySize || "1",
    address: formData.address?.trim() || null
  };

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    });

    const data = await response.json();

    if (response.ok) {
      triggerConfetti();
      const queryParams = new URLSearchParams({
        firstName: submissionData.firstName,
        lastName: submissionData.lastName,
        nickName: submissionData.nickName
      }).toString();
      
      setTimeout(() => {
        window.location.href = `/ticket/${data.id}?${queryParams}`;
      }, 1000);
    } else {
      throw new Error(data.error || "ลงทะเบียนไม่สำเร็จ");
    }
  } catch (error) {
    alert("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
    console.error("Error:", error);
  }
};


  const RequiredStar = () => <span className="text-red-500 animate-pulse ml-1">*</span>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-red-900 py-12 relative overflow-hidden">
  {/* Left Christmas Tree */}
<motion.div
  initial={{ scale: 0, opacity: 0, rotate: -15 }}
  animate={{ scale: 1, opacity: 1, rotate: -15 }}
  transition={{ 
    duration: 0.7,
    ease: "easeOut"
  }}
  className="absolute left-0 top-1/4 w-64 h-64"
>
  <Image
    src="/christmasTree.svg"
    alt="Christmas Tree Left"
    width={256}
    height={256}
    priority
  />
</motion.div>

{/* Right Christmas Tree */}
<motion.div
  initial={{ scale: 0, opacity: 0, rotate: 15 }}
  animate={{ scale: 1, opacity: 1, rotate: 15 }}
  transition={{ 
    duration: 0.7,
    ease: "easeOut"
  }}
  className="absolute right-0 top-1/4 w-64 h-64"
>
  <Image
    src="/christmasTree.svg"
    alt="Christmas Tree Right"
    width={256}
    height={256}
    priority
  />
</motion.div>


      {/* Christmas Lights */}
      <div className="absolute top-0 left-0 right-0 flex justify-around">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full animate-pulse`}
            style={{
              backgroundColor: i % 2 === 0 ? "#ff0000" : "#00ff00",
              animation: `pulse ${1 + (i % 3)}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 right-0 w-16 h-16 cursor-default" onClick={handleCornerTap} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-lg rounded-lg shadow-2xl p-8 relative">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
            ลงทะเบียนงานเฉลิมฉลองคริสต์มาส 
          </h2>
          <p className="text-center italic p-2">วันที่ 24 ธันวาคม 2024 ณ คริสตจักรชลบุรี</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">
                ชื่อจริง <RequiredStar />
              </label>
              <input
                type="text"
                className="w-full border-2 border-red-100 rounded-lg p-2 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">
                นามสกุล <RequiredStar />
              </label>
              <input
                type="text"
                className="w-full border-2 border-red-100 rounded-lg p-2 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">
                ชื่อเล่น <RequiredStar />
              </label>
              <input
                type="text"
                className="w-full border-2 border-red-100 rounded-lg p-2 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                value={formData.nickName}
                onChange={(e) => setFormData({ ...formData, nickName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">
                เบอร์โทรศัพท์ <RequiredStar />
              </label>
              <input
                type="tel"
                className="w-full border-2 border-red-100 rounded-lg p-2 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">
                อายุ <RequiredStar />
              </label>
              <input
                type="number"
                min="0"
                className="w-full border-2 border-red-100 rounded-lg p-2 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">
                ข้อจำกัดด้านอาหาร
              </label>
              <input
                type="text"
                className="w-full border-2 border-red-100 rounded-lg p-2 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                value={formData.dietary}
                onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                placeholder="แพ้อาหารหรือข้อจำกัดในการรับประทานอาหาร"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">
                หมายเหตุเพิ่มเติม
              </label>
              <textarea
                className="w-full border-2 border-red-100 rounded-lg p-2 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="ข้อมูลเพิ่มเติมที่ต้องการแจ้งให้ทราบ"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white font-bold py-4 rounded-lg shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="animate-bounce">🎅</span>
                ลงทะเบียนเข้าร่วมงานคริสต์มาส
                <span className="animate-bounce">🎄</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </form>

          {/* Decorative Elements */}
          <div className="absolute -bottom-4 left-0 right-0 flex justify-around">
            {["🎁", "⛄", "🔔", "🎅", "🦌"].map((emoji, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="text-2xl"
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}


