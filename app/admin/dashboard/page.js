'use client'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    const response = await fetch('/api/admin/registrations')
    if (response.ok) {
      const data = await response.json()
      setRegistrations(data)
    }
  }

  const downloadExcel = async () => {
    const response = await fetch('/api/admin/export')
    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'christmas_registrations.xlsx'
      a.click()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Christmas Registrations</h1>
        <button
          onClick={downloadExcel}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Excel
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Family Size</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-b">
                <td className="px-6 py-4">{reg.firstName} {reg.lastName}</td>
                <td className="px-6 py-4">{reg.email}</td>
                <td className="px-6 py-4">{reg.phone}</td>
                <td className="px-6 py-4">{reg.familySize}</td>
                <td className="px-6 py-4">{reg.attendance ? 'Attended' : 'Registered'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
