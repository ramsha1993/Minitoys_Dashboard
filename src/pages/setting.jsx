import React, { useState,useEffect } from 'react'
import Setting from '../components/setting/index'
import { fetchcapexCategories,fetchDepartments} from '../components/function'
const setting = () => {
      const [departments, setDepartments] = useState([]);
    useEffect(() => {

      fetchDepartments()
      fetchcapexCategories()
    console.log("departments",departments)
     
 
  }, []);



  return (
<>
<Setting departments={departments} fetchcapexCategories={fetchcapexCategories} fetchDepartments={fetchDepartments} />
</>
  )
}

export default setting