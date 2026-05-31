import { motion } from "framer-motion";
import { GoogleGenAI } from "@google/genai";

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
import { useSelector, useDispatch } from "react-redux";
import useSearchMovie from "../Hooks/useSearchMovie";
import { clearGeminiSuggestedMovies, setChatAiSuggestedMovies } from "../store/slices/userSlice";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

const BingecatChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [chatList, setChatList] = useState([
    {
      role: "model",
      text: "Good afternoon! 👋\n\nAfternoon vibes! 🎬 Great time for a drama or action flick.\n\nWhat are you in the mood for?",
    },
  ]);

  const [text, setText] = useState("");

  const [quickActions, setQuickActions] = useState(true);

  const [isTyping, setIsTyping] = useState(false);
  const [searchQueries, setSearchQueries] = useState([]);
  const dispatch = useDispatch();

  useSearchMovie(searchQueries);

  const geminiSuggestedMovies = useSelector((state) => state.user.geminiSuggestedMovies) || [];

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

  const currUser = useSelector((state) => state.user.currentUser);

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

  useEffect(() => {
    if (searchQueries.length > 0 && geminiSuggestedMovies.length >= 0) {
      const slicedMovies = geminiSuggestedMovies.slice(0, 10);
      setChatList((prev) => [
        ...prev,
        {
          role: "model",
          text: geminiSuggestedMovies.length > 0
            ? "Here are the movie recommendations I found on TMDB for you:"
            : "I found some recommendations, but was unable to locate them on TMDB. Try another search!",
          movies: slicedMovies,
          hasMore: geminiSuggestedMovies.length > 10,
        },
      ]);
      if (geminiSuggestedMovies.length > 0) {
        dispatch(setChatAiSuggestedMovies(geminiSuggestedMovies));
      }
      dispatch(clearGeminiSuggestedMovies());
      setSearchQueries([]);
      setIsTyping(false);
    }
  }, [geminiSuggestedMovies, dispatch, searchQueries]);

  const handleSend = async (customText) => {
    if (!currUser) {
      alert("please signin Or create an account to get use BingeCat Ai");
      return;
    }
    const message = customText || text;

    if (message.trim() === "") return;

    setChatList((prev) => [...prev, { role: "user", text: message }]);
    setText("");
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        config: {
          systemInstruction:
            "You are an expert movie/tv show recommendation engine. Based on the user's preference, recommend exactly 3 to 5 movie/tv shows titles. Return ONLY the titles of the movie/tv show as a clean JSON string array of titles, e.g. [\"Movie 1\", \"Movie 2\", \"Movie 3\"]. Do not include any other conversational text, headers, markdown fences, or explanations. Only return the JSON array.",
        },
        contents: `Recommend movies/tv shows based on this preference: "${message}"`,
      });

      const responseText = response.text || "[]";
      let titles = [];
      try {
        const cleaned = responseText.replace(/```json|```/g, "").trim();
        titles = JSON.parse(cleaned);
      } catch (e) {
        titles = responseText
          .split(/[,\n]/)
          .map((t) => t.trim().replace(/^-\s*/, "").replace(/^"\s*|\s*"$/g, ""))
          .filter(Boolean);
      }

      if (titles.length === 0) {
        setChatList((prev) => [
          ...prev,
          {
            role: "model",
            text: "Sorry, I couldn't find any movie recommendations for that.",
          },
        ]);
        setIsTyping(false);
      } else {
        setSearchQueries(titles);
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setChatList((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I ran into an issue connecting to the Gemini service. Please check your network and VITE_GEMINI_API_KEY configuration.",
        },
      ]);
      setIsTyping(false);
    }
  };

  function handleClearChat() {
    setChatList([
      {
        role: "model",
        text: "Good afternoon! 👋\n\nAfternoon vibes! 🎬 Great time for a drama or action flick.\n\nWhat are you in the mood for?",
      },
    ]);
    dispatch(clearGeminiSuggestedMovies());
    setSearchQueries([]);
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
          onClick={() => {
            if (!currUser) {
              alert("please signin Or create an account to get use BingeCat Ai");
            } else {
              setIsOpen(true);
            }
          }}
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
            {chatList.map((msg, index) => {
              if (msg.role === "model") {
                return (
                  <div className="flex flex-col gap-3 items-start w-full" key={index}>
                    <div className="flex gap-3 items-start w-full">
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
                        <p className="text-[15px] leading-7 whitespace-pre-line">{msg.text}</p>
                      </motion.div>
                    </div>

                    {msg.movies && msg.movies.length > 0 && (
                      <div className="pl-10 w-full overflow-x-auto no-scrollbar py-2">
                        <div className="grid grid-cols-2 gap-2 ">
                          {msg.movies.map((movie) => {
                            const movieType = "title" in movie && !("name" in movie) ? "movies" : "series";
                            return (
                              <Link to={`/BingeCat/${movieType}/${movie.id}`} key={movie.id} onClick={() => setIsOpen(false)}>
                                <MovieCard
                                  movie={{ ...movie, type: movieType === "movies" ? "movies" : "series" }}
                                  className="w-[120px] sm:w-[140px] flex-shrink-0 transition-transform duration-300 hover:scale-105"
                                />
                              </Link>
                            );
                          })}
                        </div>
                        {msg.hasMore && (
                          <div className="mt-3 flex justify-start">
                            <Link
                              to="/BingeCat/for-you"
                              onClick={() => setIsOpen(false)}
                              className="text-xs font-bold text-white hover:underline flex items-center gap-1 bg-purple-800 hover:bg-purple-900 px-3 py-1.5 rounded-lg transition duration-300"
                            >
                              See more
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
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
                    <div className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-3xl rounded-br-md px-5 py-4 max-w-[80%] shadow-lg break-words">
                      <p className="text-[15px] leading-7">{msg.text}</p>
                    </div>

                    <div className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-full flex-shrink-0">
                      <User
                        size={15}
                        className="text-zinc-700 dark:text-zinc-300"
                      />
                    </div>
                  </motion.div>
                );
              }
            })}

            {isTyping && (
              <div className="flex gap-3 items-start">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-2 rounded-full shadow-lg shadow-purple-900/40 flex-shrink-0">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className="bg-purple-700/80 text-white rounded-3xl rounded-tl-md px-4 py-3 shadow-lg flex items-center gap-1.5 h-11">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

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
