import React, { useEffect, useState } from 'react'
import Modules from '../components/modules/index'
import { GETDATA } from '../components/function'
import ENDPOINTS from '../utils/ENDPOINTS'
const module = () => {
const [getData, setgetData] = useState(null)
 const fetchdata = async ()=>{
    const data= await GETDATA(ENDPOINTS.OTHER.MODULE)
    setgetData(data.modules)
 }


useEffect(()=>{

   fetchdata()
},[])


  return (
    <div><Modules  getData={getData} fetchdata={fetchdata}/></div>
  )
}

export default module