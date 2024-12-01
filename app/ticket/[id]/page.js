

"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TicketPage({ params }) {
  const resolvedParams = use(params);
  const [currentDate, setCurrentDate] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString("th-TH"));
    const searchParams = new URLSearchParams(window.location.search);
    setUserData({
      firstName: searchParams.get("firstName"),
      lastName: searchParams.get("lastName"),
      nickName: searchParams.get("nickName"),
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071E48] to-black py-12 relative overflow-hidden">
      {/* Floating Doves */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-10 text-4xl"
      >
        🕊️
      </motion.div>
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-40 right-10 text-4xl"
      >
        🕊️
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto relative"
        >
          <div className="relative rounded-lg shadow-2xl">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/card.jpg"
                alt="Ticket Background"
                fill
                className="rounded-lg"
                priority
                quality={100}
              />
            </div>

            <div className="relative z-10 p-8 text-center space-y-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white/40 backdrop-blur-sm rounded-2xl p-4"
              >
                <div className=" bg-clip-text">
                  <h1 className="text-4xl font-bold mb-2">บัตรเข้าร่วมงาน</h1>
                  <h2 className="text-3xl font-semibold text-red-900">กรุณาแคปหน้าจอ  📸 📱</h2>
                </div>
              </motion.div>
              <motion.div
                className="border-4 border-gold rounded-xl p-6 bg-gradient-to-br from-red-50/90 to-green-50/90"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-emerald-800 mb-4">
                  หมายเลขบัตร: {resolvedParams.id}
                </div>

                {userData && (
                  <div className="space-y-3 mb-6">
                    <motion.div
                      className="text-xl font-semibold text-emerald-700"
                      whileHover={{ scale: 1.02 }}
                    >
                      {userData.firstName} {userData.lastName}
                    </motion.div>
                    <motion.div className="text-lg text-emerald-600" whileHover={{ scale: 1.02 }}>
                      ชื่อเล่น: {userData.nickName}
                    </motion.div>
                  </div>
                )}

                <div className="space-y-4 my-6 text-xl">
                  <motion.div
                    className="flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-red-600">📅</span>
                    <p className="font-semibold">24 ธันวาคม 2567</p>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-red-600">⏰</span>
                    <p className="font-semibold">17:00 น.</p>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-red-600">📍</span>
                    <p className="font-semibold">คริสตจักรชลบุรี</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-red-100 via-white to-green-100 p-6 rounded-xl shadow-inner"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-lg text-red-700 font-medium">
                  กรุณาถ่ายภาพนี้ 📸  หรือแคปหน้านี้ 📱 
                </p>
                <p>เพื่อแสดงที่โต๊ะลงทะเบียนก่อนเข้างาน</p>
              </motion.div>

              <div className="mt-6 bg-white/30 backdrop-blur-sm rounded-xl p-2 inline-block">
                <p className="text-gray-800">ออกบัตรเมื่อ: {currentDate}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
