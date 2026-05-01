import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  Loader,
  Bot,
  User,
  Terminal,
  Zap,
  Shield,
  Radio,
  Activity,
} from "lucide-react";
import { HudPanel } from "@/components/ui/HudPanel";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Suggestion {
  id: string;
  text: string;
}

const ALLOWED_TOPICS = [
  "ENERGY PRICES & MARKETS",
  "RENEWABLE ENERGY SOURCES",
  "SUPPLY CHAIN ANALYSIS",
  "CRISIS FORECASTING",
  "GEOPOLITICAL IMPACTS",
  "SDG TARGETS (7 & 13)",
  "APP FEATURES & USAGE",
  "CLIMATE & SUSTAINABILITY",
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "> SYSTEM ONLINE. Energy Sustainability AI Terminal initialized.\n\nI am your Energy Crisis Sustainability Assistant. Query me on energy markets, renewables, supply chains, geopolitical risk, or how to use this application.\n\n[TOPICS OUTSIDE ENERGY DOMAIN WILL BE REJECTED]",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [msgCount, setMsgCount] = useState(1);
  const [uptime, setUptime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/chatbot/suggestions`,
        );
        const data = await response.json();
        setSuggestions(
          data.suggestions?.map((text: string, idx: number) => ({
            id: idx.toString(),
            text,
          })) || [],
        );
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    };
    fetchSuggestions();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const now = new Date();
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: messageText,
      sender: "user",
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setMsgCount((c) => c + 1);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/chatbot/ask`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageText }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: data.reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setMsgCount((c) => c + 1);
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: `[SYS_ERR] ${error instanceof Error ? error.message : "UNKNOWN_ERROR"}. Please retry.`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-2 lg:p-4 pb-24 lg:pb-28 bg-transparent flex flex-col font-mono text-slate-300 overflow-hidden">
      {/* ── HUD HEADER ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start z-10 w-full shrink-0 gap-2 lg:gap-0 mb-4">
        <div className="flex flex-col gap-1">
          <div className="text-xl lg:text-2xl font-bold tracking-widest text-white flex items-center gap-3">
            <div className="w-5 h-5 border border-cyan-500 flex items-center justify-center rounded-sm relative">
              <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
            </div>
            ENERGY VIEW // AI TERMINAL
          </div>
          <div className="text-[10px] text-slate-500 tracking-[0.3em] font-bold uppercase">
            NATURAL LANGUAGE INTERFACE — GROQ LLM ENGINE
          </div>
        </div>
        <div className="flex flex-col gap-1 text-right font-bold">
          <div className="text-[10px] text-cyan-400">
            SYS_STATUS:{" "}
            <span className="text-white">
              {isLoading ? "PROCESSING" : "NOMINAL"}
            </span>
          </div>
          <div className="text-[10px] text-slate-500">
            UPTIME:{" "}
            <span className="text-slate-300">{formatUptime(uptime)}</span>
          </div>
          <div className="text-[10px] text-slate-600">
            MODEL: llama-3.3-70b-versatile
          </div>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="flex-1 w-full flex flex-col lg:flex-row gap-4 overflow-hidden min-h-0">
        {/* LEFT SIDEBAR */}
        <div className="w-full lg:w-65 shrink-0 flex flex-col gap-4 order-2 lg:order-1 overflow-y-auto hide-scrollbar">
          {/* System Status */}
          <HudPanel title="System Status // NODE">
            <div className="space-y-2 text-[10px] font-bold">
              <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Radio size={10} className="text-cyan-400 animate-pulse" />
                  CONNECTION
                </span>
                <span className="text-cyan-400">SECURE</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Activity size={10} className="text-emerald-400" /> AI ENGINE
                </span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Shield size={10} className="text-orange-400" /> FILTER
                </span>
                <span className="text-orange-400">STRICT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MessageCircle size={10} className="text-slate-400" /> MSG
                  COUNT
                </span>
                <span className="text-white">
                  {String(msgCount).padStart(4, "0")}
                </span>
              </div>
            </div>

            <div className="mt-4 h-1 w-full bg-slate-900 overflow-hidden">
              <div
                className="h-full bg-cyan-500 animate-pulse"
                style={{
                  width: isLoading ? "80%" : "30%",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
            <div className="mt-1 text-[8px] text-slate-600 tracking-widest">
              {isLoading ? "QUERYING LLM ENGINE..." : "STANDING BY"}
            </div>
          </HudPanel>

          {/* Allowed Topics */}
          <HudPanel title="Allowed Topics // SCOPE">
            <div className="space-y-1.5">
              {ALLOWED_TOPICS.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[9px] text-slate-400 font-bold"
                >
                  <div className="w-1 h-1 bg-cyan-500 rounded-sm shrink-0" />
                  {topic}
                </div>
              ))}
            </div>
            <div className="mt-4 p-2 bg-red-500/5 border border-red-500/20 text-[8px] text-red-400 font-bold tracking-wider leading-relaxed">
              ⚠ OFF-TOPIC QUERIES WILL BE REJECTED BY FILTER ENGINE
            </div>
          </HudPanel>

          {/* Telemetry */}
          <HudPanel title="Active Telemetry">
            <div className="font-mono text-[9px] text-slate-500 leading-relaxed opacity-60 space-y-0.5">
              <div>0x1A: GROQ_API ... CONNECTED</div>
              <div>0x1B: TOPIC_FILTER ... ARMED</div>
              <div>0x1C: STREAM_MODE ... DISABLED</div>
              <div>0x1D: CONTEXT_WIN ... 128ktk</div>
              <div>0x1E: TEMP ... 0.70</div>
              <div className="text-cyan-500 animate-pulse">
                0x1F: AWAIT_QUERY ...
              </div>
            </div>
          </HudPanel>
        </div>

        {/* CENTER: CHAT AREA */}
        <div className="flex-1 min-w-0 flex flex-col gap-0 order-1 lg:order-2 overflow-hidden">
          <HudPanel
            title="Query Terminal // INTERACTIVE"
            className="flex-1 flex flex-col overflow-hidden min-h-0"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0 custom-scrollbar">
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`shrink-0 w-7 h-7 border flex items-center justify-center ${
                      message.sender === "user"
                        ? "border-orange-500/40 bg-orange-500/10 text-orange-400"
                        : "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User size={14} />
                    ) : (
                      <Bot size={14} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`flex flex-col gap-1 max-w-[85%] ${message.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`text-[8px] font-bold tracking-widest ${message.sender === "user" ? "text-orange-400" : "text-cyan-400"}`}
                    >
                      {message.sender === "user"
                        ? `OPERATOR_${String(idx).padStart(3, "0")}`
                        : "AI_ENGINE"}
                    </div>
                    <div
                      className={`px-4 py-3 text-[11px] leading-relaxed whitespace-pre-line border relative ${
                        message.sender === "user"
                          ? "bg-orange-500/5 border-orange-500/30 text-orange-100 rounded-tl-lg rounded-bl-lg rounded-br-none rounded-tr-none"
                          : "bg-cyan-500/5 border-cyan-500/20 text-slate-200 rounded-tr-lg rounded-br-lg rounded-bl-none rounded-tl-none"
                      }`}
                    >
                      {/* corner accents */}
                      {message.sender === "bot" && (
                        <>
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500/60" />
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500/60" />
                        </>
                      )}
                      {message.text}
                    </div>
                    <div className="text-[8px] text-slate-600 font-bold tracking-widest">
                      T+
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 flex-row">
                  <div className="shrink-0 w-7 h-7 border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-[8px] font-bold tracking-widest text-cyan-400">
                      AI_ENGINE
                    </div>
                    <div className="px-4 py-3 bg-cyan-500/5 border border-cyan-500/20 flex items-center gap-3 text-[11px]">
                      <Loader
                        size={13}
                        className="text-cyan-400 animate-spin shrink-0"
                      />
                      <span className="text-slate-400 animate-pulse tracking-widest">
                        PROCESSING QUERY...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {inputValue === "" &&
              messages.length <= 1 &&
              suggestions.length > 0 && (
                <div className="mt-4 border-t border-slate-800 pt-4 shrink-0">
                  <div className="text-[9px] text-slate-500 font-bold tracking-[0.3em] uppercase mb-2">
                    SUGGESTED QUERIES:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    {suggestions.slice(0, 4).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleSendMessage(s.text)}
                        className="text-left px-3 py-2 text-[10px] font-mono text-slate-400 hover:text-cyan-300 bg-black/40 border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-200 tracking-wide relative group"
                      >
                        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-transparent group-hover:border-cyan-500/60 transition-colors" />
                        <span className="text-cyan-600 mr-1">&gt;</span>{" "}
                        {s.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            <div className="mt-4 border-t border-slate-800 pt-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="text-cyan-500 font-bold text-sm shrink-0 flex items-center gap-1">
                  <Terminal size={14} />
                  <span className="text-[11px] tracking-widest">&gt;</span>
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLoading) {
                      handleSendMessage(inputValue);
                    }
                  }}
                  placeholder="Enter query about energy, sustainability, or app features..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2.5 bg-black/60 border border-slate-700 hover:border-slate-600 focus:border-cyan-500/60 text-white placeholder-slate-600 font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 disabled:opacity-40 tracking-wide"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isLoading || inputValue.trim() === ""}
                  className={`flex items-center justify-center px-4 py-2.5 border font-mono font-bold text-[11px] tracking-widest transition-all duration-200 ${
                    isLoading || inputValue.trim() === ""
                      ? "bg-slate-900/50 text-slate-600 border-slate-800 cursor-not-allowed"
                      : "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/20 hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  }`}
                >
                  {isLoading ? (
                    <Loader size={15} className="animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                </button>
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[8px] text-slate-600 font-bold tracking-widest">
                <Zap size={8} className="text-cyan-600" />
                GROQ LLM · ENERGY DOMAIN RESTRICTED · PRESS ENTER TO TRANSMIT
              </div>
            </div>
          </HudPanel>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
