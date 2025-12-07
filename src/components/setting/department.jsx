import { useState, useEffect } from "react";
import Departmentmodal from "./departmentmodal";
import DepartmentCard from "./departmentcard";
import api from "../../api/axiosinterceptor";
import ENDPOINTS from "../../utils/ENDPOINTS";
import { fetchDepartments,fetchDepartmentid } from "../function";
import { DeleteDepartment,fetchusers } from "../function";
export default function Department() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [users,setusers]=useState([])
  const [departments,setdepartments]=useState()
 const [editingdata,seteditdata]=useState()
 const [update, setupdate]=useState(false)
useEffect(() => {
  const loadData = async () => {
    const res = await fetchDepartments();
    setdepartments(res);
    console.log("Res", res);

    fetchusers(setusers);
  };

  loadData();
}, []);



  const openAddModal = () => {
    seteditdata(null)
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEditModal = async (index) => {
 
 const res= await fetchDepartmentid(index)
    console.log("get id resposne",res)
    seteditdata(res.department)
     setEditingIndex(index);
     setupdate(true)
       setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
      setupdate(false)
  }
  const handleSaveNew = async(data) => {
    const res= await fetchDepartments();
    setdepartments(res)
      console.log('dept'+JSON.stringify(departments))
  };

  const handleUpdate = (data) => {
    setDepartments(prev => {
      const updated = [...prev];
      updated[editingIndex] = data;
      return updated;
    });
  };


  const handleDelete = async(id) => {
   await DeleteDepartment(id)
    const res=await fetchDepartments();
    setdepartments(res)
    console.log("Delete",id)
  
  };

  const editingData = editingIndex !== null ? departments[editingIndex] : null;

  return (
    <div className="w-full  p-8">
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
            onDelete={() => handleDelete(dept.id)}
            onEdit={() => openEditModal(dept.id)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 overflow-auto z-[99999] backdrop-blur-sm bg-black/40 ">
          <Departmentmodal
            closeModal={closeModal}
            // onSave={editingIndex !== null ? handleUpdate : handleSaveNew}
            
            user={users}
            fetchDepartments={fetchDepartments}
setdepartments={setdepartments}
setupdate={setupdate}
update={update}            editingData={editingdata}
            departments={departments}
          />
        </div>
      )}
    </div>
  );
}
