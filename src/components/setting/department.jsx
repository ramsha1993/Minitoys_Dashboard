import { useState, useEffect } from "react";
import Departmentmodal from "./departmentmodal";
import DepartmentCard from "./DepartmentCard";
import api from "../../api/axiosinterceptor";
import ENDPOINTS from "../../utils/ENDPOINTS";

export default function Department() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {

    fetchDepartments();
  }, []);
  const fetchDepartments = async () => {
    try {
      const response = await api.get({
        url: ENDPOINTS.OTHER.DEPARTMENT,
      });
      if (response) {
        setDepartments(response);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  const openAddModal = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSaveNew = (data) => {
      fetchDepartments();
  };

  const handleUpdate = (data) => {
    setDepartments(prev => {
      const updated = [...prev];
      updated[editingIndex] = data;
      return updated;
    });
  };

  const handleDelete = (index) => {
    setDepartments(prev => prev.filter((_, i) => i !== index));
  };

  const editingData = editingIndex !== null ? departments[editingIndex] : null;

  return (
    <div className="w-full min-h-screen p-8">
      <h2 className="text-3xl font-medium mb-6">Departments</h2>

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
        onClick={openAddModal}
      >
        + Add Department
      </button>

      {/* Render Department Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mt-8">
        {departments?.departments?.length > 0 && departments?.departments?.map((dept, index) => (
          <DepartmentCard
            key={index}
            dept={dept}
            onDelete={() => handleDelete(index)}
            onEdit={() => openEditModal(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 overflow-auto z-[99999] backdrop-blur-sm bg-black/40 ">
          <Departmentmodal
            closeModal={closeModal}
            onSave={editingIndex !== null ? handleUpdate : handleSaveNew}
            editingData={editingData}
          />
        </div>
      )}
    </div>
  );
}
