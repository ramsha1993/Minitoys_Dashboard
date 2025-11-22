import { useState } from 'react';

export default function ReportsDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [reports, setReports] = useState([]);
  const [modaltwo, setmodaltwo] = useState(false);
  const [customTypeName, setCustomTypeName] = useState('');
  const [formData, setFormData] = useState({
    reportName: '',
    reportType: 'Budget',
    department: '',
    fromDate: '',
    toDate: '',
    frequency: 'On Demand',
    delivery: 'Email',
    owner: '',
    includeCharts: true,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
    const handleTypeCancel = () => {
    setmodaltwo(false);
    setCustomTypeName('');
  };
   const handleSaveType = () => {
    if (customTypeName.trim()) {
      setmodaltwo(false);
      setCustomTypeName('');
    }
  };

  const handleSaveReport = () => {
    if (formData.reportName.trim()) {
      const newReport = {
        id: Date.now(),
        ...formData,
        lastRun: '—'
      };
      setReports(prev => [...prev, newReport]);
      setShowModal(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      reportName: '',
      reportType: 'Budget',
      department: '',
      fromDate: '',
      toDate: '',
      frequency: 'On Demand',
      delivery: 'Email',
      owner: '',
      includeCharts: true,
      description: ''
    });
  };

  const handleCancel = () => {
    setShowModal(false);
    resetForm();
  };

  const activeSchedules = reports.filter(r => r.frequency !== 'On Demand').length;

  return (
    <div className="min-h-screen   p-8">
      <div className="max-w-5xl  mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className=" border border-slate-800 rounded-lg p-6">
            <div className="text-slate-400 text-lg mb-2">Reports Configured</div>
            <div className="text-5xl font-bold">{reports.length}</div>
          </div>
          <div className=" border border-slate-800 rounded-lg p-6">
            <div className="text-slate-400 text-lg mb-2">Scheduled Reports</div>
            <div className="text-5xl font-bold">{activeSchedules} <span className="text-2xl font-normal">active schedules</span></div>
          </div>
          <div className=" border border-slate-800 rounded-lg p-6">
            <div className="text-slate-400 text-lg mb-2">Last Report Ran</div>
            <div className="text-5xl font-bold">—</div>
          </div>
        </div>

        {/* Saved Reports Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Saved Reports</h2>
          <div className="flex gap-4">
            <button className="border   px-6 py-2 rounded-lg  hover:bg-zinc-100 transition-colors" 
            onClick={()=>setmodaltwo(true)}>
              New Report Type
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <span className="text-xl">+</span> New Report
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className=" border  rounded-lg  mb-6">
          <table className="w-full">
            <thead className=" border-b border-slate-700">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Report name</th>
                <th className="text-left px-6 py-4 font-semibold">Type</th>
                <th className="text-left px-6 py-4 font-semibold">Frequency</th>
                <th className="text-left px-6 py-4 font-semibold">Last Run</th>
                <th className="text-left px-6 py-4 font-semibold">Owner</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-400">
                    No reports configured yet
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="border-b border-slate-800 hover:">
                    <td className="px-6 py-4">{report.reportName}</td>
                    <td className="px-6 py-4">{report.reportType}</td>
                    <td className="px-6 py-4">{report.frequency}</td>
                    <td className="px-6 py-4">{report.lastRun}</td>
                    <td className="px-6 py-4">{report.owner || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Info Banner */}
        <div className=" bg-opacity-20 border  rounded-lg p-4 flex items-start gap-3">
         
          <p className="">
            Reports are generated from live Budgets, CapEx, Projects, Costs, Departments, Users and Timesheets (for the Time sheet report type).
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[99999] backdrop-blur-sm flex items-center justify-center p-4  ">
          <div className=" shadow-lg bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
            <div className="overflow-y-auto max-h-[90vh] p-6">
              <h2 className="text-2xl font-bold mb-6">New report</h2>

              {/* Report Name */}
              <div className="mb-4">
                <label className="block text-sm  mb-2">Report name</label>
                <input
                  type="text"
                  name="reportName"
                  value={formData.reportName}
                  onChange={handleChange}
                  placeholder="e.g. Monthly Spend Overview"
                  className="w-full  border border-slate-700  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                />
              </div>

              {/* Report Type */}
              <div className="mb-4">
                <label className="block text-sm  mb-2">Report type</label>
                <select
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleChange}
                  className="w-full  border border-slate-700  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Budget</option>
                  <option>CapEx</option>
                  <option>Projects</option>
                  <option>Costs</option>
                  <option>Timesheet</option>
                </select>
              </div>

              {/* Department */}
              <div className="mb-4">
                <label className="block text-sm  mb-2">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full  border border-slate-700  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  <option>Engineering</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Operations</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm  mb-2">From date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    className="w-full  border border-slate-700  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm  mb-2">To date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    className="w-full  border border-slate-700  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div className="mb-4">
                <label className="block text-sm  mb-2">Frequency</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full  border border-slate-700  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>On Demand</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>

              {/* Delivery */}
              <div className="mb-4">
                <label className="block text-sm  mb-2">Delivery</label>
                <select
                  name="delivery"
                  value={formData.delivery}
                  onChange={handleChange}
                  className="w-full  border border-slate-700  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Email</option>
                  <option>Slack</option>
                  <option>Dashboard</option>
                </select>
              </div>

              {/* Owner */}
              <div className="mb-4">
                <label className="block text-sm  mb-2">Owner</label>
                <select
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  className="w-full  border border-slate-700  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select owner</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Mike Johnson</option>
                </select>
              </div>

              {/* Include Charts */}
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="includeCharts"
                    checked={formData.includeCharts}
                    onChange={handleChange}
                    className="w-5 h-5 bg-blue-600 border-2 border-blue-600 rounded checked:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="">Include charts</span>
                </label>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm  mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full  border border-slate-700  px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 text-black border hover:bg-zinc-100 rounded-lg transition-colors flex items-center gap-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveReport}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                 Save Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        {modaltwo && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="shadow-lg bg-white  rounded-xl w-full max-w-xl p-8">
            <h2 className="text-3xl font-medium  mb-6">Create Custom Report Type</h2>
            
            <input
              type="text"
              value={customTypeName}
              onChange={(e) => setCustomTypeName(e.target.value)}
              placeholder="Enter type name"
              className="w-full  border   placeholder-slate-400 px-4 py-2 rounded-lg focus:outline-none  mb-6 text-lg"
            />

            <div className="flex gap-4 justify-end">
              <button
                onClick={handleTypeCancel}
                className="px-4 py-2  shadow-sm hover:bg-zinc-100 hover:bg-opacity-10 rounded-lg transition-colors text-lg "
              >
                Cancel
              </button>
              <button
                onClick={handleSaveType}
                className="bg-blue-600 hover:bg-blue-500 text-white shadow-sm px-4 py-2 rounded-lg transition-colors text-lg "
              >
                Save Type
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}