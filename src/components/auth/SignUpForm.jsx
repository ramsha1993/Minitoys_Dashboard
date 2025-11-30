import { useState } from "react";
import { Link } from "react-router";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const formik = useFormik({
    initialValues: {
    nitialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  
  }
});
const dispatch = useDispatch();
  // --------------- Submit Handler --------
  // -------
  const handleSubmit = async (values) => {

      
    try {
//       const response = await api.post({
//         url: ENDPOINTS.AUTH.LOGIN,
//         data: {
//           email: values.email,
//           password: values.password,
//         },
//       });

const response = await axios.post("http://localhost:5000/api/signup", {
 fname:values.fname,
lname:values.lname,
email:values.email,
password:values.password,
});
      if (response) {
        console.log("Login response:", response);
        // showToast({ message: response?.message, isError: false });
        localStorage.setItem("token", response.token);
console.log("DISPATCHING TO REDUX:", {
  user: response.data.user,
  token: response.data.token
});

        dispatch(LoginUser({ user: response.data.user, token: response.data.token }));
        
        navigate("/");
        
      }
    } 
    
    
    catch (error) {
      console.log("error"+ error?.message);
      // showToast({ message: error?.message, isError: true });
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Sign Up
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to sign up!
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5 mt-6">

            {/* Full Name */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* First Name */}
              <div className="sm:col-span-1">
                <Label>
                  First Name <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="fname"
                  name="fname"
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  placeholder="Enter your first name"
                />
              </div>

              {/* Last Name */}
              <div className="sm:col-span-1">
                <Label>
                  Last Name <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="lname"
                  name="lname"
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <Label>
                Password <span className="text-error-500">*</span>
              </Label>

              <div className="relative">
                <Input
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </span>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3">
              <Checkbox
                className="w-5 h-5"
                checked={isChecked}
                onChange={(val) => setIsChecked(val)}
              />
              <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                By creating an account, you agree to the{" "}
                <span className="text-gray-800 dark:text-white/90">Terms & Conditions</span>{" "}
                and{" "}
                <span className="text-gray-800 dark:text-white">Privacy Policy</span>
              </p>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
              >
                Sign Up
              </button>
            </div>

          </div>
        </form>

        <div className="mt-5">
          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
