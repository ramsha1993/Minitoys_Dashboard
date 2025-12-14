import React, { useEffect, useState } from 'react'
import Modules from '../components/modules/index'
import { GETDATA } from '../components/function'
import ENDPOINTS from '../utils/ENDPOINTS'
const module = () => {
const [getData, setgetData] = useState(null)
const [Role, setRole] = useState(null)
 const fetchdata = async ()=>{
    const data= await GETDATA(ENDPOINTS.OTHER.MODULE)
    setgetData(data.modules)
 }

 const fetchroles = async ()=>{
    const data= await GETDATA(ENDPOINTS.OTHER.ROLE)
    setRole(data)
 }

useEffect(()=>{

   fetchdata()
   fetchroles()
},[])


  return (
    <div><Modules fetchroles={fetchroles} Role={Role}  getData={getData} fetchdata={fetchdata}/></div>
  )
}

export default module