import React, { useEffect, useState } from 'react';
import api from '../../api/axiosinterceptor';
import ENDPOINTS from '../../utils/ENDPOINTS';
import { Update } from '../function';

export default function AddCapExForm({ edit, closeModal, fetchdata, editData }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  // Load edit data
  useEffect(() => {
    if (edit && editData) {
      setFormData({
        name: editData.name || "",
        description: editData.description || "",
      });
    }
  }, [editData]);

  // -------------------------
  // VALIDATION FUNCTION
  // -------------------------
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    // If no errors → valid
    return Object.keys(newErrors).length === 0;
  };

  // -------------------------
  // CREATE
  // -------------------------
  const handleSubmit = async () => {
    if (!validateForm()) return; // stop submit

    try {
      const response = await api.post({
        url: `${ENDPOINTS.OTHER.CAPEX_CATEGORIES}`,
        data: formData,
      });

      console.log("Capex created:", response);

      setFormData({ name: "", description: "" });
      fetchdata();
      closeModal();
    } catch (error) {
      console.error("Error creating Capex categories:", error);
    }
  };

  // -------------------------
  // UPDATE
  // -------------------------
  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      await Update(ENDPOINTS.OTHER.CAPEX_CATEGORIES, editData.id, formData);

      setFormData({ name: "", description: "" });
      fetchdata();
      closeModal();
    } catch (error) {
      console.error("Error updating Capex categories:", error);
    }
  };

  // -------------------------
  // INPUT HANDLER
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // clear error on typing
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-lg shadow-lg bg-white p-8">
        <h1 className="text-2xl font-medium mb-8">
          {edit ? "Update Capex Category" : "Add Capex Category"}
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!edit) handleSubmit();
            else handleUpdate();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category name"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm mb-2">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={closeModal}
              type="button"
              className="px-6 py-2.5 rounded-lg bg-white border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {edit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
