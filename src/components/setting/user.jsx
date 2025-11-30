import AddUserModal from "./Addusermodal"
import { useState } from "react"
import UserCard from "./usercard"
export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
   
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUserCreate = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <AddUserModal closeModal={closeModal} onUserCreate={handleUserCreate} />
          </div>
        )}
      </div>
    </div>
  );
}