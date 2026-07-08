// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import axios from "axios";

// const QUICK_QUESTIONS = [
//   "On what date did I spend the most?",
//   "On what category did I spend the most?",
//   "How much did I spend on Food?",
//   "What is my total income vs expense?",
//   "Give me a summary of my spending",
// ];

// const DATE_RANGES = [
//   { label: "Last 7 days", value: "last_week" },
//   { label: "Last 30 days", value: "last_month" },
//   { label: "Last 3 months", value: "last_3_months" },
//   { label: "Lifetime", value: "lifetime" },
// ];

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     {
//       role: "bot",
//       content:
//         "Hi! I'm your FinSmart AI assistant 🤖 Ask me anything about your finances, or pick a question from the left!",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [dateRange, setDateRange] = useState("last_week");
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const sendMessage = async (text) => {
//     const query = (text || input).trim();
//     if (!query || loading) return;

//     setMessages((prev) => [...prev, { role: "user", content: query }]);
//     setInput("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.post(
//         "/api/chatbot/message",
//         { message: query, dateRange },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           content: "Sorry, something went wrong. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col">
//       <Navbar />

//       <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>

//         {/* LEFT PANEL */}
//         <div className="w-full md:w-[380px] lg:w-[420px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col p-6 overflow-y-auto">

//           {/* Bot Icon */}
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl shadow-md">
//               🤖
//             </div>
//           </div>

//           {/* Title */}
//           <h1 className="text-2xl font-bold text-slate-800 mb-2">
//             Personal Finance Chat-Bot
//           </h1>
//           <p className="text-slate-500 text-sm mb-6">
//             Enter any question related to your finance data or select from below:
//           </p>

//           {/* Quick Questions */}
//           <div className="flex flex-col gap-3 mb-8">
//             {QUICK_QUESTIONS.map((q, i) => (
//               <button
//                 key={i}
//                 onClick={() => sendMessage(q)}
//                 disabled={loading}
//                 className="text-left bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
//               >
//                 {q}
//               </button>
//             ))}
//           </div>

//           {/* Date Range Selector */}
//           <div className="mb-8">
//             <div className="flex items-center gap-3 flex-wrap">
//               <span className="text-sm font-medium text-slate-700">
//                 Get Answers from →
//               </span>
//               <select
//                 value={dateRange}
//                 onChange={(e) => setDateRange(e.target.value)}
//                 className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none focus:border-indigo-400 cursor-pointer"
//               >
//                 {DATE_RANGES.map((r) => (
//                   <option key={r.value} value={r.value}>
//                     {r.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Input + Send */}
//           <div className="mt-auto flex gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter Your Query"
//               disabled={loading}
//               className="flex-1 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 disabled:opacity-50"
//             />
//             <button
//               onClick={() => sendMessage()}
//               disabled={loading || !input.trim()}
//               className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors"
//             >
//               {loading ? "..." : "SEND"}
//             </button>
//           </div>
//         </div>

//         {/* RIGHT PANEL - Chat */}
//         <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">

//           {/* Chat Header */}
//           <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="text-xl">🤖</span>
//               <span className="font-semibold text-slate-700">FinSmart AI</span>
//               <span className="w-2 h-2 rounded-full bg-green-500 ml-1" />
//             </div>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
//             >
//               ← Back to Dashboard
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
//                     msg.role === "user"
//                       ? "bg-slate-200 text-slate-800 rounded-br-sm"
//                       : "bg-green-100 text-slate-800 rounded-bl-sm border border-green-200"
//                   }`}
//                 >
//                   <span className="font-semibold mr-1">
//                     {msg.role === "user" ? "You: " : "Bot: "}
//                   </span>
//                   {msg.content}
//                 </div>
//               </div>
//             ))}

//             {/* Typing indicator */}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-green-100 border border-green-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
//                   <span className="flex gap-1 items-center">
//                     <span className="text-xs text-slate-500 mr-1">Bot is thinking</span>
//                     <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
//                     <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
//                     <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
//                   </span>
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;







import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { sendChatMessage } from "../services/ChatbotApi";

const QUICK_QUESTIONS = [
  "On what date did I spend the most?",
  "On what category did I spend the most?",
  "How much did I spend on Food?",
  "What is my total income vs expense?",
  "Give me a summary of my spending",
];

const DATE_RANGES = [
  { label: "Last 7 days",   value: "last_week"     },
  { label: "Last 30 days",  value: "last_month"    },
  { label: "Last 3 months", value: "last_3_months" },
  { label: "Lifetime",      value: "lifetime"      },
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hi! I'm your FinSmart AI assistant 🤖 Ask me anything about your finances, or pick a quick question from the left!",
    },
  ]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [dateRange, setDateRange] = useState("last_week");
  const messagesEndRef           = useRef(null);
  const navigate                 = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const query = (text || input).trim();
    if (!query || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendChatMessage(query, dateRange);
      setMessages((prev) => [...prev, { role: "bot", content: reply }]);
    } catch (err) {
      const errMsg =
        err?.response?.data?.error ||
        "Something went wrong. Make sure openai server is running ";
      setMessages((prev) => [...prev, { role: "bot", content: `⚠️ ${errMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT PANEL ── */}
        <div className="w-[400px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col p-6 overflow-y-auto">

          {/* Bot icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-3xl shadow">
              🤖
            </div>
          </div>

          {/* Title + subtitle */}
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Personal Finance Chat-Bot
          </h1>
          <p className="text-slate-500 text-sm mb-6">
            Enter any question related to your finance data or select from below :
          </p>

          {/* Quick question buttons */}
          <div className="flex flex-col gap-3 mb-8">
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="text-left bg-slate-800 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Date range */}
          <div className="mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-slate-700">
                Get Answers from the
              </span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none focus:border-indigo-400 cursor-pointer"
              >
                {DATE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Input + Send */}
          <div className="mt-auto flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter Your Query"
              disabled={loading}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-slate-800 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg text-sm font-bold transition-colors"
            >
              {loading ? "..." : "SEND"}
            </button>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Chat header */}
          <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <span className="font-semibold text-slate-700">FinSmart AI</span>
              <span className="w-2 h-2 rounded-full bg-green-500 ml-1" />
              <span className="text-xs text-green-600">Online</span>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-slate-200 text-slate-800 rounded-br-sm"
                      : "bg-green-100 text-slate-800 rounded-bl-sm border border-green-200"
                  }`}
                >
                  <span className="font-bold mr-1">
                    {msg.role === "user" ? "You:" : "Bot:"}
                  </span>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-green-100 border border-green-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
                  <span className="text-xs text-slate-500">Bot is thinking</span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;