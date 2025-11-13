import React, { useState } from "react";
import { getTranslations } from "./utils/languageUtils";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatbotPage from "./pages/ChatbotPage";
import { Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import CardPage from "./pages/CardPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  const [language, setLanguage] = useState("en");

  const t = getTranslations(language);

  return (
    <>
      <Routes>
        {/* protected Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <HomePage
                t={t}
                language={language}
                setLanguage={setLanguage}
              />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              {" "}
              <ChatbotPage
                t={t}
                language={language}
                setLanguage={setLanguage}
              />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/farming"
          element={
            <ProtectedRoute>
              {" "}
              <CardPage
                type="farming"
                t={t}
                language={language}
                setLanguage={setLanguage}
              />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/dairy"
          element={
            <ProtectedRoute>
              {" "}
              <CardPage
                type="dairy"
                t={t}
                language={language}
                setLanguage={setLanguage}
              />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/education"
          element={
            <ProtectedRoute>
              {" "}
              <CardPage
                type="education"
                t={t}
                language={language}
                setLanguage={setLanguage}
              />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/health"
          element={
            <ProtectedRoute>
              {" "}
              <CardPage
                type="health"
                t={t}
                language={language}
                setLanguage={setLanguage}
              />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/solar"
          element={
            <ProtectedRoute>
              {" "}
              <CardPage
                type="solar"
                t={t}
                language={language}
                setLanguage={setLanguage}
              />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/water"
          element={
            <ProtectedRoute>
              {" "}
              <CardPage
                type="water"
                t={t}
                language={language}
                setLanguage={setLanguage}
              />{" "}
            </ProtectedRoute>
          }
        />
        {/* <Route path="/search" element={<ProtectedRoute> <SearchPage type="search" t={t} language={language} setLanguage={setLanguage} /> </ProtectedRoute>} /> */}

        {/* public route */}
        <Route
          path="/login"
          element={
            <LoginPage t={t} language={language} setLanguage={setLanguage} />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage t={t} language={language} setLanguage={setLanguage} />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordPage
              t={t}
              language={language}
              setLanguage={setLanguage}
            />
          }
        />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}
