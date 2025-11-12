import { ArrowLeft, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CardSection({ t, title, data }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-blue-600 font-semibold cursor-pointer hover:gap-2 transition-all mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t?.home || "Home"}
        </button>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-gray-800 mb-12 leading-tight">
          {title}
        </h1>

        {/* Cards Section */}
        <div className="space-y-12 md:space-y-16">
          {data.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image / Video Section */}
              <div className="relative w-full md:w-1/2 h-56 sm:h-72 md:h-80 lg:h-90 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* YouTube Overlay */}
                {item.youtube && (
                  <a
                    href={item.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <PlayCircle className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg hover:scale-110 transition-transform" />
                  </a>
                )}
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">
                  {item.title}
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* YouTube Button */}
                {item.youtube && (
                  <a
                    href={item.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold hover:bg-red-700 transition-colors text-sm sm:text-base"
                  >
                    <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Watch on YouTube
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
