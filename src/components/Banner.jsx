import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "../assets/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import VideoplayerAlert from "./VideoplayerAlert";

const Banner = ({ type }) => {
  const popularMovies = useSelector((state) => state.movies.popularMovies);

  const popularSeries = useSelector((state) => state.tvSeries.popularSeries);

  const movies = type === "movie" ? popularMovies : popularSeries;

  const [index, setIndex] = useState(0);

  const [playTrailer, setPlayTrailer] = useState(false);

  useEffect(() => {
    if (!movies?.length || playTrailer) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies, playTrailer]);

  const movie = movies?.[index];

  if (!movie) return null;

  const next = () => {
    setIndex((prev) => (prev + 1) % movies.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <div className="relative w-full h-[65vh] sm:h-[80vh] md:h-[90vh] overflow-hidden mt-14 sm:mt-10 text-white group">
      <img
        key={movie.backdrop_path}
        src={IMAGE_URL + movie.backdrop_path}
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:bg-gradient-to-r md:from-black md:via-black/50 md:to-transparent" />

      <button
        onClick={prev}
        className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 
        bg-purple-700 hover:bg-purple-800 p-3 rounded-full opacity-0 
        group-hover:opacity-100 transition duration-300 shadow-lg shadow-purple-900/30"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 
        bg-purple-700 hover:bg-purple-800 p-3 rounded-full opacity-0 
        group-hover:opacity-100 transition duration-300 shadow-lg shadow-purple-900/30"
      >
        <ChevronRight />
      </button>

      <div className="relative z-10 h-full flex items-end px-4 sm:px-12 md:px-20 lg:px-24 pb-12 sm:pb-16 max-w-6xl">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight">
            {movie.title || movie.name}
          </h1>

          <div className="flex items-center gap-3 sm:gap-5 p-1 text-sm sm:text-base">
            <div className="bg-purple-700 text-white rounded-xl px-2 py-1 font-semibold">
              ⭐ {movie.vote_average?.toFixed(1)}
            </div>

            <p className="text-gray-300 font-medium">
              {(movie.release_date || movie.first_air_date)?.split("-")[0]}
            </p>
          </div>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 line-clamp-3 mb-6 max-w-2xl leading-relaxed">
            {movie.overview}
          </p>

          <div className="flex gap-4 flex-wrap sm:flex-nowrap">
            <button
              className="bg-purple-600 hover:bg-purple-700 px-5 sm:px-6 py-2 rounded-md font-semibold transition shadow-md shadow-purple-950/50 cursor-pointer"
              onClick={() => setPlayTrailer(true)}
            >
              Watch Trailer
            </button>

            <Link to={`${movie.id}`} className="inline-block">
              <button className="bg-gray-700/70 hover:bg-gray-700/90 px-5 sm:px-6 py-2 rounded-md font-semibold transition cursor-pointer">
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 max-w-[90vw] overflow-x-auto no-scrollbar">
        {movies.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`
              h-2 w-2 rounded-full cursor-pointer
              transition-all duration-300 flex-shrink-0
              ${i === index ? "bg-purple-500 w-5" : "bg-gray-400/50"}
            `}
          />
        ))}
      </div>

      <VideoplayerAlert
        movie={movie}
        play={playTrailer}
        setPlay={setPlayTrailer}
        type={type}
      />
    </div>
  );
};

export default Banner;
