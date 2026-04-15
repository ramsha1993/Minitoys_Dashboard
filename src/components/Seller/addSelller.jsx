import { useEffect, useState } from "react";
import api from "../../api/axiosinterceptor";
import ENDPOINTS from "../../utils/ENDPOINTS";
import { useNavigate, useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";



const STATUS_OPTIONS = ["Active", "Pending", "Suspended"];

const inputCls =
  "w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition placeholder-gray-300";

function Card({ title, children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-5 last:mb-0">
      {title && (
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-4">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="mb-4 last:mb-0">
      {label && <label className="block text-sm text-gray-500 mb-1">{label}</label>}
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function UploadBox({ label, hint, onUpload, preview, height = "h-24", name }) {
  return (
    <Field label={label} hint={hint}>
      <label
        className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-xl cursor-pointer transition bg-gray-50 hover:bg-gray-100 ${height} overflow-hidden`}
      >
        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer"
          name={name} onChange={onUpload} />
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-contain p-2" />
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <span className="text-xs text-gray-500">{label}</span>
          </>
        )}
      </label>
    </Field>
  );
}

export default function AddSeller({ isModalOpen, setIsModalOpen }) {

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    mobile: "",
    storeName: "",
    storeSlug: "",
    commission: "12",
    storeDetails: "",
    storeLogo: null,
    authorizedSignature: null,
    status: null
    , categories: '',
    category_commission: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [categories, setCategories] = useState();
  const [status, setStatus] = useState("Active");
  const [tags, setTags] = useState(["verified", "top-seller"]);
  const [tagInput, setTagInput] = useState("");
  const [notes, setNotes] = useState("");
  const [sigPreview, setSigPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const { id } = useParams()
  // Alias so existing JSX references to `form.*` keep working
  const form = formValues;

  const navigate = useNavigate()


  // const token = Cookies.get("authToken")
  const FetchCategory = async () => {
    const response = await api.get({ url: `${ENDPOINTS.OTHER.CATEGORY}/all` })
    console.log("response", response.categories)
    setCategories(response.categories)
    // }
  }
  useEffect(() => {

    FetchCategory()
  }, [])


  const FetchData = async () => {
    const response = await api.get({ url: `${ENDPOINTS.OTHER.USERS}/${id}` })
    console.log("response ", response);
    const data = response.user
    console.log("Data", data)
    setFormValues({
      name: data.name,
      email: data.email,
      status: data.status,
      mobile: data.seller.mobile,
      authorizedSignature: data.seller.authorized_signature,
      storeLogo: data.seller.store.store_logo,
      storeDetails: data.seller.store.store_details,
      storeName: data.seller.store.store_name,
      storeSlug: data.seller.store.store_slug,
    })
    setLogoPreview(`${import.meta.env.VITE_BASEURL
      }/${data.seller.store.store_logo}`)
    setSigPreview(`${import.meta.env.VITE_BASEURL
      }/${data.seller.authorized_signature}`)

  }

  useEffect(() => {

    if (id) {
      FetchData()
    }
  }, [id])






  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      console.log("name", name, file)
      if (name === "storeLogo") setLogoPreview(previewUrl);
      if (name === "authorizedSignature") setSigPreview(previewUrl);
      console.log("name", name, file)
      setFormValues((prev) => ({ ...prev, [name]: file }));
      return;
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const toggleCategory = (cat) =>
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const addTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.replace(",", "").trim();
      if (val && !tags.includes(val)) setTags((t) => [...t, val]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => setTags((t) => t.filter((x) => x !== tag));

  const initials = form.name
    .split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const handleSubmit = async () => {
    try {

      console.log("categories", formValues.categories)
      const formData = new FormData()


      formData.append("name", form.name)
      formData.append("email", form.email)
      formData.append("address", form.address)
      formData.append("commission", form.commission)
      formData.append("store_name", form.storeName)
      formData.append("role", "vendor")
      formData.append("category_commission", form.category_commission)
      formData.append("store_slug", form.storeSlug)
      formData.append("store_details", "test")
      formData.append("categories", formValues.categories)
      formData.append("status", form.status)
      formData.append("mobile", form.mobile)
      // ✅ append files
      formData.append("store_logo", form.storeLogo)
      formData.append("authorized_signature", form.authorizedSignature)
      if (!id) formData.append("password", form.password)

      // ✅ await the response

      if (id) {
        const res = await api.put({
          url: `${ENDPOINTS.OTHER.USERS}/${id}`,
          data: formData
        })


        console.log("res", res)
        if (res.success) {
          toast.success("Seller Updated Successfully");
          navigate('/')

        }

      }


      else {
        const response = await api.post({
          url: `${ENDPOINTS.OTHER.USERS}/new`,
          data: formData
        })
        if (response.success) {
          toast.success("Seller Created Successfully");

        }
        console.log("response", response)
        navigate('/')

      }


    }

    catch (error) {
      console.log("Error", error)
      toast.error(error?.message || "Something went wrong. Please try again!");

    }
  }






  return (
    <div className="min-h-screen font-sans">

      {/* Topbar */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <span>Sellers</span><span>›</span>
          <span className="text-gray-800 font-medium">Add seller</span>
        </nav>
        <div className="flex gap-2">
          <button type="button" className="text-sm px-4 py-1.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition" onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</button>
          <button type="button" className="text-sm px-4 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition">Save draft</button>
          <button type="button" className={`text-sm px-4 py-1.5 rounded-xl ${id ? "bg-green-500  hover:bg-green-400" : "bg-blue-600  hover:bg-blue-500"} text-white font-medium transition`} onClick={handleSubmit}>{id ? "Update Seller" : "Create seller"}</button>
        </div>
      </header>



      {/* Grid */}
      <div className=" min-h-screen  max-w-5xl mx-auto px-6 py-5 grid grid-cols-1 lg:grid-cols-[1fr_256px] gap-5">

        {/* ── LEFT ── */}
        <div>

          {/* Personal Info */}
          <Card title="Personal information">
            <div className="grid grid-cols-1 gap-3">
              <Field label="Full name">
                <input name="name" value={form.name} onChange={handleChange} className={inputCls} placeholder="e.g. Sarah Mitchell" />
              </Field>
              <Field label="Mobile number">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">+</span>
                  <input name="mobile" value={form.mobile} onChange={handleChange} type="tel" className={inputCls + " pl-6"} placeholder="1 555 000 0000" />
                </div>
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Field label="Email address">
                <input name="email" value={form.email} onChange={handleChange} type="email" className={inputCls} placeholder="seller@example.com" />
              </Field>
              {!id &&
                <Field label="Password">
                  <div className="relative">
                    <input
                      name="password" value={form.password} onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      className={inputCls + " pr-10"} placeholder="Min. 8 characters"
                    />
                    <button type="button" onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        {showPassword
                          ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          : <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>
                        }
                      </svg>
                    </button>
                  </div>
                </Field>
              }
            </div>
            <UploadBox label="Authorized signature" hint="PNG with transparent background recommended" preview={sigPreview} height="h-20"
              onUpload={handleChange}
              name="authorizedSignature" />
            <Field label="Status">
              <select
                name="status"
                value={formValues.status}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">InActive</option>

              </select>
            </Field>
            <Field label="Address">
              <input name="address" value={form.address} onChange={handleChange} type="text" className={inputCls} placeholder="Address" />

            </Field>
            <Field label="Commission rate" hint="Platform fee deducted from each order">
              <div className="flex items-center gap-3">
                <input name="commission" type="number" value={form.commission} onChange={handleChange} min="0" max="100" step="0.5" className={inputCls + " flex-1"} />
                <span className="text-sm text-gray-500 whitespace-nowrap">{parseFloat(form.commission || 0).toFixed(1)}% per sale</span>
              </div>
            </Field>
          </Card>

          {/* Store Info */}
          <Card title="Store information">
            <div className="grid grid-cols-1 gap-3">
              <Field label="Store name">
                <input name="storeName" value={form.storeName} onChange={handleChange} className={inputCls} placeholder="e.g. Mitchell Goods" />
              </Field>
              <Field label="Store URL" hint={`marketplace.com/store/${form.storeSlug || "…"}`}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 pointer-events-none">store/</span>
                  <input name="storeSlug" value={form.storeSlug} onChange={handleChange} className={inputCls + " pl-11"} placeholder="mitchell-goods" />
                </div>
              </Field>
            </div>
            <UploadBox label="Store logo" hint="SVG, PNG or JPG · min 200×200px · shown on storefront" preview={logoPreview} height="h-28" onUpload={handleChange}
              name="storeLogo"
            />
          </Card>

          {/* Commission & Categories */}
          {/* <Card title="Commission & categories">

            <div className="border-t border-gray-100 pt-4 mt-1">
              {/* <Field label="Allowed categories" hint="Seller can only list products in selected categories">
                <div className="flex flex-wrap gap-2 mt-1"> */}
          {/* <Field label="Categories">
                <select
                  name="categories"
                  value={formValues.categories}
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat, index) => {
                    return (
                      <option key={index} value={cat.id}>{cat.name}</option>)
                  })}




                </select>
              </Field> */}
          {/* </Field> */}
          {/* <Field label="Commission">
                <input
                  name="category_commission"
                  value={formValues.category_commission}
                  onChange={handleChange}
                  className={inputCls}
                  type="number"
                />




              </Field> */}
          {/* </div> */}
          {/* </Card> */}
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col gap-5">

          {/* Seller Preview */}
          <Card title="Seller preview">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-800 flex-shrink-0">
                {initials || "—"}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{form.name || "Full name"}</p>
                <p className="text-xs text-gray-400">{form.email || "email@example.com"}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 flex flex-col gap-2">
              <div className="flex justify-between"><span>Store</span><span className="text-gray-800 font-medium">{form.storeName || "—"}</span></div>
              <div className="flex justify-between"><span>Commission</span><span className="text-gray-800 font-medium">{parseFloat(form.commission || 0).toFixed(1)}%</span></div>
              {/* <div className="flex justify-between"><span>Categories</span><span className="text-gray-800 font-medium">{categories.length} selected</span></div> */}
            </div>
          </Card>

          {/* Status */}
          <Card title="Account status">
            <div className="flex gap-2 mb-3">
              {STATUS_OPTIONS.map((opt) => (
                <button key={opt} type="button" onClick={() => setStatus(opt)}
                  className={`flex-1 text-xs py-2 rounded-xl border transition-all ${status === opt ? "border-gray-300 bg-gray-100 text-gray-900 font-medium" : "border-gray-100 text-gray-500 hover:bg-gray-50"}`}>
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-400">Controls whether the seller can list and sell products</p>
          </Card>

          {/* Tags */}
          <Card title="Internal tags">
            <div className="flex flex-wrap gap-1.5 p-2 border border-gray-200 rounded-xl min-h-[42px] cursor-text" onClick={() => document.getElementById("sellerTagInput").focus()}>
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-[11px] bg-gray-100 border border-gray-200 rounded-md px-2 py-1 text-gray-700">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-gray-700 leading-none">✕</button>
                </span>
              ))}
              <input id="sellerTagInput" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={addTag}
                className="text-xs outline-none bg-transparent flex-1 min-w-[60px] placeholder-gray-300 p-1" placeholder="Add tag…" />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Press Enter or comma to add</p>
          </Card>

          {/* Notes */}
          <Card title="Internal notes">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
              className={inputCls + " resize-none"} placeholder="Add any private notes about this seller…" />
          </Card>

        </div>
      </div >
      <Toaster position="bottom-right" reverseOrder={false} />

    </div >
  );
}