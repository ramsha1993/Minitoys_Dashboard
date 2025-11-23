import { useState } from 'react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: '',
    linkToProject: '',
    department: '',
    owner: '',
    status: 'Planned',
    goLiveDate: '',
    tags: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (formData.serviceName.trim()) {
      const newService = {
        id: Date.now(),
        ...formData
      };
      setServices(prev => [...prev, newService]);
      setShowModal(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      serviceName: '',
      linkToProject: '',
      department: '',
      owner: '',
      status: 'Planned',
      goLiveDate: '',
      tags: '',
      description: ''
    });
  };

  const handleCancel = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-white  rounded text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
   
            <div>
              <h1 className="text-3xl font-bold text-black">Services</h1>
            </div>
          </div>
          <p className="text-slate-400 text-lg ">
            Track services as they move from project to live production, with rich tagging for reporting.
          </p>
        </div>

        {/* Search and Add Button */}
        <div className="flex gap-4 mb-12">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, project, department or tag..."
            className="flex-1 text-black border placeholder-slate-500 px-4 py-2 rounded-lg focus:outline-none  text-md"
          />
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-700 hover:bg-blue-500  text-white px-4 py-2 rounded-lg  text-md transition-colors flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add Service
          </button>
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-xl">
              No services yet. Add one to start tracking projects going live.
            </p>
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      {showModal && (
        <div className="fixed inset-0  backdrop-blur-xs z-[99999] flex items-center justify-center p-4 z-50">
          <div className=" border text-black bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-hidden">
            <div className="overflow-y-auto max-h-[90vh] p-8">
              <h2 className="text-3xl font-bold mb-8">Add Service</h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Service Name */}
                <div>
                  <label className="block text-sm mb-2">
                    Service Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleChange}
                    placeholder="e.g. Customer Portal"
                    className="w-full  border border-slate-600 placeholder-slate-500 px-4 py-3 rounded-lg focus:outline-none "
                  />
                </div>

                {/* Link to Project */}
                <div>
                  <label className="block text-sm mb-2">Link to Project (optional)</label>
                  <select
                    name="linkToProject"
                    value={formData.linkToProject}
                    onChange={handleChange}
                    className="w-full  border border-slate-600  px-4 py-3 rounded-lg focus:outline-none "
                  >
                    <option value="">Select department (optional filter)</option>
                    <option>Project Alpha</option>
                    <option>Project Beta</option>
                    <option>Project Gamma</option>
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full  border border-slate-600 px-4 py-3 rounded-lg focus:outline-none "
                  >
                    <option value="">No departments yet – add in Settings</option>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                  </select>
                </div>

                {/* Owner */}
                <div>
                  <label className="block text-sm mb-2">
                    Owner <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    className="w-full  border border-slate-600 px-4 py-3 rounded-lg focus:outline-none"
                  >
                    <option value="">Select department first</option>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                    <option>Mike Johnson</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-slate-600 -white px-4 py-3 rounded-lg focus:outline-none "
                  >
                    <option>Planned</option>
                    <option>In Development</option>
                    <option>Testing</option>
                    <option>Live</option>
                    <option>Retired</option>
                  </select>
                </div>

                {/* Go-Live Date */}
                <div>
                  <label className="block text-sm mb-2">Go-Live Date</label>
                  <input
                    type="text"
                    name="goLiveDate"
                    value={formData.goLiveDate}
                    onChange={handleChange}
                    placeholder="DD/MM/YYYY"
                    className="w-full  border border-slate-600  placeholder-slate-500 px-4 py-3 rounded-lg focus:outline-none "
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6">
                <label className="block text-sm mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g. billing, customer-facing, core"
                  className="w-full  border border-slate-600  placeholder-slate-500 px-4 py-3 rounded-lg focus:outline-none "
                />
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short description of the service"
                  rows="4"
                  className="w-full  border border-slate-600  placeholder-slate-500 px-4 py-3 rounded-lg focus:outline-none resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-end mt-8">
                <button
                  onClick={handleCancel}
                  className="px-6  py-2 text-black  bg-zinc-300 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}