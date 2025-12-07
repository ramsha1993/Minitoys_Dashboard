import React, { useState,useEffect } from 'react'
import Setting from '../components/setting/index'
// import { fetchDepartments} from '../components/function'
const setting = () => {
      const [departments, setDepartments] = useState([]);
    useEffect(() => {

    // fetchDepartments(setDepartments);
    console.log("departments",departments)
     
 
  }, []);



  return (
<>
<Setting departments={departments} />
</>
  )
}

export default setting