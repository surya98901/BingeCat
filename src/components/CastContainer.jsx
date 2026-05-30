import { IMAGE_URL } from "../assets/constants";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CastContainer = ({ credits }) => {
  const cast = credits?.cast || [];
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [cast]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 300);
  };

  if (!cast.length) return null;

  return (
    <div className="group relative flex flex-col gap-3 overflow-visible">
      <label className="capitalize text-lg font-bold dark:text-white">Cast</label>

      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-[60%] -translate-y-1/2 z-25 bg-purple-700 hover:bg-purple-800 text-white p-2 rounded-full cursor-pointer shadow-lg shadow-purple-900/45 transition opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-[60%] -translate-y-1/2 z-25 bg-purple-700 hover:bg-purple-800 text-white p-2 rounded-full cursor-pointer shadow-lg shadow-purple-900/45 transition opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2 w-full"
      >
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="w-[130px] sm:w-[150px] h-[200px] sm:h-[220px] flex-shrink-0 flex flex-col items-center border border-gray-300 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-sm"
          >
            <img
              src={actor.profile_path ? IMAGE_URL + actor.profile_path : "/fallback-avatar.png"}
              alt={actor.name}
              className="w-full h-[130px] sm:h-[150px] object-cover"
              loading="lazy"
            />
            <div className="p-1.5 flex flex-col items-center justify-center flex-1 min-w-0 w-full text-center">
              <p className="text-xs sm:text-sm font-bold dark:text-white truncate w-full">{actor.name}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 truncate w-full">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastContainer;
