import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Globe } from "lucide-react";

function LoginPage({ t, language, setLanguage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [inputError, setInputError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    
    if (user) {
      toast.success("Login successful");
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" })); // clear error while typing
  };

  const validateInputs = () => {
    const errors = {};
    const phoneRegex = /^[0-9]{10}$/;


    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 4) {
      errors.password = "Password must be at least 4 characters long";
    }

    setInputError(errors);
    return Object.keys(errors).length === 0; // valid if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 md:px-10 py-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 md-p-10">

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          {t.login}
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

        <form onSubmit={handleSubmit}>

          {/* Phone Input */}
          <div className="mb-4 text-left">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              {t.phone}
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone no."
              value={formData.phone}
              onChange={handleOnChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
            />
            {inputError.phone && (
              <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.phone}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-1 text-left">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              {t.password}
            </label>
            <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 outline-none transition flex items-center">
              <input
              type={showPassword ? "text" : "password" }
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleOnChange}
              className="w-full outline-none text-sm sm:text-base"
            />
            <div onClick={()=> setShowPassword((prev) => !prev)} className="cursor-pointer">
              {
                showPassword ? <FaRegEye /> : <FaRegEyeSlash/>  
              }
            </div>
            </div>
            {inputError.password && (
              <div className="text-red-500 text-xs sm:text-sm mt-1">{inputError.password}</div>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-end text-sm sm:text-base mb-2">
            <Link
              to={"/forgot-password"}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white cursor-pointer py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 transition mt-4 text-sm sm:text-base"
          >
            {loading ? "Logging in..." : t.login}
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2 text-center text-sm sm:text-base">{error}</p>}
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
          {t.noAccount}{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline"
          >
            {t.register}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;