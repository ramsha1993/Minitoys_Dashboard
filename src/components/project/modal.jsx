import { useEffect, useState } from 'react';
import Select from 'react-select';
import { POST } from '../function'
import ENDPOINTS from '../../utils/ENDPOINTS'
export default function AddExpenseForm({ closeModal, payload, FetchServiceCode, Vendor, setisModalOpen, data, Dept, serviceCode }) {
  const [formData, setFormData] = useState({
    description: '',
    dateRaised: '',
    requestedBy: '',
    initialValue: '',
    value: '',
    valueReceipted: '',
    serviceCode: '',
    capexOpex: '',
    vendor: '',
    poNumber: '',
    reqNumber: ''
  });


  const [selectedOption, setSelectedOption] = useState(null)
  const [selectOptionTwo, setselectOptionTwo] = useState([])
  const [option_Two, setoption_Two] = useState()
  const [dept_id, setDept_id] = useState()





  useEffect(() => {
    if (!Dept?.value) return; // safety check

    const ServiceCode = async () => {
      try {
        console.log("Dept value:", Dept.value);

        const response = await FetchServiceCode(Dept.value);

        console.log("Service code response:", response);

        setoption_Two(response?.serviceCodes || []);
      } catch (error) {
        console.error("Service code API error:", error);
      }
    };

    ServiceCode();
  }, [Dept?.value]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async () => {

    const payload_two = {
      department_id: payload.department_id,
      capex_id: payload.projectcapex_id,
      description: formData.description,
      dateRaised: formData.dateRaised,
      requestedBy: formData.requestedBy,
      initialValue: formData.initialValue,
      value: formData.value,
      valueReceipted: formData.valueReceipted,
      service_code_id: formData.serviceCode,
      capexType: formData.capexOpex,
      vendor_id: formData.vendor,
      poNumber: formData.poNumber,
      reqNumber: formData.reqNumber
    }
    const response = await POST(ENDPOINTS.OTHER.PROJECT, payload_two)
    console.log("response", response)
    handleCancel()
  };




  const handleChangeselect = async (field, selectedOption) => {

    setSelectedOption(selectedOption)
    console.log("selected", selectedOption.value)

    console.log("Selectedoption" + JSON.stringify(selectedOption.value))
    setFormData(prev => ({ ...prev, [field]: selectedOption.value }));
  }

  const handleChangeselect_Two = async (field, selectedOption) => {

    setselectOptionTwo(selectedOption)
    console.log("selected", selectedOption.value)

    console.log("Selectedoption" + JSON.stringify(selectedOption.value))
    setFormData(prev => ({ ...prev, [field]: selectedOption.value }));
  }



  const options = Vendor?.map(us => ({
    value: us.id,
    label: us.name
  }));

  const option_two = option_Two?.map(us => ({
    value: us.id,
    label: us.service_code
  }));



  const handleCancel = () => {
    setisModalOpen(false)
  };











  return (
    <div className="overflow-y-auto bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Add Expense</h1>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <label className="block text-black font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter expense description"
              className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
            />
          </div>

          {/* Date Raised & Requested By */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                Date Raised <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dateRaised"
                value={formData.dateRaised}
                onChange={handleChange}
                placeholder="DD/MM/YYYY or DD/MM/YY"
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                Requested By <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="requestedBy"
                value={formData.requestedBy}
                onChange={handleChange}
                placeholder="e.g. John Smith"
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Initial Value & Value */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                Initial Value <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="initialValue"
                value={formData.initialValue}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                Value <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Value Receipted & Service Code */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                Value Receipted <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="valueReceipted"
                value={formData.valueReceipted}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                Service Code <span className="text-red-500">*</span>
              </label>
              {/* <input
                type="text"
                name="serviceCode"
                value={formData.serviceCode}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              /> */}


              <Select placeholder="Service Code "
                value={selectedOption}
                className="w-full text-black rounded-xl  py-2  mb-4"

                onChange={(selected) => handleChangeselect('serviceCode', selected)}

                options={option_two}
              />

            </div>
          </div>

          {/* Capex/Opex & Vendor */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                Capex / Opex
              </label>
              <select
                name="capexOpex"
                value={formData.capexOpex}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="">Select type</option>
                <option value="capex">Capex</option>
                <option value="opex">Opex</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                Vendor
              </label>
              {/* <select
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="">Select vendor</option>
                <option value="vendor1">Vendor 1</option>
                <option value="vendor2">Vendor 2</option>
                <option value="vendor3">Vendor 3</option>
              </select> */}

              <Select placeholder="Vendor "
                value={selectOptionTwo}
                className="w-full text-black rounded-xl  py-2  mb-4"

                onChange={(selected) => handleChangeselect_Two('vendor', selected)}

                options={options}
              />


            </div>
          </div>

          {/* PO Number & Req Number */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                PO Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="poNumber"
                value={formData.poNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-black font-medium mb-2">
                Req Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="reqNumber"
                value={formData.reqNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => handleCancel()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save
            </button>      </div>
        </div>
      </div>
    </div>
  );
}