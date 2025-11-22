import React, { useState } from 'react';

export default function AddCapExForm({closeModal,onsubmit}) {
  const [formData, setFormData] = useState({
    department: '',
    project: '',
    category: '',
    owner: '',
    allocated: '',
    forecast: '',
    status: 'Pending',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onsubmit(formData)
    setFormData({
  department: '',
  project: '',
  category: '',
  owner: '',
  allocated: '',
  forecast: '',
  status: 'Pending',
  startDate: '',
  endDate: ''
});

    // Handle form submission
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    // Handle cancel action
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-lg shadow-lg bg-white p-8">
        <h1 className="text-2xl font-medium  mb-8">Add New CapEx</h1>
          <form
  onSubmit={(e) => {
    e.preventDefault(); // stops submit if inputs invalid
    handleSubmit();
  }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department */}

          <div>

            <label className="block  text-sm mb-2">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Operations">Operations</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
            </select>
          </div>

          {/* Project */}
          <div>
            <label className="block  text-sm mb-2">
              Project
            </label>
            <input
              type="text"
              name="project"
              required
              value={formData.project}
              onChange={handleChange}
              placeholder="Project"
              className="w-full border  placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block  text-sm mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border  placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Owner (Admin) */}
          <div>
            <label className="block text-sm mb-2">
              Owner (Admin)
            </label>
            <select
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Owner (Admin)</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
            </select>
          </div>

          {/* Allocated (£) */}
          <div>
            <label className="block  text-sm mb-2">
              Allocated (£)
            </label>
            <input
              type="text"
              name="allocated"
              value={formData.allocated}
              onChange={handleChange}
              placeholder="Allocated (£)"
              className="w-full border  text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            /> 
          </div>

          {/* Forecast (£) */}
          <div>
            <label className="block  text-sm mb-2">
              Forecast (£)
            </label>
            <input
              type="text"
              name="forecast"
              value={formData.forecast}
              onChange={handleChange}
              placeholder="Forecast (£)"
              className="w-full border  text-gray-300 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block  text-sm mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full  border rounded-lg px-4 py-3 focus:outline-none  focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block  text-sm mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full  text-gray-400 rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* End Date */}
          <div className="md:col-span-2">
            <label className="block  text-sm mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border text-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={closeModal}
            className="px-6 py-2.5   rounded-lg bg-white hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create
          </button>
        </div>
</form>
      </div>
      
    </div>
  );
}