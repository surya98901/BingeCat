import { motion } from "framer-motion";

import {
  Trash2,
  X,
  SendHorizontal,
  Sparkles,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const BingecatChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [chatList, setChatList] = useState([]);

  const [text, setText] = useState("");

  const [quickActions, setQuickActions] = useState(true);

  const messagesEndRef = useRef(null);

  const inputRef = useRef(null);

  const quickReplies = [
    "🔥 Trending Now",
    "💥 Action Packed",
    "😂 Make Me Laugh",
    "💕 Romantic",
    "😱 Thrilling",
    "🎬 Classic Hits",
  ];

  const suggestions = [
    "What's trending?",
    "I'm feeling adventurous",
    "Show me some comedies",
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [chatList]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleSend(customText) {
    const message = customText || text;

    if (message.trim() === "") return;

    setChatList((prev) => [...prev, message]);

    setText("");
  }

  function handleClearChat() {
    setChatList([]);
  }

  return (
    <>
      {!isOpen ? (
        <motion.img
          src={`${import.meta.env.BASE_URL}applogo.png`}
          alt="BingeCat Logo"
          className="fixed bottom-6 right-6 z-50 w-20 h-20 md:w-24 md:h-24 cursor-pointer drop-shadow-2xl"
          animate={{
            rotate: [0, -10, 10, -10, 10, 0],
            y: [0, -4, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[95vw] md:w-[420px] h-[85vh] md:h-[720px] max-h-[calc(100vh-2rem)] z-50 rounded-[2rem] overflow-hidden border border-purple-700/30 bg-white dark:bg-black shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-xl flex flex-col"
        >
          <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-3 rounded-full shadow-lg shadow-purple-900/40">
                <Sparkles size={18} className="text-white" />
              </div>

              <div>
                <h1 className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                  BingeCat Assistant
                </h1>

                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Your personal binge companion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClearChat}
                className="p-2 rounded-full hover:bg-purple-700 hover:text-white transition-all duration-300 text-zinc-500"
              >
                <Trash2 size={18} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-purple-700 hover:text-white transition-all duration-300 text-zinc-500"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 no-scrollbar bg-zinc-50 dark:bg-black">
            {}
            <div className="flex gap-3 items-start">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-2 rounded-full shadow-lg shadow-purple-900/40 flex-shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-purple-700 text-white rounded-3xl rounded-tl-md p-5 max-w-[85%] shadow-lg"
              >
                <p className="text-lg font-medium">Good afternoon! 👋</p>

                <p className="mt-4 text-[15px] leading-7">
                  Afternoon vibes! 🎬 Great time for a drama or action flick.
                </p>

                <p className="mt-5 text-[15px]">
                  What are you in the mood for?
                </p>
              </motion.div>
            </div>

            {}
            {chatList.map((message, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="flex items-end gap-3 justify-end"
              >
                <div className="bg-purple-700 text-white rounded-3xl rounded-br-md px-5 py-4 max-w-[80%] shadow-lg break-words">
                  <p className="text-[15px] leading-7">{message}</p>
                </div>

                <div className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-full flex-shrink-0">
                  <User
                    size={15}
                    className="text-zinc-700 dark:text-zinc-300"
                  />
                </div>
              </motion.div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
            <button
              className="w-full flex items-center justify-between px-2 mb-3 uppercase tracking-wider text-xs font-medium text-zinc-500"
              onClick={() => setQuickActions((prev) => !prev)}
            >
              Quick Actions
              {quickActions ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronUp size={18} />
              )}
            </button>

            {quickActions && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  {quickReplies.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSend(item)}
                      className="bg-white dark:bg-zinc-900 hover:bg-purple-700 hover:text-white border border-purple-700/30 rounded-2xl p-4 text-left transition-all duration-300 text-sm shadow-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSend(item)}
                      className="px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-purple-700/30 hover:bg-purple-700 hover:text-white transition-all duration-300 text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
            <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                value={text}
                placeholder="Ask me anything about movies or shows..."
                className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 outline-none text-sm"
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }

                  if (e.key === "Escape") {
                    setIsOpen(false);
                  }
                }}
              />

              <button
                disabled={text.trim() === ""}
                onClick={() => handleSend()}
                className={`${text.trim() === "" ? "bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-600 shadow-lg shadow-purple-900/30"} p-3 rounded-full transition-all duration-300`}
              >
                <SendHorizontal size={18} className="text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default BingecatChatAI;
