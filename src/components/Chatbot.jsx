import { Globe, Mic, MicOff, Trash2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ChatBot({ t, language, setLanguage }) {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [selectedChats, setSelectedChats] = useState([]);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  const recognitionRef = useRef(null);

  // 🔠 Detect if Hindi or English
  const detectLanguage = (text) => (/[\u0900-\u097F]/.test(text) ? "hi" : "en");

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === "hi" ? "hi-IN" : "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);
      recognition.onresult = (e) => handleVoiceMessage(e.results[0][0].transcript);

      recognitionRef.current = recognition;
    }
  }, [language]);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("chatSessions"));
      if (saved?.chats?.length) {
        setChats(saved.chats);
        setActiveChatId(saved.activeChatId || saved.chats[0].id);
      } else {
        createInitialChat();
      }
    } catch {
      createInitialChat();
    }
  }, []);


  const createInitialChat = () => {
    const firstChat = {
      id: Date.now().toString(),
      title: "Farming Chat",
      messages: [
        {
          sender: "bot",
          text: "👋 Namaste! I’m your Farming Assistant. Ask me about crops, soil, weather, or government schemes!",
          time: new Date().toLocaleTimeString(),
        },
      ],
    };
    setChats([firstChat]);
    setActiveChatId(firstChat.id);
  };

  // 💾 Save chats + Auto-scroll
  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify({ chats, activeChatId }));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chats, activeChatId]);

  const currentChat = chats.find((c) => c.id === activeChatId);

  const addMessage = (sender, text) => {
    const msg = { sender, text, time: new Date().toLocaleTimeString() };
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, msg] }
          : chat
      )
    );
  };

  // Send message to backend
  const sendMessage = async (text = input) => {
    if (!text.trim()) return;
    setInput("");
    addMessage("user", text);
    setLoading(true);

    const detectedLang = detectLanguage(text);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, lang: detectedLang }),
      });

      const data = await res.json();
      const botReply = data.text || "⚠️ No response received.";
      addMessage("bot", botReply);
    } catch {
      addMessage("bot", "Unable to connect to the server. Try again later.");
    }
    setLoading(false);
  };

  // Handle voice message
  const handleVoiceMessage = (transcript) => {
    // addMessage("user", `🎤 ${transcript}`);
    sendMessage(`🎤 ${transcript}`);
  };

  // Speak
  const speak = (text, index) => {
    if (!("speechSynthesis" in window)) return;
    if (speakingIndex === index && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = detectLanguage(text) === "hi" ? "hi-IN" : "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  // Toggle mic
  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    if (listening) recognitionRef.current.stop();
    else recognitionRef.current.start();
  };

  // New chat
  const newChat = () => {
    const chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      messages: [
        {
          sender: "bot",
          text: "🌱 New chat started! What would you like to ask about farming?",
          time: new Date().toLocaleTimeString(),
        },
      ],
    };
    setChats((prev) => [...prev, chat]);
    setActiveChatId(chat.id);
  };

  // Select / Deselect chats
  const toggleSelectChat = (chatId) =>
    setSelectedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId]
    );

  // Delete selected chats
  const deleteSelectedChats = () => {
    if (selectedChats.length === 0)
      return toast.info("Please select chat(s) to delete.");

    const updated = chats.filter((c) => !selectedChats.includes(c.id));
    setChats(updated);
    if (selectedChats.includes(activeChatId))
      setActiveChatId(updated[0]?.id || null);
    setSelectedChats([]);
  };

  // Clear current chat
  const clearChat = () => {
    if (!activeChatId) return;
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              messages: [
                {
                  sender: "bot",
                  text: "🧹Chat cleared!",
                  time: new Date().toLocaleTimeString(),
                },
              ],
            }
          : c
      )
    );
  };

  // ================= UI =================
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r flex flex-col">
        <div className="p-3 border-b flex justify-between items-center">
          <button
            onClick={newChat}
            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
          >
            ＋ New
          </button>
          <button
            onClick={deleteSelectedChats}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm flex items-center gap-1"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 flex items-center justify-between cursor-pointer ${
                chat.id === activeChatId ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
            >
              <div
                onClick={() => setActiveChatId(chat.id)}
                className="flex-1 truncate text-sm"
              >
                {chat.title}
              </div>
              <input
                type="checkbox"
                checked={selectedChats.includes(chat.id)}
                onChange={() => toggleSelectChat(chat.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-3 bg-blue-600 text-white flex justify-between items-center">
          <h2 className="font-semibold">{t.titleChatbot}</h2>
          <div className="flex gap-2 items-center">
            <Globe className="w-5 h-5" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent outline-none text-black rounded px-1"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
            <button
              onClick={() => navigate("/")}
              className="bg-white text-blue-600 px-2 py-1 rounded text-sm"
            >
              {t.home}
            </button>
            <button
              onClick={clearChat}
              className="bg-white text-blue-600 px-2 py-1 rounded text-sm"
            >
              {t.clear}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
          {currentChat?.messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[75%]">
                <span
                  className={`px-3 py-2 rounded-xl block break-words ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
                <small className="text-xs text-gray-500 ml-2">{msg.time}</small>
              </div>
              {msg.sender === "bot" && (
                <button
                  onClick={() => speak(msg.text, i)}
                  className={`ml-2 text-xs px-2 py-1 rounded transition ${
                    speakingIndex === i
                      ? "bg-red-400 text-white animate-pulse"
                      : "bg-gray-300 text-black"
                  }`}
                  title={speakingIndex === i ? "Stop Speaking" : "Speak"}
                >
                  {speakingIndex === i ? "⏹️" : "🔊"}
                </button>
              )}
            </div>
          ))}
          {loading && <p className="text-center">💬 Thinking...</p>}
          {listening && (
            <p className="text-center text-blue-600 animate-pulse">
              🎤 Listening...
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex p-3 gap-2 border-t bg-white items-center">
          <button
            onClick={toggleVoice}
            className={`p-2 rounded-full ${
              listening ? "bg-red-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {listening ? <MicOff /> : <Mic />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type or speak your question..."
            className="flex-1 border rounded-xl px-3 py-2 text-sm"
          />
          <button
            onClick={() => sendMessage()}
            className="bg-blue-600 text-white px-3 py-2 rounded-xl"
          >
            {t.send}
          </button>
        </div>
      </div>
    </div>
  );
}
