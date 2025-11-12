import { Globe, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Header({ t, language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth); 

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logout successful")
    navigate("/login", { replace: true });
  };


 return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* App Name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <Link to="/">{t.appName}</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent outline-none font-medium text-gray-700 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          {/* Chatbot Button */}
          <button
            onClick={() => navigate("/chatbot")}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition cursor-pointer"
          >
            {t.chatbot}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition cursor-pointer"
          >
            {t.logout}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col items-start px-4 py-3 space-y-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 w-full">
              <Globe className="w-5 h-5 text-gray-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent outline-none font-medium text-gray-700 cursor-pointer w-full"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>

            {/* Chatbot */}
            <button
              onClick={() => {
                navigate("/chatbot");
                setMenuOpen(false);
              }}
              className="w-full text-left bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition"
            >
              {t.chatbot}
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              disabled={loading}
              className="w-full text-left bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition"
            >
              {t.logout}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

