'use client'

import { useState } from 'react'

export default function ChristmasRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nickName: '',
    phone: '',
    age: '',
    familySize: 1,
    dietary: '',
    notes: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        console.log(data)
        window.location.href = `/ticket/${data.id}`
      } else {
        throw new Error('ลงทะเบียนไม่สำเร็จ')
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง')
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-red-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">ลงทะเบียนงานเฉลิมฉลองคริสต์มาส</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ชื่อจริง</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">นามสกุล</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ชื่อเล่น</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.nickName}
                onChange={(e) => setFormData({...formData, nickName: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                className="w-full border rounded-lg p-2"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">อายุ</label>
              <input
                type="number"
                min="0"
                className="w-full border rounded-lg p-2"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ข้อจำกัดด้านอาหาร</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.dietary}
                onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                placeholder="แพ้อาหารหรือข้อจำกัดในการรับประทานอาหาร"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">หมายเหตุเพิ่มเติม</label>
              <textarea
                className="w-full border rounded-lg p-2"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                placeholder="ข้อมูลเพิ่มเติมที่ต้องการแจ้งให้ทราบ"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              ลงทะเบียนเข้าร่วมงานคริสต์มาส
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
