import React, { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react';
import ENDPOINTS from '../../utils/ENDPOINTS';
import { Delete,FetchbyId,Update } from '../function';
import api from '../../api/axiosinterceptor';
const Roles = ({fetchroles,Role}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editData, seteditData] = useState(null)
  const [formData, setformData] = useState({
  name:'',
  description:'',id:''
  })
   const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    setformData({ name: '', description: '' });
    setIsModalOpen(false);
  };



const handleSubmit = async () => {
       
    console.log('Form submitted:', formData);
   
  const payload={
 name: formData.name,
  }
    
  try{
    const response = await api.post({
      url: ENDPOINTS.OTHER.ROLE,
      data: payload,
    });

   
    console.log("Module created:", response);
  
    // ⬅ send data to parent
    fetchroles()
    handleCancel();  
     setformData({
  
 name:'',
 description:''
});

      } 
  catch (error) {
    console.log("my status" +formData.status)
    console.error("Error creating Capex:", error);
  }  


    // Handle form submission
  };
const update = async (id) => {

  const payload = {
    name: formData.name,
    description: formData.description,
  };

  try {
    await Update(ENDPOINTS.OTHER.ROLE,id, payload);

    await fetchroles();

    // Close modal
    setIsModalOpen(false);

    // Clear form
    setformData({
      name: "",
      description: ""
    });
    setEdit(false)

  } catch (error) {
    console.error("Update failed:", error);
  }
};






  const handleDelete = async (id) => {
   await Delete(Delete(ENDPOINTS.OTHER.ROLE,id))
      fetchroles()
  
  };
  const handleEdit= async (id)=>{
setEdit(true)
  const response= await FetchbyId(ENDPOINTS.OTHER.ROLE,id)
  const data=response
  seteditData(data)
  console.log('response id'+data)
  if(edit){
setformData({
   name:data.name,
    description:data.description
    ,id:data.id

})
 setIsModalOpen(true)
  }
  else{setformData({
   name:'',
    description:''
    ,id:''

})}

  }
const openModal=()=>{
  setEdit(false)
  setIsModalOpen(true)
}

  return (<div>
                <div className="flex justify-end mb-6">
              <button 
                onClick={() => openModal()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} />
                Add Role
              </button>
       
</div>
 <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Created</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                 {Role && Role.length > 0 && Role.map((elem, index) => (
                    <tr
                      key={elem.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index === Roles.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="py-4 px-6 font-semibold text-black">{elem.name}</td>
                      <td className="py-4 px-6 text-gray-600">{elem.description}</td>
                      <td className="py-4 px-6 text-gray-600">{elem.created}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-3">
                          <button className="text-gray-600 hover:text-black transition-colors" onClick={()=>handleEdit(elem.id)}>
                            <Pencil size={18} />
                          </button>
                          <button className="text-gray-600 hover:text-red-600 transition-colors" onClick={()=>handleDelete(elem.id)}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
               {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center p-4 z-[99999]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-black mb-6">Create Module</h2>
            
<form onSubmit={(e) => {
  e.preventDefault();
  edit ? update(editData.id) : handleSubmit();
}}>              <div className="mb-4">
                <label className="block text-sm font-semibold text-black mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter Role name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter Role description"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                >
                 {edit ? 'Update' : 'Create' }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



            </div>
            </div>
  )
}

export default Roles