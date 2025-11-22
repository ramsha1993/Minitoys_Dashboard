import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function AddDepartmentModal({closeModal}) {
  const [formData, setFormData] = useState({
    departmentName: '',
    costCenter: '',
    departmentHead: '',
    description: ''
  });

  const [departmentCodes, setDepartmentCodes] = useState([]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCode = () => {
    setDepartmentCodes(prev => [...prev, '']);
  };

  const handleCancel = () => {
    console.log('Cancelled');
  };

  const handleSave = () => {
    console.log('Saved:', { ...formData, departmentCodes });
  };

  return (
    <div className="min-h-screen relative bg-red flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl p-8 shadow-2xl relative">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-black text-3xl font-medium">Add Department</h1>
          {/* <button
            onClick={handleCancel}
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="text-white" size={24} />
          </button> */}
        </div>

        {/* Department Name Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Department Name"
            value={formData.departmentName}
            onChange={(e) => handleChange('departmentName', e.target.value)}
            className="w-full text-black  rounded-xl px-5 py-2 border focus:outline-none transition-all font-medium"
          />
        </div>

        {/* Cost Center Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cost Center"
            value={formData.costCenter}
            onChange={(e) => handleChange('costCenter', e.target.value)}
            className="w-full  text-black rounded-xl px-5 py-2 border focus:outline-none transition-all font-medium"
          />
        </div>

        {/* Department Head Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Department Head"
            value={formData.departmentHead}
            onChange={(e) => handleChange('departmentHead', e.target.value)}
            className="w-full  text-black rounded-xl px-5 py-2 border focus:outline-none transition-all font-medium"
          />
        </div>

        {/* Description Textarea */}
        <div className="mb-8">
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows="4"
            className="w-full  text-slate-300 placeholder-slate-400 rounded-xl px-5 py-2 border focus:outline-none transition-all resize-none"
          />
        </div>

        {/* Department Codes Section */}
        <div className="mb-8">
          <h2 className="text-black text-xl font-medium mb-6">Department Codes</h2>
          
          {/* Department Codes List */}
          {departmentCodes.map((code, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 mb-4 border border-slate-600/30">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Dept Code"
                  value={code.name}
                  onChange={(e) => {
                    const newCodes = [...departmentCodes];
                    newCodes[index] = { ...newCodes[index], name: e.target.value };
                    setDepartmentCodes(newCodes);
                  }}
                  className="w-full  text-black placeholder-slate-500 rounded-xl px-4 py-2 border  focus:outline-none transition-all"
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  value={code.value}
                  onChange={(e) => {
                    const newCodes = [...departmentCodes];
                    newCodes[index] = { ...newCodes[index], value: e.target.value };
                    setDepartmentCodes(newCodes);
                  }}
                  className="w-full  text-black  rounded-xl px-4 py-2 border focus:outline-none transition-all"
                />
              </div>

              <button
                onClick={() => {
                  const newCodes = departmentCodes.filter((_, i) => i !== index);
                  setDepartmentCodes(newCodes);
                }}
                className="bg-zinc-100 font-medium rounded-lg px-6 py-2 transition-colors"
              >
                Remove
              </button>

              {/* Service Codes Section */}
              <div className="mt-6">
                <h3 className="text-black text-lg font-semibold mb-4">Service Codes</h3>
                
                {/* Service Codes List */}
                {code.serviceCodes && code.serviceCodes.map((serviceCode, serviceIndex) => (
                  <div key={serviceIndex} className="flex justify-evenly gap-2 items-center mb-3">
                    <input
                      type="text"
                      placeholder="Service Code"
                      value={serviceCode.name}
                      onChange={(e) => {
                        const newCodes = [...departmentCodes];
                        newCodes[index].serviceCodes[serviceIndex] = {
                          ...newCodes[index].serviceCodes[serviceIndex],
                          name: e.target.value
                        };
                        setDepartmentCodes(newCodes);
                      }}
                      className=" text-slate-400 placeholder-slate-500 rounded-xl px-2 py-2 border  focus:outline-none transition-all"
                    />
                    <input
                      type="text"
                      value={serviceCode.value}
                      onChange={(e) => {
                        const newCodes = [...departmentCodes];
                        newCodes[index].serviceCodes[serviceIndex] = {
                          ...newCodes[index].serviceCodes[serviceIndex],
                          value: e.target.value
                        };
                        setDepartmentCodes(newCodes);
                      }}
                      className="  text-black  rounded-xl px-2 py-2 border  focus:outline-none transition-all"
                    />
                    <button
                      onClick={() => {
                        const newCodes = [...departmentCodes];
                        newCodes[index].serviceCodes = newCodes[index].serviceCodes.filter((_, i) => i !== serviceIndex);
                        setDepartmentCodes(newCodes);
                      }}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    const newCodes = [...departmentCodes];
                    if (!newCodes[index].serviceCodes) {
                      newCodes[index].serviceCodes = [];
                    }
                    newCodes[index].serviceCodes.push({ name: '', value: '0' });
                    setDepartmentCodes(newCodes);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2  transition-colors flex items-center space-x-2 font-medium"
                >
                  <Plus size={20} />
                  <span>Add Service Code</span>
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => setDepartmentCodes([...departmentCodes, { name: '', value: '0', serviceCodes: [] }])}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 border transition-colors flex items-center space-x-2 font-medium"
          >
            <Plus size={20} />
            <span>Add Dept Code</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={closeModal}
            className="hover:bg-zinc-100 text-black font-semibold shadow-sm rounded-xl px-4 py-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl  px-6 py-2 transition-colors shadow-lg shadow-indigo-600/30"
          >
            Save
          </button>
        </div>
        
      </div>

    </div>
  );
}