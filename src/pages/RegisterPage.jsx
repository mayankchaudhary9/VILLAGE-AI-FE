import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearRegisterSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Globe } from "lucide-react";


function RegisterPage({ t, language, setLanguage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, registerSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const [inputError, setInputError] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [highlightFields, setHighlightFields] = useState([]);



  // Auto-fill city and states 
  useEffect(() => {
    const fetchLocation = async () => {
      if(formData.pincode.length === 6) {
        try{
          const res = await fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`);
          
          const data = await res.json();

          if(data[0].Status === "Success") {
            const office = data[0].PostOffice[0];
            setFormData((prev) => ({
              ...prev,
              city: office.District,
              state: office.State,
            }));
           setHighlightFields(["city", "state"]);

            setTimeout(() => {
              setHighlightFields([]);
            }, 1000);

          }else {
            setFormData((prev) => ({
              ...prev,
              city: "",
              state: ""
            }));
            toast.error("Invalid Pincode");
          }
        }catch (err) {
          toast.error("Failed to fetch location")

        }
      }
    }

    fetchLocation();
  },[formData.pincode]);
  
  const inputValidation = () => {
    const errors = {};

    const name = formData?.name?.trim() ?? "";
    const phone = formData?.phone?.trim() ?? "";
    const aadhaar = formData?.aadhaar?.trim() ?? "";
    const pincode = formData?.pincode?.trim() ?? "";
    // const city = formData?.city?.trim() ?? "";
    // const state = formData?.state?.trim() ?? "";
    const password = formData?.password ?? "";
    const confirmPassword = formData?.confirmPassword ?? "";

    const pincodeRegex = /^[0-9]{6}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const aadhaarRegex = /^[0-9]{12}$/;
    const pwdRegex = /^[0-9]+$/;

    if (!name) {
      errors.name = "Name is required";
    } else if (name.length < 2) {
      errors.name = "Name should have at least 2 characters";
    }

    if (!phone) {
      errors.phone = "Phone is required";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Enter a valid phone number";
    }

    if (aadhaar && !aadhaarRegex.test(aadhaar)) {
      errors.aadhaar = "Enter a valid 12-digit Aadhaar number";
    }

    if(!pincode) {
      errors.pincode = "Pincode is required";
    }else if (!pincodeRegex.test(pincode)) {
      errors.pincode = "please enter a valid pincode"
    }

    // if(pincode && !city) {
    //   errors.city = "Please provide city name";
    // }

    // if(pincode && !state) {
    //   errors.state = "Please provide state name";
    // }

    if (!password) {
      errors.password = "Password is required";
    } else if (!pwdRegex.test(password)) {
      errors.password = "Please enter atleast 6 digit password";
    }

    if (password && !confirmPassword) {
      errors.confirmPassword = "confirmPassword is required";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "password and confirmPassword must be same";
    }

    setInputError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (registerSuccess) {
      dispatch(clearRegisterSuccess());
      navigate("/login");
    }
  }, [registerSuccess, dispatch, navigate]);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = inputValidation();

    if (!isValid) {
      toast.error("Please check the details.");
      return;
    }

    toast.success("Register Successful");
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 md:px-10 py-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl w-full font-bold text-gray-800 text-center sm:text-left">
          {t.register}
        </h2>
        {/* Language Selector */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-2 mt-3 sm:mt-0">
          <Globe className="w-4 h-4 text-gray-600" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent outline-none font-medium text-gray-700 cursor-pointer text-sm sm:text-base "
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Name */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                {t.name} *
              </label>
              <input
                type="text"
                name="name"
                autoFocus
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleOnChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              />
              {inputError.name && <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.name}</div>}
            </div>

            {/* Aadhaar */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                {t.aadhaar}
              </label>
              <input
                
                type="text"
                name="aadhaar"
                placeholder="Enter your addhaar no."
                value={formData.aadhaar}
                onChange={handleOnChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              />
              {inputError.aadhaar && <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.aadhaar}</div>}
            </div>

            {/* Phone */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                {t.phone} *
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone no."
                value={formData.phone}
                onChange={handleOnChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              />
              {inputError.phone && <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.phone}</div>}
            </div>

            {/* Pincode */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                {t.pincode} *
              </label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter your pincode"
                value={formData.pincode}
                onChange={handleOnChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              />
              {inputError.pincode && <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.pincode}</div>}
            </div>

            {/* City */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                {t.city}
              </label>
              <input
                type="text"
                name="city"
                placeholder="Your city name"
                value={formData.city}
                onChange={handleOnChange}
                readOnly
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg outline-none transition text-sm sm:text-base
                  ${
                    highlightFields.includes("city")
                      ? "border-blue-500 ring-2 ring-blue-400 bg-blue-50"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
              />
              {inputError.city && <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.city}</div>}
            </div>

            {/* State */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                {t.state}
              </label>
              <input
                type="text"
                name="state"
                placeholder="Your state name"
                value={formData.state}
                onChange={handleOnChange}
                readOnly
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg outline-none transition text-sm sm:text-base
                  ${
                    highlightFields.includes("state")
                      ? "border-blue-500 ring-2 ring-blue-400 bg-blue-50"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
              />
              {inputError.state && <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.state}</div>}
            </div>


            {/* Password */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                {t.password} *
              </label>
              <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition flex items-center">
                <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleOnChange}
                className="w-full outline-none text-sm sm:text-base"
              />
              <div onClick={() => setShowPassword((prev) => !prev )} className="cursor-pointer" >
                {showPassword ? <FaRegEye />: <FaRegEyeSlash />}
              </div>
              </div>
              {inputError.password && <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className="mb-4 text-left">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                {t.confirmPassword } *
              </label>
              <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition flex items-center">
                <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter your password"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                className="w-full outline-none text-sm sm:text-base"
              />
              <div onClick={() => setShowConfirmPassword((prev) => !prev )} className="cursor-pointer" >
                {showConfirmPassword ? <FaRegEye />: <FaRegEyeSlash />}
              </div>
              </div>
              {inputError.confirmPassword && <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.confirmPassword}</div>}
            </div> 

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 transition mt-6 text-sm sm:text-base"
          >
            {loading ? "Registering..." : t.signUp}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          {t.haveAccount}{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
          >
            {t.login}
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;