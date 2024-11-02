'use client'

import { use, useEffect, useState } from 'react'

export default function TicketPage({ params }) {
  const resolvedParams = use(params)
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('th-TH'))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-red-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <div className="bg-red-100 rounded-lg p-4 mb-6 animate-pulse">
              <p className="text-lg font-semibold text-red-600">📸 กรุณาแคปภาพหน้าจอ 📸</p>
            </div>
            
            <h1 className="text-3xl font-bold text-red-600 mb-4">บัตรเข้าร่วมงานเฉลิมฉลองคริสต์มาส</h1>
            <div className="border-4 border-red-600 rounded-lg p-6 mb-6">
              <p className="text-2xl font-bold mb-2">หมายเลขบัตร: {resolvedParams.id}</p>
              
              <div className="space-y-4 my-6">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-red-600">📅</span>
                  <p className="text-lg font-semibold">24 ธันวาคม 2567</p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-red-600">⏰</span>
                  <p className="text-lg font-semibold">17:00 น.</p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-red-600">📍</span>
                  <p className="text-lg font-semibold">คริสตจักรชลบุรี</p>
                </div>
              </div>

              <div className="bg-red-100 p-4 rounded-lg mt-4">
                <p className="text-sm text-red-600">
                  บัตรนี้ใช้สำหรับการเข้าร่วมงานเฉลิมฉลองคริสต์มาส
                  กรุณาแสดงภาพถ่ายหน้าจอนี้ที่ทางเข้างาน
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                ออกบัตรเมื่อ: {currentDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
