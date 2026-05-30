import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import SlideButtonsList from "../ReUsables/SlideButtonsList";
import MovieDetailsAlert from "./MovieDetailsAlert";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";

const options = ["Streaming", "On TV", "For Rent", "In Theatres"];

const MovieContainer = ({ gene, type }) => {
  const { popularMovies, topRatedMovies, upcomingMovies, nowPlayingMovies } =
    useSelector((state) => state.movies);

  const { popularSeries, topRatedSeries, upcomingSeries, nowPlayingSeries } =
    useSelector((state) => state.tvSeries);

  const dataMap = {
    movie: {
      popular: popularMovies,
      topRated: topRatedMovies,
      upcoming: upcomingMovies,
      nowPlaying: nowPlayingMovies,
    },
    series: {
      popular: popularSeries,
      topRated: topRatedSeries,
      upcoming: upcomingSeries,
      nowPlaying: nowPlayingSeries,
    },
  };

  const movies = useMemo(() => {
    return dataMap[type]?.[gene] || [];
  }, [
    type,
    gene,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlayingMovies,
    popularSeries,
    topRatedSeries,
    upcomingSeries,
    nowPlayingSeries,
  ]);

  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [active, setActive] = useState(options[0]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
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
    <div
      className="px-4 sm:px-12 md:px-24 lg:px-32 xl:px-48 dark:bg-black py-5"
      onMouseLeave={() => setActiveId(null)}
    >
      <div className="flex flex-col sm:flex-row px-3 sm:px-5 items-start sm:items-center gap-4 sm:gap-10 mb-4">
        <h1 className="text-lg font-semibold dark:text-white capitalize">
          {gene}
        </h1>
        <SlideButtonsList
          options={options}
          active={active}
          setActive={setActive}
        />
      </div>

      <div className="relative group overflow-visible">
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-12 lg:-left-16 top-0 bottom-0 z-10 w-12 items-center justify-center 
                        dark:bg-gradient-to-r from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft
              className="text-white bg-purple-600 p-2 rounded-full cursor-pointer"
              size={50}
            />
          </button>
        )}

        {showRight && (
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-12 lg:-right-16 top-0 bottom-0 z-10 w-12 items-center justify-center 
                        dark:bg-gradient-to-l from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight
              className="text-white bg-purple-600 p-2 rounded-full cursor-pointer"
              size={50}
            />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-2 sm:gap-4 overflow-x-scroll overflow-y-visible py-6 sm:py-10 px-3 sm:px-6 scroll-smooth no-scrollbar"
        >
          <LayoutGroup>
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative snap-start"
                onMouseEnter={() => setActiveId(movie.id)}
              >
                <Link to={`/BingeCat/${type === "movie" ? "movies" : "series"}/${movie.id}`}>
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
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: -20, scale: 1.1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="absolute top-0 left-0 z-[999] w-[300px]"
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
    </div>
  );
};

export default MovieContainer;
