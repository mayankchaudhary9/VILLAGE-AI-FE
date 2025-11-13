import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearRegisterSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Globe } from "lucide-react";
import InputForm from "../components/InputForm";

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

  const [inputError, setInputError] = useState({});
  const [highlightFields, setHighlightFields] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Autofill city/state via pincode
  useEffect(() => {
    const fetchLocation = async () => {
      if (formData.pincode.length === 6) {
        try {
          const res = await fetch(
            `https://api.postalpincode.in/pincode/${formData.pincode}`
          );
          const data = await res.json();

          if (data[0].Status === "Success") {
            const office = data[0].PostOffice[0];
            setFormData((prev) => ({
              ...prev,
              city: office.District,
              state: office.State,
            }));
            setHighlightFields(["city", "state"]);
            setTimeout(() => setHighlightFields([]), 1000);
          } else {
            setFormData((prev) => ({ ...prev, city: "", state: "" }));
            toast.error("Invalid Pincode");
          }
        } catch {
          toast.error("Failed to fetch location");
        }
      }
    };

    fetchLocation();
  }, [formData.pincode]);

  // Validation
  const validateInputs = () => {
    const errors = {};
    const { name, phone, aadhaar, pincode, password, confirmPassword } =
      formData;

    const pincodeRegex = /^[0-9]{6}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const aadhaarRegex = /^[0-9]{12}$/;
    const pwdRegex = /^[0-9]{6,}$/;

    if (!name.trim()) errors.name = "Name is required";
    else if (name.length < 2) errors.name = "Name must have at least 2 chars";

    if (!phone.trim()) errors.phone = "Phone number is required";
    else if (!phoneRegex.test(phone))
      errors.phone = "Enter a valid 10-digit phone number";

    if (aadhaar && !aadhaarRegex.test(aadhaar))
      errors.aadhaar = "Enter a valid 12-digit Aadhaar number";

    if (!pincode.trim()) errors.pincode = "Pincode is required";
    else if (!pincodeRegex.test(pincode))
      errors.pincode = "Enter a valid 6-digit pincode";

    if (!password) errors.password = "Password is required";
    else if (!pwdRegex.test(password))
      errors.password = "Password must have at least 6 digits";

    if (!confirmPassword) errors.confirmPassword = "Confirm password required";
    else if (password !== confirmPassword)
      errors.confirmPassword = "Passwords must match";

    setInputError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (registerSuccess) {
      dispatch(clearRegisterSuccess());
      navigate("/login");
    }
  }, [registerSuccess, dispatch, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      toast.error("Please check your details");
      return;
    }
    toast.success("Register Successful");
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 md:px-10 py-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
            {t.register}
          </h2>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-2 mt-3 sm:mt-0">
            <Globe className="w-4 h-4 text-gray-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent outline-none font-medium text-gray-700 cursor-pointer text-sm sm:text-base"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <InputForm
            label={`${t.name} *`}
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleOnChange}
            error={inputError.name}
          />

          <InputForm
            label={t.aadhaar}
            name="aadhaar"
            placeholder="Enter your Aadhaar number"
            value={formData.aadhaar}
            onChange={handleOnChange}
            error={inputError.aadhaar}
          />

          <InputForm
            label={`${t.phone} *`}
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleOnChange}
            error={inputError.phone}
          />

          <InputForm
            label={`${t.pincode} *`}
            name="pincode"
            placeholder="Enter your pincode"
            value={formData.pincode}
            onChange={handleOnChange}
            error={inputError.pincode}
          />

          <InputForm
            label={t.city}
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleOnChange}
            readOnly
            className={
              highlightFields.includes("city")
                ? "border-blue-500 ring-2 ring-blue-400 bg-blue-50"
                : ""
            }
          />

          <InputForm
            label={t.state}
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleOnChange}
            readOnly
            className={
              highlightFields.includes("state")
                ? "border-blue-500 ring-2 ring-blue-400 bg-blue-50"
                : ""
            }
          />

          <InputForm
            label={`${t.password} *`}
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleOnChange}
            error={inputError.password}
            showPasswordToggle
            showPassword={showPassword}
            togglePassword={() => setShowPassword((prev) => !prev)}
          />

          <InputForm
            label={`${t.confirmPassword} *`}
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleOnChange}
            error={inputError.confirmPassword}
            showPasswordToggle
            showPassword={showConfirmPassword}
            togglePassword={() => setShowConfirmPassword((prev) => !prev)}
          />

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 transition mt-2 text-sm sm:text-base"
            >
              {loading ? "Registering..." : t.signUp}
            </button>
          </div>
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
