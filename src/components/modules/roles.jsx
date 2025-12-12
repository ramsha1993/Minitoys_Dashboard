import React, { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react';

const Roles = ({isModalOpen,handleCancel,handleSubmit,handleInputChange,formData}) => {
      const [Roles, setRoles] = useState([
        {
          id: 1,
          name: 'Admin',
          description: 'Full system accesse',
          created: '12/13/2025'
        },
        {
          id: 2,
          name: 'Mananger',
          description: 'Limited admin access',
          created: '12/13/2025'
        },
        {
          id: 3,
          name: 'User',
          description: 'Basic user access',
          created: '12/13/2025'
        }
      ]);
    
  return (
 <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Created</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Roles.map((role, index) => (
                    <tr
                      key={role.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index === Roles.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="py-4 px-6 font-semibold text-black">{role.name}</td>
                      <td className="py-4 px-6 text-gray-600">{role.description}</td>
                      <td className="py-4 px-6 text-gray-600">{role.created}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-3">
                          <button className="text-gray-600 hover:text-black transition-colors">
                            <Pencil size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-red-600 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
               {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center p-4 z-[99999]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-black mb-6">Create Module</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-black mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter Role name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={''}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter Role description"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



            </div>
  )
}

export default Roles