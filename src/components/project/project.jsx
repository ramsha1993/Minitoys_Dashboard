import React, { useState } from 'react';

const ProjectExpenseManager = () => {
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
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-2 border rounded-md "
        >
          <option value="">Select department</option>
          {/* Add department options here */}
        </select>
      </div>

      {/* Project Select */}
      <div className="mb-6 w-1/2">
        <label htmlFor="project" className="block text-sm font-medium mb-2">
          Project
        </label>
        <select
          id="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full p-2 border border-gray-600 rounded-md "
        >
          <option value="">Select project</option>
          {/* Add project options here */}
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
      <button className=" py-3 px-6 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
        + Add Expense
      </button>
    </div>
  );
};

export default ProjectExpenseManager;
