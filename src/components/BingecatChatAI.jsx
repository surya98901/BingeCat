import { motion } from "framer-motion";
import {
  Trash2,
  X,
  SendHorizontal,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const BingecatChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickActions, setQuickActions] = useState(true);

  return (
    <>
      {!isOpen ? (
        <motion.img
          src="public\applogo.png"
          alt="logo"
          className="fixed bottom-8 right-8 z-50 w-28 h-28 cursor-pointer"
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <div className="fixed bottom-6 right-6 w-[420px] h-[720px] z-50 rounded-[2rem] overflow-hidden border border-purple-700 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 shadow-[0_0_40px_rgba(168,85,247,0.15)] backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-purple-700 bg-white text-black dark:bg-black dark:text-zinc-400">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-3 rounded-full shadow-lg shadow-purple-900/40">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg tracking-tight">
                  BingeCat Assistant
                </h1>

                <p className=" text-sm">Your personal binge pet</p>
              </div>
            </div>

            <div className="flex items-center gap-4 ">
              <Trash2
                size={25}
                className="cursor-pointer hover:bg-purple-700 hover:text-white p-1 rounded-full transition"
              />

              <X
                size={25}
                className="cursor-pointer p-1 hover:bg-purple-700 hover:text-white p-1 rounded-full transition"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar bg-white text-black dark:bg-black dark:text-zinc-300">
            <div className="flex gap-3 items-start">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-2 rounded-full shadow-lg shadow-purple-900/40">
                <Sparkles size={14} className="text-white" />
              </div>

              <div>
                <div className="bg-purple-700 text-white  border border-purple-700 rounded-3xl p-5 max-w-[85%] ">
                  <p className=" text-lg">Good afternoon! 👋 Welcome back.</p>

                  <p className=" mt-5 text-[15px] leading-7">
                    Afternoon vibes! 🎬 Great time for a drama or action flick.
                  </p>

                  <p className=" mt-6 text-[15px]">
                    What are you in the mood for?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 bg-white text-black dark:bg-black dark:text-zinc-300 border-t border-purple-900/20">
            <p className="m-2 w-full flex justify-between px-4 uppercase text-sm tracking-wider text-zinc-500">
              Quick actions
              {quickActions ? (
                <ChevronDown size={20} onClick={() => setQuickActions(false)} />
              ) : (
                <ChevronUp size={20} onClick={() => setQuickActions(true)} />
              )}
            </p>

            {quickActions && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "🔥 Trending Now",
                    "💥 Action Packed",
                    "😂 Make Me Laugh",
                    "💕 Romantic",
                    "😱 Thrilling",
                    "🎬 Classic Hits",
                  ].map((item) => (
                    <button
                      key={item}
                      className="bg-white dark:bg-zinc-900/80 hover:bg-purple-700 hover:text-zinc-100 dark:hover:bg-purple-600 border border-purple-700/40 rounded-2xl p-4 text-left backdrop-blur-md transition duration-300"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  {[
                    "What's trending?",
                    "I'm feeling adventurous",
                    "Show me some comedies",
                  ].map((item) => (
                    <button
                      key={item}
                      className="px-4 py-2 rounded-full bg-white text-black dark:bg-zinc-900/80 dark:text-zinc-300 border border-purple-700/40 hover:bg-purple-700 hover:text-zinc-100 dark:hover:bg-purple-600 transition backdrop-blur-md"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-purple-900/20 bg-purple-700">
            <div className="flex items-center gap-3 bg-white text-black dark:bg-black dark:text-zinc-300 border border-purple-900/30 rounded-2xl px-4 py-3 backdrop-blur-md">
              <input
                type="text"
                placeholder="Ask me anything about movies or shows..."
                className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-500 outline-none"
              />

              <button className="bg-purple-700 hover:bg-purple-600 transition p-3 rounded-full shadow-lg shadow-purple-900/30">
                <SendHorizontal size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BingecatChatAI;
