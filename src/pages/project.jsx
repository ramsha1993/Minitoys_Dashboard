import React, { useEffect, useState } from 'react'
import Project from '../components/project/project'
import { GETDATA,FetchbyId } from '../components/function'
import ENDPOINTS from '../utils/ENDPOINTS'


const project = () => {
const [data, setData] = useState(null)
const [showproject,setshowProject]=useState()
 


const fetchCapex= async (id)=>{
const getCapex=await FetchbyId(ENDPOINTS.OTHER.CAPEX_BY_DEPT,id)
console.log("getcapex"+ getCapex.capex)
const res=getCapex.capex
console.log("get capex" +JSON.stringify(res))
setshowProject(res)

}



const fetchProject= async ()=>{
const response= await GETDATA(ENDPOINTS.OTHER.DEPT_NAMES)

setData(response.departments)

}




useEffect(()=>{
fetchProject()
},[])

  return (
<Project data={data} showproject={showproject} fetchCapex={fetchCapex} />
  )
}

export default project