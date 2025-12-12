import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modules from './modules'
import Roles from './roles'
import Assign from './assign'
const ModulesDashboard = ({getData,fetchdata}) => {
  const [activeTab, setActiveTab] = useState('Modules');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [modules, setModules] = useState([
    {
      id: 1,
      name: 'Dashboard',
      description: 'Main dashboard module',
      created: '12/13/2025'
    },
    {
      id: 2,
      name: 'Users',
      description: 'User management module',
      created: '12/13/2025'
    },
    {
      id: 3,
      name: 'Reports',
      description: 'Analytics and reports',
      created: '12/13/2025'
    }
  ]);
const [Role, setIsRole] = useState(false)
  const tabs = ['Modules', 'Roles', 'Assign'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newModule = {
      id: modules.length + 1,
      name: formData.name,
      description: formData.description,
      created: new Date().toLocaleDateString('en-US')
    };
    setModules([...modules, newModule]);
    setFormData({ name: '', description: '' });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Modules</h1>
          <p className="text-gray-600">Manage your FinOps system settings.</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-300 mb-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Content */}
        {activeTab === 'Modules' && (
       
<Modules getData={getData} fetchdata={fetchdata} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} handleCancel={handleCancel} />
           
        )}

        {/* Roles Content */}
        
        {activeTab === 'Roles' && (
     <div className="bg-white">
            {/* Add Module Button */}
            <div className="flex justify-end mb-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} />
                Add Role
              </button>
       
</div>
          <Roles isModalOpen={isModalOpen} handleCancel={handleCancel} />
  </div>
      )}  

        {/* Assign Content */}
        {activeTab === 'Assign' && (
        <div>
          <Assign />
          </div>



        )}
      </div>
    
      {/* Modal */}
    
    </div>
  );
};

export default ModulesDashboard;