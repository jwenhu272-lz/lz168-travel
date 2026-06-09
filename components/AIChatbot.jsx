"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AIChatbot({ language }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("male");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const messagesEndRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const recognitionRef = useRef(null);

  // UPDATED AVATAR IMAGES
  const avatars = {
    male: {
      name: "特朗普老师",
      nameEn: "Teacher Trump",
      image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/ChatRobot/Trump-Chatbot.PNG",
      greeting: "哈哈！让特朗普老师帮你安排行程！保证让你玩得开心！🇺🇸",
      greetingEn: "Haha! Let Teacher Trump help you plan your trip! Guaranteed fun! 🇺🇸",
    },
    female: {
      name: "小丽同学",
      nameEn: "Xiao Li",
      image: "https://lz108-images-1441146884.cos.ap-hongkong.myqcloud.com/ChatRobot/Sally-Chatbot.PNG",
      greeting: "你好呀！我是小丽，很高兴为你服务～🌸",
      greetingEn: "Hello! I'm Xiao Li, happy to serve you~ 🌸",
    },
  };

  const currentAvatar = avatars[selectedAvatar];

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setVoiceSupported(!!SpeechRecognition);
  }, []);

  const showNotification = (msg) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50 animate-fade-in-out';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  // Text-to-speech
  const speakResponse = (text) => {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "中文" ? "zh-CN" : "en-US";
    utterance.rate = 0.9;
    utterance.pitch = selectedAvatar === "male" ? 0.7 : 1.2;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  // Initialize speech recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      showNotification(language === "中文" ? "您的浏览器不支持语音输入" : "Your browser doesn't support voice input");
      return;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language === "中文" ? "zh-CN" : "en-US";
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      showNotification(language === "中文" ? "🎤 请说话..." : "🎤 Please speak...");
    };
    
    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      setInputValue(transcript);
      
      if (result.isFinal) {
        setIsListening(false);
        setTimeout(() => {
          if (transcript.trim()) {
            sendMessage(transcript);
          }
        }, 300);
      }
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      
      let errorMsg = language === "中文" ? "语音识别失败，请重试" : "Speech recognition failed";
      if (event.error === 'not-allowed') {
        errorMsg = language === "中文" ? "请允许麦克风权限" : "Please allow microphone access";
      } else if (event.error === 'no-speech') {
        errorMsg = language === "中文" ? "没有检测到声音，请重试" : "No speech detected";
      }
      showNotification(errorMsg);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  // Load conversation history
  useEffect(() => {
    const savedMessages = localStorage.getItem("ai_chat_history");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {}
    } else {
      setMessages([
        {
          id: Date.now(),
          role: "assistant",
          content: language === "中文" 
            ? `你好！我是${currentAvatar.name} 🤖\n\n🎤 点击🎤按钮说话，或点击下方按钮快速提问：\n\n• 推荐辣的食物\n• 300元以下的酒店\n• 规划2日游\n• 推荐螺蛳粉`
            : `Hello! I'm ${currentAvatar.nameEn} 🤖\n\n🎤 Click 🎤 to speak, or tap buttons below:\n\n• Spicy food\n• Hotel under ¥300\n• 2-day trip\n• Best Luosifen`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [language, currentAvatar.name]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("ai_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleAvatar = () => {
    setSelectedAvatar(selectedAvatar === "male" ? "female" : "male");
  };

  // Quick actions
  const quickActions = [
    { id: "spicy", label: "🌶️ 推荐辣的食物", labelEn: "🌶️ Spicy food", query: "推荐辣的食物" },
    { id: "hotel", label: "🏨 300元以下酒店", labelEn: "🏨 Hotel under ¥300", query: "300元以下的酒店" },
    { id: "trip", label: "🗺️ 规划2日游", labelEn: "🗺️ 2-day trip", query: "规划2日游" },
    { id: "luosifen", label: "🍜 推荐螺蛳粉", labelEn: "🍜 Best Luosifen", query: "推荐螺蛳粉" },
  ];

  // Knowledge base
  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes("辣") || msg.includes("spicy")) {
      return language === "中文"
        ? `🌶️ 推荐辣味美食：\n\n• 现煮螺蛳粉 - ¥18 (招牌)\n• 麻辣烫套餐 - ¥35\n• 柳州炒螺 - ¥25\n• 青云烤串 - ¥15\n\n要试试哪个？`
        : `🌶️ Spicy food:\n\n• Fresh Luosifen - ¥18\n• Mala Tang - ¥35\n• Fried Snails - ¥25\n• BBQ Skewers - ¥15\n\nWhich one?`;
    }

    if (msg.includes("螺蛳粉") || msg.includes("luosifen")) {
      return language === "中文"
        ? `🍜 螺蛳粉推荐：\n\n• 现煮螺蛳粉 - ¥18 (青云螺蛳粉总店) ⭐4.9\n• 干捞螺蛳粉 - ¥20\n• 螺蛳鸭脚煲 - ¥48\n• 螺蛳粉礼盒装 - ¥68 (全国配送)`
        : `🍜 Luosifen recommendations:\n\n• Fresh Luosifen - ¥18 ⭐4.9\n• Dry Luosifen - ¥20\n• Duck Feet Pot - ¥48\n• Gift Box - ¥68`;
    }

    if (msg.includes("甜品") || msg.includes("dessert")) {
      return language === "中文"
        ? `🍰 甜品推荐：\n\n• 青云豆腐花 - ¥8\n• 甘蔗汁 - ¥8\n• 酸梅汤 - ¥6\n• 玉米汁 - ¥10`
        : `🍰 Dessert:\n\n• Tofu Pudding - ¥8\n• Sugarcane Juice - ¥8\n• Sour Plum - ¥6\n• Corn Juice - ¥10`;
    }

    const budgetMatch = msg.match(/(\d+)/);
    if (budgetMatch && (msg.includes("酒店") || msg.includes("hotel"))) {
      const budget = parseInt(budgetMatch[1]);
      if (budget >= 300) {
        return language === "中文"
          ? `🏨 ${budget}元预算：\n\n• 青云精品酒店 - ¥398/晚 ⭐4.8\n• 柳州万豪酒店 - ¥888/晚 ⭐4.9`
          : `🏨 Hotels under ¥${budget}:\n\n• Qingyun Boutique - ¥398 ⭐4.8\n• Liuzhou Marriott - ¥888 ⭐4.9`;
      } else {
        return language === "中文"
          ? `🏨 ${budget}元预算：\n\n• 柳州宾馆 - ¥228/晚 ⭐4.5\n• 青云客栈 - ¥188/晚 ⭐4.6\n• 柳州快捷酒店 - ¥128/晚 ⭐4.2`
          : `🏨 Hotels under ¥${budget}:\n\n• Liuzhou Hotel - ¥228 ⭐4.5\n• Qingyun Inn - ¥188 ⭐4.6\n• Express Hotel - ¥128 ⭐4.2`;
      }
    }

    if (msg.includes("规划") || msg.includes("day") || msg.includes("日")) {
      return language === "中文"
        ? `🗺️ 柳州2日游：\n\n📅 第1天：青云景区 + 螺蛳粉 + 夜景\n📅 第2天：柳江游船 + 青云酒店\n💰 预算约 ¥800-1000`
        : `🗺️ 2-day Liuzhou:\n\nDay 1: Qingyun + Luosifen + Night\nDay 2: Cruise + Hotel\n💰 Budget ~¥800-1000`;
    }

    if (msg.includes("订单") && user) {
      return language === "中文"
        ? `📋 点击底部「我的」→「我的订单」查看订单`
        : `📋 Click "Profile" → "My Orders" to view orders`;
    }

    return language === "中文"
      ? `💡 试试：\n\n🌶️ 推荐辣的食物\n🏨 300元以下酒店\n🗺️ 规划2日游\n🍜 推荐螺蛳粉`
      : `💡 Try:\n\n🌶️ Spicy food\n🏨 Hotel under ¥300\n🗺️ 2-day trip\n🍜 Best Luosifen`;
  };

  const sendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || inputValue;
    if (!messageToSend.trim()) return;
    
    setHasInteracted(true);
    
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: messageToSend,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    if (!customMessage) setInputValue("");
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getAIResponse(messageToSend);
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      speakResponse(response);
    }, 500);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("ai_chat_history");
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: language === "中文" 
          ? `对话已清空！${currentAvatar.greeting}`
          : `Conversation cleared! ${currentAvatar.greetingEn}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const t = (zh, en) => language === "中文" ? zh : en;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-200 animate-pulse-ring"
      >
        <div className="relative">
          <img 
            src={currentAvatar.image} 
            alt={currentAvatar.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={currentAvatar.image} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
          <div>
            <h3 className="font-bold text-sm">{currentAvatar.name}</h3>
            <p className="text-xs text-blue-100">
              {voiceSupported ? "🎤 " + t("语音可用", "Voice ready") : "🤖 " + t("智能助手", "AI Assistant")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={toggleAvatar} className="text-white text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
            🔄 {t("切换", "Switch")}
          </button>
          <button onClick={clearHistory} className="text-white">🗑️</button>
          <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "assistant" && (
                <img src={currentAvatar.image} alt="" className="w-8 h-8 rounded-full object-cover" />
              )}
              <div className={`p-3 rounded-2xl ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-white text-gray-800 shadow-sm"}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p className="text-[10px] mt-1 text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          </div>
        )}
        {isSpeaking && (
          <div className="text-center text-xs text-blue-500">🔊 {t("AI正在说话...", "AI is speaking...")}</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Buttons */}
      <div className="p-2 border-t bg-white">
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => sendMessage(action.query)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-2 px-1 rounded-lg transition text-center"
            >
              {language === "中文" ? action.label : action.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Input with Microphone */}
      <div className="p-2 border-t bg-white flex gap-2 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder={isListening ? "🎤 " + (language === "中文" ? "正在听..." : "Listening...") : t("打字或点击🎤说话...", "Type or click 🎤 to speak...")}
          className={`flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:border-blue-500 ${
            isListening ? "border-red-400 bg-red-50" : "border-gray-300"
          }`}
          disabled={isListening}
        />
        {voiceSupported && (
          <button
            onClick={isListening ? stopListening : startListening}
            className={`rounded-full w-10 h-10 flex items-center justify-center transition ${
              isListening 
                ? "bg-red-500 text-white animate-pulse" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            title={t("语音输入", "Voice input")}
          >
            {isListening ? "⏹️" : "🎤"}
          </button>
        )}
        <button
          onClick={() => sendMessage()}
          disabled={!inputValue.trim() || isListening}
          className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 disabled:opacity-50"
        >
          📤
        </button>
      </div>

      {/* Voice Tip */}
      {voiceSupported && !hasInteracted && (
        <div className="text-center text-xs text-gray-400 py-1 bg-gray-50 border-t">
          💡 {t("点击🎤按钮，说话即可提问！", "Click 🎤 and speak to ask!")}
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        .animate-pulse-ring {
          animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}