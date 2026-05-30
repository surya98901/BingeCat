import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Play, Heart, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import MovieDetailsAlert from "./MovieDetailsAlert";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovieContaier2 = ({ movies }) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const currentType = useSelector((state) => state.type.currentType); // "movies" or "series"

  const scrollRef = useRef(null);

  const checkScroll = () => {
    const el = scrollRef.current;

    if (!el) return;

    setShowLeft(el.scrollLeft > 0);

    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, [movies]);

  const scroll = (dir) => {
    const el = scrollRef.current;

    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -el.clientWidth * 0.8 : el.clientWidth * 0.8,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 300);
  };

  return (
    <div className="relative group overflow-visible">
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute bottom-0 -left-12 top-0 z-10 w-12 items-center justify-center opacity-0 transition group-hover:opacity-100 dark:bg-gradient-to-r dark:from-black/70 dark:to-transparent"
        >
          <ChevronLeft
            className="rounded-full bg-purple-600 p-2 text-white cursor-pointer"
            size={50}
          />
        </button>
      )}

      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute bottom-0 -right-12 top-0 z-10 w-12 items-center justify-center opacity-0 transition group-hover:opacity-100 dark:bg-gradient-to-l dark:from-black/70 dark:to-transparent"
        >
          <ChevronRight
            className="rounded-full bg-purple-600 p-2 text-white cursor-pointer"
            size={50}
          />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="no-scrollbar flex gap-4 overflow-x-scroll overflow-y-visible scroll-smooth px-6 py-10"
      >
        <LayoutGroup>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative snap-start"
              onMouseEnter={() => setActiveId(movie.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <Link to={`/BingeCat/${currentType}/${movie.id}`}>
                <motion.div
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              </Link>

              <AnimatePresence>
                {!isTouchDevice && activeId === movie.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: -20,
                      scale: 1.1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95,
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 top-0 z-[999] w-[300px]"
                  >
                    <MovieDetailsAlert movie={movie} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </LayoutGroup>
      </div>
    </div>
  );
};

export default MovieContaier2;
