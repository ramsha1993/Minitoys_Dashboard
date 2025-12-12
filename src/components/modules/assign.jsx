import React, { useState } from 'react';
import { Shield, Save, ChevronDown } from 'lucide-react';

const AssignModules = () => {
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const roles = ['Admin', 'Manager', 'User', 'Viewer'];
  
  const [modules, setModules] = useState([
    {
      id: 1,
      name: 'Dashboard',
      description: 'Main dashboard module',
      selected: false,
      permissions: {
        create: false,
        read: false,
        update: false,
        delete: false
      }
    },
    {
      id: 2,
      name: 'Users',
      description: 'User management module',
      selected: false,
      permissions: {
        create: false,
        read: false,
        update: false,
        delete: false
      }
    },
    {
      id: 3,
      name: 'Reports',
      description: 'Analytics and reports',
      selected: false,
      permissions: {
        create: false,
        read: false,
        update: false,
        delete: false
      }
    }
  ]);

  const handleModuleSelect = (moduleId) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, selected: !module.selected }
        : module
    ));
  };

  const handlePermissionChange = (moduleId, permissionType) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            permissions: {
              ...module.permissions,
              [permissionType]: !module.permissions[permissionType]
            }
          }
        : module
    ));
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  return (
    <div className=" text-center py-16 text-gray-500">
                    <p className="text-lg">Assignment features coming soon...</p>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assign Modules</h1>
              <p className="text-gray-600 text-sm mt-1">Configure role permissions</p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md">
            <Save size={20} />
            Save Permissions
          </button>
        </div>

        {/* Select Role Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Role
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full max-w-md bg-white border-2 border-blue-500 rounded-lg px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900 font-medium">{selectedRole}</span>
              <ChevronDown size={20} className="text-gray-600" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Permissions Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Permissions for <span className="text-blue-600">{selectedRole}</span>
          </h2>

          <div className="space-y-6">
            {modules.map((module) => (
              <div key={module.id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={module.selected}
                      onChange={() => handleModuleSelect(module.id)}
                      className="w-5 h-5 bg-white border-2 border-blue-500 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                    />
                  </label>
                  <div>
                    <h3 className="font-semibold text-gray-900">{module.name}</h3>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {['create', 'read', 'update', 'delete'].map((permission) => (
                    <label key={permission} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={module.permissions[permission]}
                        onChange={() => handlePermissionChange(module.id, permission)}
                        className="w-5 h-5 bg-white border-2 border-blue-500 rounded cursor-pointer checked:bg-blue-600 checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                      />
                      <span className="text-sm text-gray-600 capitalize">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignModules;