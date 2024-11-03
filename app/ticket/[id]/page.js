'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function TicketPage({ params }) {
  const resolvedParams = use(params)
  const [currentDate, setCurrentDate] = useState('')
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('th-TH'))
    // Get URL search params
    const searchParams = new URLSearchParams(window.location.search)
    setUserData({
      firstName: searchParams.get('firstName'),
      lastName: searchParams.get('lastName'),
      nickName: searchParams.get('nickName')
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-red-900 py-12 relative overflow-hidden">
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
          className="max-w-md mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-lg rounded-lg shadow-2xl p-8 border-4 border-gold relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl"
              >
                ✝️
              </motion.div>
            </div>

            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-red-600 via-gold to-green-600 text-transparent bg-clip-text"
              >
                <h1 className="text-4xl font-bold mb-2">บัตรเข้าร่วมงาน</h1>
                <h2 className="text-3xl font-semibold">เฉลิมฉลองคริสต์มาส</h2>
              </motion.div>

              <motion.div 
                className="border-4 border-gold rounded-xl p-6 bg-gradient-to-br from-red-50 to-green-50"
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
                    <motion.div 
                      className="text-lg text-emerald-600"
                      whileHover={{ scale: 1.02 }}
                    >
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
                  กรุณาแสดงภาพถ่ายหน้าจอนี้ที่ทางเข้างาน
                </p>
              </motion.div>

              <div className="mt-6 text-gray-600">
                <p>ออกบัตรเมื่อ: {currentDate}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
