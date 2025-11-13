import Header from "../components/Header";
import AICard from "../components/AICard";
// import { getAICards } from "../controllers/aiCardController";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { getAICards } from "../data/aiCardData";
import SearchBar from "../components/SearchBar";

export default function HomePage({ t, language, setLanguage }) {
  const navigate = useNavigate();
  const aiCards = getAICards(t);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header t={t} language={language} setLanguage={setLanguage} />

      {/* Hero / Welcome Section
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        Hero / Welcome Section
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          {t.welcome}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          {t.subtitle}
        </p>
        <SearchBar />
      </div> */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            {t.welcome}
          </h2>
          <p className="text-lg max-w-lg leading-relaxed">{t.subtitle}</p>
          {/* <SearchBar /> */}
        </div>
        {/* Right */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://earth5r.org/wp-content/uploads/2025/07/Farming-with-Intelligence_-Integrating-IoT-AI-and-Climate-Data-into-Organic-Cultivation-ESG-CSR-EARTH5R-NGO-MUMBAI.png"
            alt=""
            className="rounded-2xl shadow-2xl object-cover w-full max-w-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* AI Knowledge Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {t.aiKnowledge}
          </h3>
          {/* <p className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-0">
            {t.exploreMore}
          </p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {aiCards.map((card, i) => (
            <AICard
              key={i}
              {...card}
              learnMore={t.learnMore}
              className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About AI Section */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl mb-16 transition-all">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              {t.aboutAI}
            </h2>
            <div className="text-base sm:text-lg text-gray-700 dark:text-gray-300 space-y-5 leading-relaxed text-left">
              <p>{t.aboutAIPoint1}</p>
              <p>{t.aboutAIPoint2}</p>
              <p>{t.aboutAIPoint3}</p>
            </div>
          </div>
        </section>

        {/* Chat With AI Floating Button */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
          <button
            onClick={() => navigate("/chatbot")}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            {t.chatWithAI}
          </button>

          {/* <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
            {t.learnAI}
          </p> */}
        </div>
      </div>
    </div>
  );
}
