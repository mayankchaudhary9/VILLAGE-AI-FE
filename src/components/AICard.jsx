import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AICard({ image, title, desc, learnMore, link }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 cursor-pointer group"
      onClick={() => navigate(link)}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Content overlay */}
      <div className="absolute bottom-0 p-6 text-white">
        <h4 className="text-2xl font-bold mb-1 drop-shadow-md">{title}</h4>
        <p className="text-sm text-gray-200 mb-3">{desc}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(link);
          }}
          className="flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all"
        >
          {learnMore}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
