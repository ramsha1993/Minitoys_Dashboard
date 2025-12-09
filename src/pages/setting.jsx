import React, { useState,useEffect } from 'react'
import Setting from '../components/setting/index'
import { fetchcapexCategories} from '../components/function'
const setting = () => {
      const [departments, setDepartments] = useState([]);
    useEffect(() => {


      fetchcapexCategories()
    console.log("departments",departments)
     
 
  }, []);



  return (
<>
<Setting departments={departments} fetchcapexCategories={fetchcapexCategories} />
</>
  )
}

export default setting