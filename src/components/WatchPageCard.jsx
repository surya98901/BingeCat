import { IMAGE_URL } from "../assets/constants";
import { Bookmark, Heart, Star, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../store/slices/userSlice";

const WatchPageCard = ({ movie }) => {
  const dispatch = useDispatch();

  const isSaved = useSelector((state) =>
    state.user.watchlist?.some((m) => m.id === movie?.id),
  );

  const handleWatchlist = () => {
    dispatch(removeMovie(movie.id));
  };

  return (
    <div className="group relative flex w-full gap-5 overflow-hidden rounded-3xl border-2 border-purple-400/60 bg-white p-4 backdrop-blur-md transition-all duration-300 dark:border-purple-500/30 dark:bg-zinc-900/40">
      <div className="relative h-[220px] min-w-[320px] overflow-hidden rounded-2xl">
        <img
          src={
            movie.backdrop_path
              ? IMAGE_URL + movie.backdrop_path
              : "/fallback-image.jpg"
          }
          alt={movie.title || movie.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-yellow-400 backdrop-blur-md">
          <Star size={14} fill="currentColor" />
          {movie.vote_average?.toFixed(1)}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={handleWatchlist}
            className="rounded-full bg-zinc-200 p-2 transition dark:bg-white/5"
          >
            <X />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="line-clamp-1 text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              {movie.title || movie.name}

              <span className="ml-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {(movie.release_date || movie.first_air_date)?.split("-")[0]}
              </span>
            </h1>

            <div className="mt-2 h-[3px] w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>

          <p className="line-clamp-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <span className="font-semibold text-purple-500 dark:text-purple-400">
              Overview:
            </span>{" "}
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchPageCard;
