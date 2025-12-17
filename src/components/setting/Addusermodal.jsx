import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
import { X } from 'lucide-react'; 
import Select from 'react-select';

export default function AddUserModal({closeModal, onUserCreate, editingUser, Roles,filteredUsers,onUserUpdate}){


const [selectedRole, setSelectedRole] = useState(null);
const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState(editingUser || {
    avatarUrl : null,
    full_name: '',
   avatarPreview:'',
    email: 'super@test.co.uk',
    username: 'admin123',
    role: '',
    status: 'Active',
    department: 'No departments available',
    salary: '',
    isManager: false,
    password:'',
    reportsTo: 'Reports To'
  });
const options = Roles.map(us => ({
  value: us.id,
  label: us.name
}));

const option2=filteredUsers&&filteredUsers.map(us => ({
  value: us.id,
  label: us.full_name
}))


   const isEditMode = !!editingUser;

const handleRoleChange = (field,selectedOption) => {
  setSelectedRole(selectedOption);                 // for UI
  setFormData(prev => ({ ...prev, [field]: selectedOption.value })); // for API
};

const handleUserChange = (field,selectedOption) => {
  setSelectedUser(selectedOption);
  setFormData(prev => ({ ...prev, [field]: selectedOption.value }));
};

  const handleSubmit = (e) => {
    e.preventDefault()
const formPayload = new FormData();
formPayload.append('full_name', formData.full_name);
formPayload.append('email', formData.email);
formPayload.append('password', formData.password);
formPayload.append('role_id', formData.role);

formPayload.append('direct_manager_id', formData.users);
if (formData.avatarUrl) {
  formPayload.append('profile', formData.avatarUrl, formData.avatarUrl.name);
}
formPayload.append('department_id', '1');
formPayload.append('is_active', 'true');
    
   if (isEditMode) {
    onUserUpdate(formPayload);
  } else {
    onUserCreate(formPayload);
    console.log("Is profile a File?", formData.avatarUrl instanceof File);
console.log("Payload keys:", Object.keys(payload));
    console.log("payload",payload)
  
  }
 
   }
 
  


  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(formData)
  };


  return (
    <div className="  backdrop-blur-xl  bg-black/50 w-full flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white relative  rounded-2xl p-8 shadow-2xl">
        <h1 className="text-black text-3xl font-bold mb-8">Add User</h1>
        
        <form className='' >
          {/* Avatar Section */}
          <div className="mb-6 ">
           <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-4">
    {formData.avatarUrl ? (
      <img
        src={formData.avatarUrl}
        alt="Avatar"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-black text-2xl font-bold">UA</span>
    )}
  </div>

            
            <input
    type="file"
    onChange={(e) => handleChange("avatarUrl", e.target.files[0])}
              className="w-full text-black rounded-lg px-4 py-3 border focus:outline-none   transition-colors"
            />
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.full_name}
              onChange={(e) => handleChange('full_name', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border  focus:outline-none    transition-colors"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
                        placeholder="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border  focus:outline-none  transition-colors"
            />
          </div>
               <div className="mb-4">
            <input
              type="password"
                   placeholder="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full text-black rounded-lg px-4 py-3 border  focus:outline-none  transition-colors"
            />
          </div>

          {/* Username Input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder='username'
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
           
       <Select placeholder="Role" 
  value={selectedRole}              className="w-full text-black rounded-lg px-4 py-2 border  focus:outline-none  transition-colors appearance-none cursor-pointer"
 styles={{
    control: (base, state) => ({
      ...base,
      border: "none !important",
      boxShadow: "none !important",
      backgroundColor: "transparent",
    }),}}
onChange={(selected) => handleRoleChange('role', selected)}

        options={options}
      />
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
     

          {/* Reports To Dropdown */}
          <div className="mb-8">
            {/* <select
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
            </select> */}



               <Select placeholder="Report to"
                 menuPosition="fixed" 
  value={selectedUser}
              className="w-full text-black rounded-lg px-4 py-2 border  focus:outline-none  transition-colors appearance-none cursor-pointer"
 styles={{
    control: (base, state) => ({
      ...base,
      border: "none !important",
      boxShadow: "none !important",
      backgroundColor: "transparent",
    }),}}
onChange={(selected) => handleUserChange('users', selected)}

        options={option2}
      />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 transition-colors duration-200 "
            onClick={handleSubmit}
          >
           {isEditMode ? 'Update User' : 'Create User'}          </button>
        </form>
        <button className="absolute z-[999] text-black top-4 right-4"       onClick={closeModal}><X size={20}/></button>
      </div>
    </div>
  );
}