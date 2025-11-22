import { useState } from 'react';
import Departmentmodal from './departmentmodal'
const department=()=>{
        const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility
    
      const openModal = () => {
        setIsModalOpen(true);  // Open modal
      };
      const closeModal = () => {
        setIsModalOpen(false);  // Close modal
      };
    return(
        <div className="w-full overflow-visible h-screen  mx-auto "> 
          {/* Departments UI */}
          <h2 className="text-3xl font-medium mb-6">Departments</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          
           onClick={openModal}>
    + Add Department
</button>

    {isModalOpen && <div className="fixed inset-0    overflow-auto z-[99999] backdrop-blur-xs">   <Departmentmodal closeModal={closeModal} /> </div>}    
    
        </div>


    )
}
export default department