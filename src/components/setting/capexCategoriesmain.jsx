import React, { useEffect, useState } from 'react'
import CategoryModal from './capexCategories'
import CategoryCard from './capexCategoriesCard'
import ENDPOINTS from '../../utils/ENDPOINTS'
import  { Delete ,FetchbyId} from '../function'
const capexCategoriesmain = ({fetchcapexCategories}) => {
const [isModalOpen, setIsModalOpen] = useState(false)
const [categories, setCategories] = useState([])
 const [editData, seteditData] = useState([])
 const [edit, setEdit] = useState(false)
const fetchdata= async ()=>{
    const response = await fetchcapexCategories()
     setCategories(response)
     console.log("response" + response)
    }
useEffect(()=>{


fetchdata()
},[])
  const handleDelete = async (id) => {
   await Delete(ENDPOINTS.OTHER.CAPEX_CATEGORIES,id)
 fetchdata()
  
  };

 const openEditModal = async (id) => {
 
   const res= await FetchbyId(ENDPOINTS.OTHER.CAPEX_CATEGORIES,id)

    console.log("edit",res)
     seteditData(res)
    setEdit(true)
   
    openModal()

  };

      const openModal = () => {
        setIsModalOpen(true);
          setEdit(false)
      };
         const closeModal = () => {
        setIsModalOpen(false);  // Close modal
      };
  return (
          <div className="w-full overflow-visible h-screen  mx-auto "> 
          {/* Departments UI */}
          <h2 className="text-3xl font-medium mb-6">Capex Categories</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          
           onClick={openModal}
           >
    + Add Capex
</button>

{categories && 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mt-8">
    {categories.map((category, index) => {
      return <CategoryCard key={index} category={category}
      
          onDelete={() => handleDelete(category.id)}
            onEdit={() => openEditModal(category.id)} />
    })}
  </div>
}
    {isModalOpen && <div className="fixed inset-0    overflow-auto z-[99999] backdrop-blur-sm">   <CategoryModal closeModal={closeModal} edit={edit}  editData={editData}/> </div>}    

</div>

  )
}

export default capexCategoriesmain