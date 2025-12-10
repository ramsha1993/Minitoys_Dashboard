import React, { useEffect, useState } from 'react';
import api from '../../api/axiosinterceptor';
import ENDPOINTS from '../../utils/ENDPOINTS';
import {Update} from '../function'
import { useDispatch } from "react-redux";
import { addCapex } from "../../redux/capex";
import Select from 'react-select';


export default function AddCapExForm({closeModal,edit,editData,userslist,categories,fetchDept,fetchCapex,onsubmit}) {
  const dispatch = useDispatch();
  const [selectedOption, setselectedOption] = useState()
  const [categoryOption, setCategoryOption] = useState(null);
  const [useroption, setuseroption] = useState()
  const [formData, setFormData] = useState({

    project: '',
    category: '',
    owner: '',
    allocated: '',
    forecast: '',
    spent:'5000',
    departmentId:'',
    status: '',
    startDate: '',
    endDate: ''
  });
  

  // Load edit data
  useEffect(() => {
    if (edit && editData) {
              const headOption1 = option_three.find(opt => opt.value === editData.owner_user_id);
    setuseroption(headOption1);
              const headOption2 = options_two.find(opt => opt.value === editData.capex_category_id);
    setCategoryOption(headOption2);
                  const headOption3 = options.find(opt => opt.value === editData.department_id);
    setselectedOption(headOption3);
      setFormData({
  

    project:editData.project_name,
    category:editData.capex_category_id,
    owner:editData.owner_user_id,
    allocated:editData.allocated,
    forecast:editData.forecast,
    spent:editData.spent,
    departmentId:editData.department_id,
    status:editData.status,
    startDate: editData.start_date,
    endDate:editData.end_date
      });
    }
  }, [editData]);


const options = fetchDept.departments.map(us => ({
  value: us.id,
  label: us.name
}));

const options_two=categories.map(us => ({
  value: us.id,
  label: us.name
}));
const option_three = (userslist?.users || []).map(user => ({
  value: user.id,
  label: user.full_name
}));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleChangeselect = (field,selectedOption) => {

setFormData(prev => ({ ...prev, [field]: selectedOption.value }));
console.log("selected" ,selectedOption)}

 




const handleSubmit = async () => {
    console.log('Form submitted:', formData);
  
  const payload={
    department_id: formData.departmentId,
    project_name: formData.project,
    capex_category_id: formData.category,
    owner_user_id: formData.owner,
    allocated: formData.allocated,
    forecast: formData.forecast,
    spent: formData.spent,
    status: formData.status,
    start_date: formData.startDate,
    end_date: formData.endDate
  }
    
  try{
    const response = await api.post({
      url: ENDPOINTS.OTHER.CAPEX,
      data: payload,
    });

   
    console.log("Capex created:", response);
  dispatch(addCapex(response)); // add row to redux
fetchCapex()
    // ⬅ send data to parent
    closeModal();  
     setFormData({
  department: '',
  project: '',
  category: '',
  owner: '',
  allocated: '',
  spent:'',
  capexcode:'',
  forecast: '',
  
  status: 'Pending',
  startDate: '',
  endDate: ''
});
      } 
  catch (error) {
    console.log("my status" +formData.status)
    console.error("Error creating Capex:", error);
  }  


    // Handle form submission
  };




    const handleUpdate = async () => {
      // if (!validateForm()) return;
  
      try {
          const payload={
    department_id: formData.departmentId,
    project_name: formData.project,
    capex_category_id: formData.category,
    owner_user_id: formData.owner,
    allocated: formData.allocated,
    forecast: formData.forecast,
    spent: formData.spent,
    status: formData.status,
    start_date: formData.startDate,
    end_date: formData.endDate
  }
    
        await Update(ENDPOINTS.OTHER.CAPEX, editData.id, payload);
    fetchCapex()
       setFormData({
  department: '',
  project: '',
  category: '',
  owner: '',
  allocated: '',
  spent:'',
  capexcode:'',
  forecast: '',
  
  status: 'Pending',
  startDate: '',
  endDate: ''
});
     
        closeModal();
      } catch (error) {
        console.error("Error updating Capex categories:", error);
      }
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
   if (!edit) handleSubmit();
            else handleUpdate();
  }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department */}

          <div>

            <label className="block  text-sm ">
              Department
            </label>
           {/* <select
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
            </select> */}
              {/* <input
              type="text"
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              placeholder="department_id"
              className="w-full border  placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            /> */}
            <Select placeholder="Department Id" 
        value={selectedOption}
        styles={{
    control: (base) => ({
      ...base,
    padding:'6px',
      borderRadius: "0.75rem", // rounded-xl
    }),
  }}
              className="w-full text-black rounded-xl  py-2  mb-4"

onChange={(selected) => { setselectedOption(selected)
  handleChangeselect('departmentId', selected)}}

        options={options} />
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
            {/* <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border  placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            /> */}
         <Select
  placeholder="Category"
  value={categoryOption}
         styles={{
    control: (base) => ({
      ...base,
    padding:'6px',
      borderRadius: "0.75rem", // rounded-xl
    }),
  }}
  onChange={(selected) => {
    setCategoryOption(selected);
    handleChangeselect("category", selected);
  }}
  options={options_two}
/>
          </div>

          {/* Owner (Admin) */}
          <div>
            <label className="block text-sm mb-2">
              Owner (Admin)
            </label>
            {/* <select
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Owner (Admin)</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
            </select> */}
                 <Select
  placeholder="owner"
  value={useroption}
         styles={{
    control: (base) => ({
      ...base,
    padding:'6px',
      borderRadius: "0.75rem", // rounded-xl
    }),
  }}
  onChange={(selected) => {
    setuseroption(selected);
    handleChangeselect("owner", selected);
  }}
  options={option_three}
/>
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
              className="w-full border   placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full border   placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
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
              className="w-full   rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full border  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            onClick={edit ? handleUpdate : handleSubmit}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hoveSr:bg-blue-600 transition-colors"
          >
            {edit ? 'Update' : 'Create'}
          </button>
        </div>
</form>
      </div>
      
    </div>
  );
}