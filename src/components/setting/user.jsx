import AddUserModal from "./Addusermodal"
import { useEffect, useState } from "react"
import UserCard from "./usercard"
import ENDPOINTS from '../../utils/ENDPOINTS'
import api from "../../api/axiosinterceptor"
import { GETDATA } from '../function';

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
 const [Roles,setRoles] = useState([])
 const [filteredUsers,setfilteredUsers]=useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  const fetchdata = async ()=>{
  const response = await GETDATA(ENDPOINTS.OTHER.ROLE)
  setRoles(response)
}


useEffect(()=>{
const userList= async ()=> {
     try { 
       const response = await api.get({
         url: ENDPOINTS.AUTH.USER_LIST,
 })
 const data=await response.users
      setfilteredUsers(data)
       console.log("user res",response)
       closeModal()
  }

   catch(error){
      console.error("Error creating user:", error);}
}
   userList();
   fetchdata()
},[])
  const handleUserCreate = async (newUser) => {
        try {
        
       const response = await api.post({
         url: ENDPOINTS.AUTH.REGISTER,
   data: newUser,
   isFile:true
  
       })
       console.log("user res",response)
       closeModal()
  }

      catch(error){
      console.error("Error creating user:", error);}
}

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className=" text-3xl font-medium">User Management</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
            onClick={openModal}
          >
            + Add User
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg focus:outline-none border  placeholder-slate-400 mb-6"
        />

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-400 py-12">
            No users found matching your search.
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 overflow-auto z-[99999] backdrop-blur-sm">
            <AddUserModal Roles={Roles} filteredUsers={filteredUsers} closeModal={closeModal} onUserCreate={handleUserCreate} />
          </div>
        )}
      </div>
    </div>
  );
}