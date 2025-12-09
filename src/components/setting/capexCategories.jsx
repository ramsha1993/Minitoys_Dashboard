import React, { useEffect, useState } from 'react';
import api from '../../api/axiosinterceptor';
import ENDPOINTS from '../../utils/ENDPOINTS';
import { useDispatch } from "react-redux";
import { addCapex } from "../../redux/capex";
export default function AddCapExForm({edit,closeModal,fetchCapex,onsubmit,editData}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
 name:'',
 description:''
  });
  


  useEffect(()=>{


    if(edit){
        setFormData({
            name:editData.name,
            description:editData.description
        })
    }

  },[editData])

  const handleSubmit= async()=>{


    try{

   
const response= await api.post({
    url: `${ENDPOINTS.OTHER.CAPEX_CATEGORIES}`,
    data:formData
    })
    console.log("Capex created:", response);
    setFormData({ name:'',
 description:''})
    closeModal()
     

}


     catch (error) {
    console.error("Error creating Capex categories:", error);
  }

  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleCancel = () => {
    console.log('Form cancelled');
    // Handle cancel action
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-lg shadow-lg bg-white p-8">
        <h1 className="text-2xl font-medium  mb-8">Add  Capex Categories</h1>
          <form
  onSubmit={(e) => {
    e.preventDefault(); // stops submit if inputs invalid
    handleSubmit();
  }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department */}

          <div>

            <label className="block  text-sm mb-2">
     Name
            </label>
         
              <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Category name"
              className="w-full border  placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Project */}
          <div>
            <label className="block  text-sm mb-2">
        Description
            </label>
            <input
              type="text"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border  placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

     

      
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={closeModal}
            className="px-6 py-2.5   rounded-lg bg-white hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
{!edit? 'Create': 'Update'}
          </button>
        </div>
</form>
      </div>
      
    </div>
  );
}