import { Building, Info, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DepartmentCard({ dept, onDelete, onEdit }) {
const [showbudget,setshowbudget]= useState(false)
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border text-black w-[320px]">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Building className="text-blue-600" />
          <h2 className="font-bold text-xl">{dept.departmentName}</h2>
        </div>

        <div className="flex gap-3 text-zinc-700">
          <Info size={18} className="cursor-pointer" onClick={()=>setshowbudget(!showbudget)}/>
          <Pencil size={18} className="cursor-pointer" onClick={onEdit} />
          <Trash2 size={18} className="text-red-600 cursor-pointer" onClick={onDelete} />
        </div>
      </div>
{!showbudget &&
<div>
      <p className="mt-4"><b>Cost Center:</b> {dept.costCenter}</p>
      <p className="mt-2"><b>Head:</b> {dept.departmentHead}</p>
      </div>}
    
    {showbudget &&
    <div>
        {dept.departmentCodes?.map((codeObj, index) => (
    <div key={index} className="ml-4 mt-1">
      <p> {codeObj.name}-£{codeObj.value}</p>

      {codeObj.serviceCodes?.map((svc, svcIndex) => (
        <div key={svcIndex} className="ml-6">
          <li> {svc.name}-£{svc.value}</li>
        </div>
      ))}
    </div>
  ))}
  </div>
}
    </div>
  );
}
