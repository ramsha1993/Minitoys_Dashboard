import { useState } from 'react';
import Capex from './capex'
import { Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCapex } from "../../redux/capex";
const department=()=>{
        const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility
const showTable = useSelector((state) => state.capex.list);
const dispatch = useDispatch();

      const openModal = () => {
        setIsModalOpen(true);  // Open modal
      };
      const closeModal = () => {
        setIsModalOpen(false);  // Close modal
      };
      const onsubmit=(data)=>{
  setShowTable(prev => [...prev, data]);   // add new table each time
      }
      
  const handleDeleteRow = (index) => {
  const updated = showTable.filter((_, i) => i !== index);
  setShowTable(updated);
  dispatch(deleteCapex(index));
};
    return(
        <div className="w-full overflow-visible h-screen  mx-auto "> 
          {/* Departments UI */}
          <h2 className="text-3xl font-medium mb-6">Capex</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          
           onClick={openModal}>
    + Add Capex
</button>
{showTable.length >= 1 &&
<table className="w-full mt-4 border-separate"
  style={{ borderSpacing: 0, borderRadius: "10px", overflow: "hidden" }}>
  <thead className="bg-gray-100 border rounded-lt-12">
    <tr>
      <th className="p-2 border">Department</th> 
      <th className="p-2 border">Project</th>
      <th className="p-2 border">Category</th>
      <th className="p-2 border">Owner</th>
      <th className="p-2 border">Allocated</th>
      <th className="p-2 border">Forecast</th>
      <th className="p-2 border">Status</th>
      <th className="p-2 border">Dates</th>
       <th className="p-2 border">Delete</th>
    </tr>
  </thead>


  
 <tbody>
 {console.log("my table:", showTable)}

  {showTable.map((table, index) => (
   <tr key={index}>
  <td className="p-2 border">{table.department_id}</td>
  <td className="p-2 border">{table.project_name}</td>
  <td className="p-2 border">{table.category}</td>
  <td className="p-2 border">{table.owner_user_id}</td>
  <td className="p-2 border">{table.allocated}</td>
  <td className="p-2 border">{table.forecast}</td>
  <td className="p-2 border">{table.status}</td>
  <td className="p-2 border">
    {table.start_date} - {table.end_date}
  </td>
 {console.log("my table "+showTable)}
  <td className="p-2 border text-center">
    <button onClick={() => handleDeleteRow(index)}>
      <Trash2 className="w-5 h-5 text-red-500" />
    </button>
  </td>
</tr>

  ))}
</tbody>

</table>
}
    {isModalOpen && <div className="fixed inset-0    overflow-auto z-[99999] backdrop-blur-sm">   <Capex closeModal={closeModal} onsubmit={onsubmit} /> </div>}    
    
        </div>


    )
}
export default department