"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/admin/registrations");
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (registration) => {
    setEditingId(registration.id);
    setEditForm(registration);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/admin/registrations/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        await fetchRegistrations();
        setEditingId(null);
      }
    } catch (error) {
      console.error("Failed to update registration:", error);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this registration?")) {
      try {
        const response = await fetch(`/api/admin/registrations/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await fetchRegistrations();
          setEditingId(null);
        }
      } catch (error) {
        console.error("Failed to delete registration:", error);
      }
    }
  };

  const downloadExcel = async () => {
    try {
      const response = await fetch("/api/admin/export");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "christmas_registrations.xlsx";
        a.click();
      }
    } catch (error) {
      console.error("Failed to download Excel:", error);
    }
  };

  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone?.includes(searchTerm) ||
      reg.nickName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRegistrations = registrations.length;
  const totalAttendees = registrations.filter((reg) => reg.attendance).length;
  const totalFamilySize = registrations.reduce((sum, reg) => sum + (reg.familySize || 0), 0);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Christmas Registration Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Registrations</h3>
            <p className="text-2xl">{totalRegistrations}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Attendees</h3>
            <p className="text-2xl">{totalAttendees}</p>
          </div>
          {/* <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Family Size</h3>
            <p className="text-2xl">{totalFamilySize}</p>
          </div> */}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name, nickname, or phone..."
            className="w-full px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={downloadExcel}
          className="ml-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <span>Download Excel</span>
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nickname
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family Size</th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRegistrations.map((reg) => (
              <tr key={reg.id}>
                {editingId === reg.id ? (
                  <>
                    <td className="px-6 py-4">{reg.tId}</td>
                    <td className="px-6 py-4">
                      <input
                        className="border rounded px-2 py-1 w-full"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                      />
                      <input
                        className="border rounded px-2 py-1 w-full mt-1"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        className="border rounded px-2 py-1 w-full"
                        value={editForm.nickName}
                        onChange={(e) => setEditForm({ ...editForm, nickName: e.target.value })}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        className="border rounded px-2 py-1 w-full"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-20"
                        value={editForm.age}
                        onChange={(e) =>
                          setEditForm({ ...editForm, age: parseInt(e.target.value) })
                        }
                      />
                    </td>
                    {/* <td className="px-6 py-4">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 w-20"
                        value={editForm.familySize}
                        onChange={(e) => setEditForm({...editForm, familySize: parseInt(e.target.value)})}
                      />
                    </td> */}
                    <td className="px-6 py-4">
                      <select
                        className="border rounded px-2 py-1"
                        value={editForm.attendance}
                        onChange={(e) =>
                          setEditForm({ ...editForm, attendance: e.target.value === "true" })
                        }
                      >
                        <option value="false">Registered</option>
                        <option value="true">Attended</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDelete(reg.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{reg.tId}</td>
                    <td className="px-6 py-4">
                      {reg.firstName} {reg.lastName}
                    </td>
                    <td className="px-6 py-4">{reg.nickName}</td>
                    <td className="px-6 py-4">{reg.phone}</td>
                    <td className="px-6 py-4">{reg.age}</td>
                    {/* <td className="px-6 py-4">{reg.familySize}</td> */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          reg.attendance
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {reg.attendance ? "Attended" : "Registered"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(reg)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
