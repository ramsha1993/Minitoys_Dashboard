import { useEffect, useState } from 'react';
import Capex from './capex'
import { Trash2,Pencil } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCapex } from "../../redux/capex";
import { fetchcapexCategories,fetchUsers,FetchbyId } from '../function';
import ENDPOINTS from '../../utils/ENDPOINTS';
import api from '../../api/axiosinterceptor';
const department=({fetchDepartments})=>{
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [fetchdata,setFetchdata]=useState([])
const [fetchDept, setfetchDept] = useState([])
  const [categories, setCategories] = useState([])
  const [userslist, setusersList] = useState([])
   const [editData, seteditData] = useState([])
   const [edit, setEdit] = useState(false)
  // State to manage modal visibility
const showTable = useSelector((state) => state.capex.list);
const dispatch = useDispatch();
const fetchCapex= async ()=>{
  try{
  const response= await api.get({
      url: ENDPOINTS.OTHER.CAPEX,
  
    });

setFetchdata(response)
console.log("capex res"+ response)
}


  catch (error) {
    console.error("Error creating Capex:", error);
  }  }
const fetchdept= async ()=>{
const response=await fetchDepartments()
setfetchDept(response)
}

const fetchCategories= async ()=>{
    const response = await fetchcapexCategories()
     setCategories(response)
     console.log("response" + response)
    }
const loadUsers = async () => {
  const response = await fetchUsers();  // imported function
  setusersList(response);
       console.log("user list response" + response)

};

useEffect( ()=>{

fetchCapex()
fetchdept()
loadUsers()
fetchCategories()
},[])

    const handleEdit = async (id) => {
 
   const res= await FetchbyId(ENDPOINTS.OTHER.CAPEX,id)

    console.log("edit",res)
     seteditData(res)
    setEdit(true)
   
 setIsModalOpen(true);


  fetchCapex()

};


      const openModal = () => {
        setIsModalOpen(true);  // Open modal
      };
      const closeModal = () => {
        setIsModalOpen(false);  // Close modal
      };
      const onsubmit=(data)=>{
  setShowTable(prev => [...prev, data]);   // add new table each time
      }
      
  const handleDeleteRow = async (id) => {
    const response = await api.delete({
    url: `${ENDPOINTS.OTHER.CAPEX}/${id}`
    })
    console.log("capex delete" + response)
  fetchCapex()

};

    return(
        <div className="w-full h-screen p-8 "> 
          {/* Departments UI */}
          <h2 className="text-3xl font-medium mb-6">Capex</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          
           onClick={openModal}>
    + Add Capex
</button>
<div className="overflow-x-auto w-full">
<table className="w-full mt-4 border-separate "
  style={{ borderSpacing: 0, borderRadius: "10px",}}>
  <thead className="bg-gray-100 border rounded-lt-12">
    <tr>
      <th className="p-2  w-[150px]  border">Department</th> 
      <th className="p-2  w-[150px]  border">Project</th>
      <th className="p-2  w-[150px]  border">Category</th>
      <th className="p-2  w-[150px]  border">Owner</th>
      <th className="p-2  w-[150px]  border">Allocated</th>
      <th className="p-2  w-[150px]  border">Forecast</th>
      <th className="p-2  w-[150px]  border">Status</th>
      <th className="p-2  w-[150px]  border">Dates</th> 
      <th className="p-2  w-[150px]  border">Edit</th>
       <th className="p-2 w-[150px]   border">Delete</th>
    </tr>
  </thead>


  
 <tbody>
 {console.log("my table:", showTable)}


 {fetchdata.map((table, index) => (

   <tr key={index} >
  <td className="p-2 w-[150px] border">{table.department_id}</td>
  <td className="p-2 w-[150px] border">{table.project_name}</td>
  <td className="p-2 w-[150px] border">{table.capex_category_id}</td>
  <td className="p-2 w-[150px] border">{table.owner_user_id}</td>
  <td className="p-2 w-[150px] border">{table.allocated}</td>
  <td className="p-2 w-[150px] border">{table.forecast}</td>
  <td className="p-2 w-[150px] border">{table.status}</td>
  <td className="p-2 w-[150px] border">
    {table.start_date} - {table.end_date}
  </td>
 {console.log("my table "+showTable)}
   <td className="p-2 border text-center">
    <button onClick={() => handleEdit(table.id)}>
      <Pencil className="w-5 h-5 " />
    </button>
  </td>
  <td className="p-2 border text-center">
    <button onClick={() => handleDeleteRow(table.id)}>
      <Trash2 className="w-5 h-5 text-red-500" />
    </button>
  </td>
</tr>
))}

</tbody>

</table>
</div>
    {isModalOpen && <div className="fixed inset-0    overflow-auto z-[99999] backdrop-blur-sm">   <Capex fetchDept={fetchDept} closeModal={closeModal} editData={editData} edit={edit} userslist={userslist} categories={categories} fetchCapex={fetchCapex}  onsubmit={onsubmit} /> </div>}    
    
        </div>


    )
}
export default department