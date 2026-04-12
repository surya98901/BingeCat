import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "../assets/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = ({ type }) => {
    const popularMovies = useSelector((state) => state.movies.popularMovies);
    const popularSeries = useSelector((state) => state.tvSeries.popularSeries);
  const movies = type === "movie" ? popularMovies : popularSeries;
  const [index, setIndex] = useState(0);

 
  useEffect(() => {
    if (!movies?.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies?.[index];
  if (!movie) return null;

 
  const next = () => {
    setIndex((prev) => (prev + 1) % movies.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden text-white group ">


      <img
        key={movie.backdrop_path}
        src={IMAGE_URL + movie.backdrop_path}
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
      />


      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

  
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 
        bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition mx-20 bg-purple-700"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 
        bg-black/50 p-3 rounded-full opacity-0 group-hover:opacity-100 transition mx-20 bg-purple-700"
      >
        <ChevronRight />
      </button>

  
      <div className="relative z-10 h-full flex items-end px-55 pb-16 max-w-6xl">
        <div>
          <h1 className="text-[3rem] font-bold mb-2">
            {movie.title || movie.name}
          </h1>

          <div className="flex items-center gap-5 p-2">
            <div className="bg-purple-700 text-white rounded-xl p-2">
              ⭐ {movie.vote_average?.toFixed(1)}
            </div>
            <p className="text-gray-400">
              {(movie.release_date || movie.first_air_date)?.split("-")[0]}
            </p>
          </div>

          <p className="text-xl text-gray-300 line-clamp-3 mb-6">
            {movie.overview}
          </p>

          <div className="flex gap-4">
            <button className="bg-purple-600 px-6 py-2 rounded-md font-semibold">
              Watch Trailer
            </button>
            <button className="bg-gray-700/70 px-6 py-2 rounded-md">
              More Info
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {movies.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300
              ${i === index ? "bg-purple-500 w-5" : "bg-gray-400/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;