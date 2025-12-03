import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useOutletContext } from "react-router-dom";

export default function SearchPage() {
  const { t, language, setLanguage } = useOutletContext();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header t={t} language={language} setLanguage={setLanguage} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* Hero / Welcome Section */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Search AI uses in Villages..
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Let's explore where we can use AI in villages different sector like in
          farmng, crops, dairy, education, health, and energy etc...
        </p>
        <SearchBar />
      </div>
    </div>
  );
}
