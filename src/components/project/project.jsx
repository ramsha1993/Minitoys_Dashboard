import React, { useState } from 'react';
import Select from 'react-select';
import ProjectModal from './modal'

const ProjectExpenseManager = ({data,serviceCode,Vendor, fetchCapex,showproject}) => {



  const [formData, setFormData] = useState(null)
const [selectedOption, setSelectedOption] = useState(null)
const [isModalOpen, setisModalOpen] = useState(false)
const options = data?.map(us => ({
  value: us.id,
  label: us.name
}));







const openModal=()=>{
return setisModalOpen(true)
}


  const closeModal = () => {
    setisModalOpen(false);
 
  }
 const handleChangeselect = async (field,selectedOption) => {

  setSelectedOption(selectedOption)
  console.log("selected" ,selectedOption.value)
  await fetchCapex(selectedOption.value)
console.log("show project"+ showproject)

  console.log("Selectedoption" + JSON.stringify(selectedOption.value))
setFormData(prev => ({ ...prev, [field]: selectedOption.value }));
}



  const [department, setDepartment] = useState('');
  const [project, setProject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className=" text-black bg-white p-6 rounded-lg max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 flex items-center">
        <i className="fas fa-briefcase mr-2"></i> Projects
      </h1>
      <p className="mb-6 text-sm">Add, track, manage and edit expenses across projects.</p>

      {/* Department Select */}
      <div className='flex w-full gap-4 justify-between'>
      <div className="mb-6 w-1/2">
        <label htmlFor="department" className="block text-sm font-medium mb-2">
          Department
        </label>
                <Select placeholder="Department " 
        value={selectedOption}
              className="w-full text-black rounded-xl  py-2  mb-4"

onChange={(selected) => handleChangeselect('departmentHead', selected)}

        options={options}
      />

      </div>

      {/* Project Select */}
      <div className="mb-6 w-1/2">
        <label htmlFor="project" className="block text-sm font-medium mb-4">
          Project
        </label>
     <select
  id="project"
  value={project}
  onChange={(e) => setProject(e.target.value)}
  className="w-full p-2 mb-4 border border-gray-600 rounded-md"
>
<option value="">Select</option>
    {Array.isArray(showproject) &&
      showproject.map((item, index) => (
        <option key={index} value={item.id}>
          {item.project_name}
        </option>
      ))}

</select>

      </div>
</div>
      {/* Search Input */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium mb-2">
          Search by vendor or description...
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by vendor or description..."
          className="w-full p-2  border border-gray-600 rounded-md text-black"
        />
      </div>

      {/* No Projects Message */}
      <div className="mb-6">
        <p className="text-sm">No saved projects yet.</p>
      </div>

      {/* Add Expense Button */}
      <button className=" py-3 px-6 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200" onClick={()=>openModal()}>
        + Add Expense
      </button>



      {isModalOpen && 
      
          <div className="fixed inset-0 overflow-auto z-[99999] flex justify-center backdrop-blur-xs">
      <ProjectModal  serviceCode={serviceCode} Vendor={Vendor} setisModalOpen={setisModalOpen} closeModal={closeModal} />
      
      
      </div>  }
    </div>
  );
};

export default ProjectExpenseManager;
