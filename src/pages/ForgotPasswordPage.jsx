import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearMessage,
  resetPassword,
  sendOtp,
  verifyOtp,
} from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, otpSent, otpVerified, resetSuccess } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    if (message || error) dispatch(clearMessage());
  }, [message, error, dispatch]);

  useEffect(() => {
    if (resetSuccess) {
      setTimeout(() => navigate("/login"), 1500);
    }
  }, [resetSuccess, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 md:px-10 py-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 md:p-10 transition-all duration-300 hover:shadow-indigo-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <Link
            to={"/login"}
            className="text-lg sm:text-xl text-gray-600 hover:text-blue-600 transition"
          >
            <FaArrowLeft />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">Forgot Password</h2>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-6 text-xs sm:text-sm text-gray-500">
          <span className={!otpSent ? "text-blue-600 font-semibold" : ""}>
            Step 1
          </span>
          <span
            className={
              otpSent && !otpVerified ? "text-blue-600 font-semibold" : ""
            }
          >
            Step 2
          </span>
          <span className={otpVerified ? "text-blue-600 font-semibold" : ""}>
            Step 3
          </span>
        </div>

        {/* Step 1 - Send OTP */}
        {!otpSent && (
          <>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={() => dispatch(sendOtp(phone))}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 transition mt-6 text-sm sm:text-base"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* Step 2 - Verify OTP */}
        {otpSent && !otpVerified && (
          <>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              OTP Code
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={() => dispatch(verifyOtp({ phone, otp }))}
              disabled={loading || !otp}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 transition mt-6 text-sm sm:text-base"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
              Didn’t receive the OTP?{" "}
              <button
                onClick={() => dispatch(sendOtp(phone))}
                className="text-blue-600 font-semibold hover:underline"
              >
                Resend
              </button>
            </p>
          </>
        )}

        {/* Step 3 - Reset Password */}
        {otpVerified && (
          <>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm sm:text-base"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={() => dispatch(resetPassword({ phone, newPassword }))}
              disabled={loading || !newPassword}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:scale-105 transition mt-6 text-sm sm:text-base"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs sm:text-sm mt-6">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
