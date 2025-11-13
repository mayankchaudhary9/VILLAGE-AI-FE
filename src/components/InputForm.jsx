import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function InputForm({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error = "",
  showPasswordToggle = false,
  showPassword = false,
  togglePassword,
  readOnly = false,
  className = "",
}) {
  return (
    <div className="mb-4 text-left">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base"
      >
        {label}
      </label>

      {/* Input Container */}
      <div
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus-within:ring-2 transition flex items-center ${
          error
            ? "border-red-400 focus-within:ring-red-300"
            : "border-gray-300 focus-within:ring-blue-500"
        } ${className}`}
      >
        <input
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={`w-full outline-none bg-transparent text-sm sm:text-base ${
            readOnly ? "cursor-not-allowed text-gray-500" : ""
          }`}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePassword}
            className="cursor-pointer text-gray-600 hover:text-gray-800 ml-2"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-xs sm:text-sm mt-1">{error}</div>
      )}
    </div>
  );
}

export default InputForm;
