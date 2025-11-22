import AddUserModal from "./Addusermodal"
import { useState } from "react"
const user=()=>{
      const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility

  const openModal = () => {
    setIsModalOpen(true);  // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close modal
  };
    return(
        <div className="max-w-5xl overflow-visible h-full mx-auto "> 
<div className="flex justify-between items-center w-full">
<h2 className="text-3xl font-medium mb-6">User Management </h2>
<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium" 
  onClick={openModal}>
    + Add User
</button>
</div>
<input type="text" placeholder="search user" className="w-full px-2 py-2 rounded-lg focus:outline-none border "/>
    {isModalOpen && <div className="fixed inset-0    overflow-auto z-[99999] backdrop-blur-sm">   <AddUserModal closeModal={closeModal} /> </div>}        </div>
    )
}
export default user