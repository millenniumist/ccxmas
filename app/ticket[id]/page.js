'use client'

export default function TicketPage({ params }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-red-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Christmas Celebration Ticket</h1>
            <div className="border-4 border-red-600 rounded-lg p-6 mb-6">
              <p className="text-2xl font-bold mb-2">Ticket ID: {params.id}</p>
              <div className="text-gray-600 mb-4">
                <p>Please take a screenshot of this ticket</p>
                <p>Show this at the entrance</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-sm text-red-600">
                  This ticket serves as your entry pass to the Christmas celebration.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
