import { useState } from 'react';
import ENDPOINTS from '../../utils/ENDPOINTS';
import { POST,Delete,Update ,FetchbyId} from '../function';

import { Pencil } from 'lucide-react';
export default function VendorManagement({fetchVendor,fetchVendordata}) {
  const [formData, setFormData] = useState({
    vendorName: '',
    description: '',
    contactName: '',
    email: ''
  });
  
  const [vendors, setVendors] = useState([]);
  const [errors, setErrors] = useState({});
const [editData, seteditData] = useState(null)
const [edit, setEdit] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.vendorName.trim()) {
      newErrors.vendorName = 'Vendor name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const newVendor = {
        id: Date.now(),
        ...formData
      };
        setVendors(prev => [...prev, newVendor]);
        console.log("vendors"+ vendors)
      const payload={
    name:formData.vendorName, 
    description:formData.description,
    contactName:formData.contactName,
    email:formData.email,
    supplier:formData.supplier
} 

 const response=  await POST(ENDPOINTS.OTHER.VENDOR,payload)

 console.log("post vendor" , response)
      fetchVendordata()
      setFormData({
        vendorName: '',
        description: '',
        contactName: '',
        email: ''
      });



    }
  };



  const handleUpdate = async () => {
    if (validateForm()) {
      const newVendor = {
        id: Date.now(),
        ...formData
      };
        setVendors(prev => [...prev, newVendor]);
        console.log("vendors"+ vendors)
      const payload={
    name:formData.vendorName, 
    description:formData.description,
    contactName:formData.contactName,
    email:formData.email,
    supplier:formData.supplier
} 

 const response=  await Update(ENDPOINTS.OTHER.VENDOR,editData.id,payload)

 console.log("post vendor" , response)
      fetchVendordata()
      setFormData({
        vendorName: '',
        description: '',
        contactName: '',
        email: ''
      });
           setEdit(false)



    }
  };

  const handleDelete = async (id) => {
   await Delete(ENDPOINTS.OTHER.VENDOR,id)
 fetchVendordata()
  
  };

 const handleEdit = async (id) => {
 
   const res= await FetchbyId(ENDPOINTS.OTHER.VENDOR,id)
const data=res.vendor
    console.log("edit",data)
     seteditData(data)
    setFormData({ vendorName: editData.name,
    description: editData.description,
    contactName:editData.contactName,
    email:editData.email})
        setEdit(true)
   
      

  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl">
        <div className="space-y-6 mb-12">
          <div>
            <label className="block text-lg mb-2">
              Vendor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              placeholder="Enter vendor name"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
            />
            {errors.vendorName && (
              <p className="text-red-500 text-sm mt-1">{errors.vendorName}</p>
            )}
          </div>

          <div>
            <label className="block text-lg mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a short description"
              rows="3"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-lg mb-2">Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-lg mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={edit ? handleUpdate : handleSubmit}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-3 rounded-lg transition-colors"
            >
             {edit ? 'Update':'Add Vendor'}
            </button>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <h2 className="text-3xl font-bold mb-6">Existing Vendors</h2>
          
          {fetchVendor.length == 0 ? (
            <p className="text-slate-400 text-lg">No vendors added yet.</p>
          ) : (
            <div className="space-y-4">
              {fetchVendor.map((vendor) => (
                <div
                  key={vendor.id}
                  className="border border-slate-700 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{vendor.name}</h3>
                 <button
                    onClick={() => handleEdit(vendor.id)}
                      className=" bg-blue-500 text-white px-2 py-2 rounded-lg text-xs transition-colors"
                    >
                      <Pencil />
                    </button>
                  </div>
                  <p className=" mb-4">{vendor.description}</p>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    {vendor.contactName && (
                      <div>
                        <span className="">Contact: </span>
                        <span>{vendor.contactName}</span>
                      </div>
                    )}
                    {vendor.email && (
                      <div>
                        <span className="">Email: </span>
                        <span>{vendor.email}</span>
                      </div>
                    )}
                             <button
                      onClick={() => handleDelete(vendor.id)}
                      className="bg-red-500 hover:bg-red-600 w-24 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}