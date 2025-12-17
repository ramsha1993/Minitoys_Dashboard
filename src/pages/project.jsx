import React, { useEffect, useState } from 'react'
import Project from '../components/project/project'
import { GETDATA,FetchbyId } from '../components/function'
import ENDPOINTS from '../utils/ENDPOINTS'


const project = () => {
const [data, setData] = useState(null)
const [showproject,setshowProject]=useState()
 const [serviceCode, setServicecode] = useState()
const [Vendor, setVendor] = useState()

const fetchCapex= async (id)=>{
const getCapex=await FetchbyId(ENDPOINTS.OTHER.CAPEX_BY_DEPT,id)
console.log("getcapex"+ getCapex.capex)
const res=getCapex.capex
console.log("get capex" +JSON.stringify(res))
setshowProject(res)

}

const FetchServiceCode= async (id)=>{
const ServiceCode=await FetchbyId(ENDPOINTS.OTHER.SERVICE_CODE,id)
console.log("getcapex"+ ServiceCode.vendors)
const res=Vendor.vendors
console.log("get capex" +JSON.stringify(res))
setServicecode(res)

}


const FetchVendor= async ()=>{
const response= await GETDATA(ENDPOINTS.OTHER.VENDOR)

setVendor(response.vendors)

}

const fetchProject= async ()=>{
const response= await GETDATA(ENDPOINTS.OTHER.DEPT_NAMES)

setData(response.departments)

}




useEffect(()=>{
fetchProject()
FetchVendor()
FetchServiceCode()
},[])

  return (
<Project data={data} Vendor={Vendor} serviceCode={serviceCode}  showproject={showproject} fetchCapex={fetchCapex} />
  )
}

export default project