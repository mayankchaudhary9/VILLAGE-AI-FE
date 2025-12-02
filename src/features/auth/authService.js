import axios from "axios";

const API_BASE_URL = "https://village-ai.onrender.com/api/auth";

export const registerUserAPI = (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData);
};

export const loginUserAPI = (credentials) => {
  return axios.post(`${API_BASE_URL}/login`, credentials);
};

export const logoutUserAPI = (token) => {
  return axios.post(
    `${API_BASE_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Forgot Password APIs
export const sendOtpAPI = (phone) => {
  return axios.post(`${API_BASE_URL}/forgot-password/send-otp`, { phone });
};

export const verifyOtpAPI = (phone, otp) => {
  return axios.post(`${API_BASE_URL}/forgot-password/verify-otp`, {
    phone,
    otp,
  });
};

export const resetPasswordAPI = (phone, newPassword) => {
  return axios.post(`${API_BASE_URL}/forgot-password/reset`, {
    phone,
    newPassword,
  });
};
