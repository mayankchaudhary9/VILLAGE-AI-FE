// pages/ChatbotPage.jsx
import React from "react";
import { Globe } from "lucide-react";
import ChatBot from "../components/Chatbot";

export default function ChatbotPage({ t, language, setLanguage }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen">
        <ChatBot t={t} language={language} setLanguage={setLanguage} />
      </div>
    </div>
  );
}
