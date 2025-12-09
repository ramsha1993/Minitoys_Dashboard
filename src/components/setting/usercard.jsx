
import { X, Pencil,Trash2 } from "lucide-react";

function UserCard({ user, onDelete, onEdit,handleDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 relative hover:shadow-xl transition-shadow">
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={() => onEdit(user.id)}
          className="  rounded-full p-1.5 transition-colors "
          aria-label="Edit user"
        >
          <Pencil size={18} className="cursor-pointer" onClick={onEdit} />
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className=" text-white rounded-full p-1.5 transition-colors "
          aria-label="Delete user"
        >
               <Trash2 size={18} className={`text-red-600 cursor-pointer `} onClick={handleDelete} />

        </button>
      </div>

      {/* Admin Badge */}
      {user.role === 'Admin' && (
        <div className="absolute top-2 left-2">
          <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            ADMIN
          </span>
        </div>
      )}

      {/* User Avatar and Info */}
      <div className="flex items-start gap-3 mb-4 mt-8">
        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-white text-xl font-bold">{user.initials}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 font-bold text-base truncate">{user.full_name}</h3>
          <p className="text-gray-500 text-xs truncate mt-0.5">{user.email}</p>
        </div>
      </div>

      {/* Status */}
      <div className="mb-3">
        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
          user.status === 'Active' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-gray-100 text-gray-600 border border-gray-300'
        }`}>
          {user.status}
        </span>
      </div>

      {/* Department/Role and Reports To */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Role:</span>
          <span className="text-gray-900 text-xs font-semibold">{user.role}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Department:</span>
          <span className="text-gray-900 text-xs font-semibold">{user.department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Reports to:</span>
          <span className="text-gray-900 text-xs font-semibold">{user.reportsTo}</span>
        </div>
      </div>
    </div>
  );
}
export default UserCard