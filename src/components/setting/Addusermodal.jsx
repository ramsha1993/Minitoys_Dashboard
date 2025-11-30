import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
import { X } from 'lucide-react'; 
export default function AddUserModal({closeModal, onUserCreate, editingUser, onUserUpdate}){
  const [formData, setFormData] = useState(editingUser || {
    avatarUrl: '',
    name: '',
    email: 'super@test.co.uk',
    username: 'admin123',
    role: 'Viewer',
    status: 'Active',
    department: 'No departments available',
    salary: '',
    isManager: false,
    reportsTo: 'Reports To'
  });
   const isEditMode = !!editingUser;

 
  const handleSubmit = () => {
    e.preventDefault();
    if (isEditMode) {
      // Update existing user
      onUserUpdate(formData);
    } else {
      // Create new user
      const initials = formData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase() || 'UA';
      
      const newUser = {
        id: Date.now(),
        name: formData.name || 'Unnamed User',
        email: formData.email,
        username: formData.username,
        role: formData.role,
        status: formData.status,
        department: formData.department,
        initials: initials,
        reportsTo: formData.reportsTo
      };
      
      onUserCreate(newUser);
    }
    closeModal();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(formData)
  };

  return (
    <div className="  backdrop-blur-xl bg-black/50
 w-full flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white relative  rounded-2xl p-8 shadow-2xl">
        <h1 className="text-black text-3xl font-bold mb-8">Add User</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Avatar Section */}
          <div className="mb-6 ">
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-black text-2xl font-bold">UA</span>
            </div>
            
            <input
              type="text"
              placeholder="Paste avatar URL"
              value={formData.avatarUrl}
              onChange={(e) => handleChange('avatarUrl', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border focus:outline-none   transition-colors"
            />
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border  focus:outline-none    transition-colors"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border  focus:outline-none  transition-colors"
            />
          </div>

          {/* Username Input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="w-full text-black rounded-lg px-4 py-3 border  focus:outline-none  transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="text-2xl"></span>
              </div>
            </div>
          </div>

          {/* Role and Status Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border focus:outline-none transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option>Viewer</option>
              <option>Editor</option>
              <option>Admin</option>
            </select>

            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border  focus:outline-none  transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="mb-4">
            <select
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border  focus:outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option>No departments available</option>
            </select>
          </div>

          {/* Salary Input with up/down controls */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Annual salary (optional)"
                value={formData.salary}
                onChange={(e) => handleChange('salary', e.target.value)}
                className="w-full  text-black placeholder-slate-400 rounded-lg px-4 py-3 pr-12 border  focus:outline-none transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                <button
                  type="button"
                  className="text-slate-400 hover:text-black transition-colors"
                  onClick={() => {
                    const num = parseInt(formData.salary) || 0;
                    handleChange('salary', (num + 1000).toString());
                  }}
                >
                  {/* <ChevronUp size={16} /> */}
                </button>
                <button
                  type="button"
                  className="text-slate-400 hover:text-black transition-colors"
                  onClick={() => {
                    const num = parseInt(formData.salary) || 0;
                    handleChange('salary', Math.max(0, num - 1000).toString());
                  }}
                >
                  {/* <ChevronDown size={16} /> */}
                </button>
              </div>
            </div>
          </div>

          {/* Is Manager Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isManager}
                onChange={(e) => handleChange('isManager', e.target.checked)}
                className="w-5 h-5 border-2  rounded checked:bg-cyan-500 checked:border-cyan-500 focus:outline-none  cursor-pointer transition-colors"
              />
              <span className="text-black text-base">Is Manager</span>
            </label>
          </div>

          {/* Reports To Dropdown */}
          <div className="mb-8">
            <select
              value={formData.reportsTo}
              onChange={(e) => handleChange('reportsTo', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border focus:outline-none  transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option>Reports To</option>
              <option>Manager 1</option>
              <option>Manager 2</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 transition-colors duration-200 "
          >
           {isEditMode ? 'Update User' : 'Create User'}          </button>
        </form>
        <button className="absolute z-[999] text-black top-4 right-4"       onClick={closeModal}><X size={20}/></button>
      </div>
    </div>
  );
}