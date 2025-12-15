import React, { useState,useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import ENDPOINTS from '../../utils/ENDPOINTS';
import api from '../../api/axiosinterceptor';
import Select from 'react-select';
import { UpdateDept } from '../function';
export default function AddDepartmentModal({update,setupdate,departments,setdepartments, closeModal,fetchDepartments, onSave,editingData,user}) {

  const [formData, setFormData] = useState({
    departmentName: '',
    costCenter: '',
    departmentHead: '',
    description: '',
    departmentCodes: []
  });

const [errors, setErrors] = useState({});
const [apiError, setApiError] = useState("");
const [loading, setLoading] = useState(false);
const [selectedOption, setSelectedOption] = useState(null)
const validateForm = () => {
  let err = {};

  if (!formData.departmentName.trim()) err.departmentName = "Department name is required";
  if (!formData.costCenter.trim()) err.costCenter = "Cost center is required";
  if (!formData.departmentHead) err.departmentHead = "Select a department head";

  formData.departmentCodes.forEach((dc, i) => {
    if (!dc.name.trim()) err[`dc-name-${i}`] = "Dept code is required";
    if (!dc.value) err[`dc-value-${i}`] = "Budget value required";

    dc.serviceCodes.forEach((sc, j) => {
      if (!sc.name.trim()) err[`sc-name-${i}-${j}`] = "Service code is required";
      if (!sc.value) err[`sc-value-${i}-${j}`] = "Service budget required";
    });
  });

  setErrors(err);
  return Object.keys(err).length === 0;
};











  // for select 2 opt

const options = user.users.map(us => ({
  value: us.id,
  label: us.full_name
}));
// for select2
 const handleChangeselect = (field,selectedOption) => {

  setSelectedOption(selectedOption)
setFormData(prev => ({ ...prev, [field]: selectedOption.value }));
console.log("selected" ,selectedOption)}
 
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  useEffect(() => {
  if (editingData) {
        const headOption = options.find(opt => opt.value === editingData.head_user_id);
    setSelectedOption(headOption);
    setFormData({
      departmentName: editingData.name,
      costCenter: editingData.cost_center_code,
      departmentHead: editingData.head_user_id,
      description: editingData.description,
      departmentCodes:editingData.departmentCodes?.map(dc => ({
        name: dc.code,                        // API → your modal
        value: dc.total_budget,               // API → your modal
        serviceCodes: dc.serviceCodes?.map(sc => ({
          name: sc.service_code,              // API → your modal
          value: sc.budget_amount             // API → your modal
        })
   )})) 
  })
  console.log("editdata",editingData)
  
  }
}, [editingData]);
  const addDeptCode = () => {
    setFormData(prev => ({
      ...prev,
      departmentCodes: [...prev.departmentCodes, { name: '', value: '', serviceCodes: [] }]
    }));
  };
// for adding dept code in deptcode array
  const updateDeptCode = (index, field, value) => {
    const updated = [...formData.departmentCodes];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, departmentCodes: updated }));
  };
// removing code
  const removeDeptCode = (index) => {
    setFormData(prev => ({
      ...prev,
      departmentCodes: prev.departmentCodes.filter((_, i) => i !== index)
    }));
  };

  const addServiceCode = (deptIndex) => {
    const updated = [...formData.departmentCodes];
    updated[deptIndex].serviceCodes.push({ name: '', value: '' });
    setFormData(prev => ({ ...prev, departmentCodes: updated }));
  };

  const updateServiceCode = (deptIndex, serviceIndex, field, value) => {
    const updated = [...formData.departmentCodes];
    updated[deptIndex].serviceCodes[serviceIndex][field] = value;
    setFormData(prev => ({ ...prev, departmentCodes: updated }));
  };

  const removeServiceCode = (deptIndex, serviceIndex) => {
    const updated = [...formData.departmentCodes];
    updated[deptIndex].serviceCodes = updated[deptIndex].serviceCodes.filter((_, i) => i !== serviceIndex);
    setFormData(prev => ({ ...prev, departmentCodes: updated }));
  };

 
const handleSave = async () => {
    if (!validateForm()) return;

  setLoading(true);
      const payload = {
    name: formData.departmentName,
    description: formData.description,
    cost_center_code: formData.costCenter,
    head_user_id: formData.departmentHead,
    is_active: true, // or make this dynamic if you have a toggle
    department_codes: formData.departmentCodes.map(dc => ({
      code: dc.name,
      total_budget:dc.value, // ensure it's a number
      service_codes: dc.serviceCodes.map(sc => ({
        service_code: sc.name,
        budget_amount:sc.value // ensure number
      }))
    }))
  }
  

  try {
    const response = await api.post({
      url: ENDPOINTS.OTHER.DEPARTMENT,
      data: payload,
    })

    console.log("Department created:", response);
  const data=  JSON.stringify(formData)
  const updated_Data=await fetchDepartments()
  console.log("update data" + updated_Data)
setdepartments(updated_Data)
       closeModal(); 

    console.log("Department " +  JSON.stringify(formData))    // ⬅ send data to parent
  
      } catch (error) {
    console.error("Error creating department:", error);
  }      
  };


const handleEdit = async (id) => {
  if (!validateForm()) return;

  setLoading(true);
  const payload = {
    name: formData.departmentName,
    description: formData.description,
    cost_center_code: formData.costCenter,
    head_user_id: formData.departmentHead,
    is_active: true, // or make this dynamic if needed
    department_codes: formData.departmentCodes.map(dc => ({
      code: dc.name,
      total_budget: Number(dc.value), // ensure it's a number
      service_codes: dc.serviceCodes.map(sc => ({
        service_code: sc.name,
        budget_amount: Number(sc.value) // ensure number
      }))
    }))
  };

  try {
    const response = await api.put({
      url: `${ENDPOINTS.OTHER.DEPARTMENT}/${id}`,
      data: payload,
    });

    console.log("Department updated:", response);

const res= await fetchDepartments()
const fetchdept=res.departments
setdepartments(res)
console.log("my fetch dept",fetchdept)

        closeModal();


    console.log("Department:", JSON.stringify(formData));


setupdate(false)
  } catch (error) {
    console.error("Error updating department:", error?.response?.data || error);
  }
};


  return (
    <div className=" relative max-w-2xl mx-auto  p-4">
      <div className="w-full bg-white rounded-2xl p-8 shadow-2xl relative">
        <h1 className="text-black text-3xl font-medium mb-6">Add Department</h1>

        <input type="text" placeholder="Department Name"
          value={formData.departmentName}
          onChange={(e) => handleChange('departmentName', e.target.value)}
          className="w-full text-black rounded-xl px-5 py-2 border mb-4"
        />

        <input type="text" placeholder="Cost Center"
          value={formData.costCenter}
          onChange={(e) => handleChange('costCenter', e.target.value)}
          className="w-full text-black rounded-xl px-5 py-2 border mb-4"
        />

      
         <Select placeholder="Department Head" 
        value={selectedOption}
              className="w-full text-black rounded-xl  py-2  mb-4"

onChange={(selected) => handleChangeselect('departmentHead', selected)}

        options={options}
      />

        <textarea placeholder="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full text-black rounded-xl resize-none px-5 py-2 border mb-8"
          rows={3}
        />

        <h2 className="text-black text-xl font-medium mb-4">Department Codes</h2>

        {formData.departmentCodes.map((code, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border mb-4">

            <input type="text" placeholder="Dept Code"
              value={code.name}
              onChange={(e) => updateDeptCode(index, 'name', e.target.value)}
              className="w-full text-black rounded-xl px-4 py-2 border mb-4"
            />

            <input type="text" placeholder="Dept Value"
              value={code.value}
              onChange={(e) => updateDeptCode(index, 'value', e.target.value)}
              className="w-full text-black rounded-xl px-4 py-2 border mb-4"
            />

            <button onClick={() => removeDeptCode(index)}
              className="bg-red-100 text-red-600 rounded-lg px-4 py-2 mb-4">
              Remove Dept
            </button>

            <h3 className="text-black text-lg font-semibold mb-3">Service Codes</h3>

            {code.serviceCodes.map((service, sIndex) => (
              <div key={sIndex} className="flex gap-2 mb-3">
                <input type="text" placeholder="Service Code"
                  value={service.name}
                  onChange={(e) => updateServiceCode(index, sIndex, 'name', e.target.value)}
                  className="text-black rounded-xl px-2 py-2 border"
                />

                <input type="text" placeholder="Value"
                  value={service.value}
                  onChange={(e) => updateServiceCode(index, sIndex, 'value', e.target.value)}
                  className="text-black rounded-xl px-2 py-2 border"
                />

                <button onClick={() => removeServiceCode(index, sIndex)}
                  className="p-2 bg-red-600 text-white rounded-xl">
                  <X size={12} />
                </button>
              </div>
            ))}

            <button onClick={() => addServiceCode(index)}
              className="bg-blue-600 text-white rounded-xl px-4 py-2 flex items-center gap-2">
              <Plus size={20} /> Add Service Code
            </button>
          </div>
        ))}

        <button onClick={addDeptCode}
          className="bg-blue-600 text-white rounded-xl px-4 py-2 mb-6 flex items-center gap-2">
          <Plus size={20} /> Add Dept Code
        </button>

{Object.keys(errors).length > 0 && (
  <div className="bg-red-100 text-red-700 p-3 my-4 rounded-lg">
    <ul className="list-disc ml-4">
      {Object.values(errors).map((err, idx) => (
        <li key={idx}>{err}</li>
      ))}
    </ul>
  </div>
)}

        <div className="flex justify-end gap-3">
          <button onClick={closeModal}
            className="hover:bg-zinc-100 text-black font-semibold rounded-xl px-4 py-2">
            Cancel
          </button>

          <button onClick={()=>update ? handleEdit(editingData.id) : handleSave()}
            className="bg-blue-600 text-white font-semibold rounded-xl px-6 py-2">
      {  update ? 'Update':'Save' }
          </button>
        </div>
      </div>
    </div>
  );
}
