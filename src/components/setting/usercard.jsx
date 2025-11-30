// UserCard Component
import { X } from "lucide-react";
function UserCard({ user, onDelete, onEdit }) {
  return (
    <div className=" rounded-xl shadow-lg p-4 relative">
      {/* Delete Button */}
      <button
        onClick={() => onDelete(user.id)}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
        aria-label="Delete user"
      >
        <X size={16} />
      </button>

      {/* Admin Badge */}
      {user.role === 'Admin' && (
        <div className="absolute top-2 right-10">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            ADMIN
          </span>
        </div>
      )}

      {/* User Avatar and Info */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className=" text-lg font-bold">{user.initials}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className=" font-semibold text-sm truncate">{user.name}</h3>
          <p className=" text-xs truncate">{user.email}</p>
        </div>
      </div>

      {/* Status */}
      <div className="mb-2">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
          user.status === 'Active' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'
        }`}>
          {user.status}
        </span>
      </div>

      {/* Department/Role and Reports To */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className=" text-xs">👔 Manager</span>
        </div>
        <p className="text-xs">{user.department}</p>
        <p className="text-xs">Reports to: {user.reportsTo}</p>
      </div>
    </div>
  );
}
export default UserCard