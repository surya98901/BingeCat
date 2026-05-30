import { useState, useRef } from "react";
import { IMAGE_URL } from "../assets/constants";
import MovieDetailsAlert from "./MovieDetailsAlert";

const MovieCard = ({ movie, className = "w-[calc((100vw-68px)/4)] sm:w-[160px] flex-shrink-0" }) => {
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef(null);
  const isLongPress = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });

  const handleStart = (e) => {
    isLongPress.current = false;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    touchStart.current = { x: clientX, y: clientY };

    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setShowModal(true);
      if (navigator.vibrate) {
        try {
          navigator.vibrate(50);
        } catch (err) {
          
        }
      }
    }, 600);
  };

  const handleMove = (e) => {
    if (!timerRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - touchStart.current.x;
    const dy = clientY - touchStart.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    
    if (distance > 10) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleClick = (e) => {
    if (isLongPress.current) {
      e.preventDefault();
      e.stopPropagation();
      isLongPress.current = false;
    }
  };

  return (
    <div
      className={`flex flex-col gap-1 sm:gap-2 ${className}`}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onClick={handleClick}
    >
      <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={IMAGE_URL + movie.poster_path}
          alt={`${movie.title || movie.name} poster`}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div 
          className={`absolute bottom-1 sm:bottom-2 left-1 sm:left-2 backdrop-blur-sm text-[9px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg flex items-center gap-0.5 sm:gap-1 ${
            movie.vote_average >= 8
              ? "text-emerald-400 border border-emerald-500/40 bg-black/75"
              : "text-yellow-400 border border-yellow-500/40 bg-black/75"
          }`}
          aria-label={`Rating: ${movie.vote_average?.toFixed(1)} out of 10`}
        >
          <span aria-hidden="true">★</span> {movie.vote_average?.toFixed(1)}
        </div>
      </div>

      <h1 className="text-xs sm:text-sm font-semibold dark:text-white line-clamp-1">
        {movie.title || movie.name}
      </h1>

      <p className="text-[10px] sm:text-xs text-gray-400 p-0.5">
        {(movie.release_date || movie.first_air_date)?.split("-")[0]}
      </p>

      {}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${movie.title || movie.name} preview`}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowModal(false);
          }}
        >
          <div
            className="relative scale-105 sm:scale-110 transition-transform duration-300"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowModal(false);
              }}
              aria-label="Close preview modal"
              className="absolute -top-3 -right-3 z-[2010] bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg font-bold border-2 border-white hover:bg-purple-800"
            >
              ✕
            </button>
            <MovieDetailsAlert movie={movie} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;