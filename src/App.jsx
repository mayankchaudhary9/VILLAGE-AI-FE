import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { getTranslations } from "./utils/languageUtils";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [language, setLanguage] = useState("en");
  const t = getTranslations(language);

  return (
    <>
      <Outlet context={{ t, language, setLanguage }} />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}
