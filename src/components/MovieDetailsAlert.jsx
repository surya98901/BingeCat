import { IMAGE_URL } from "../assets/constants";
import { Star, Bookmark } from "lucide-react";
import BingeCatButton from "../ReUsables/BingeCatButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addMovie, addTvShow } from "../store/slices/userSlice";

const MovieDetailsAlert = ({ movie }) => {
  const dispatch = useDispatch();

  const type = useSelector((state) => state.type.currentType);
  const watchlist =
    type === "movies"
      ? useSelector((state) => state.user.movieWatchList) || []
      : useSelector((state) => state.user.tvShowWatchList) || [];
  const isSaved = watchlist.some((item) => item.id === movie.id);

  return (
    <div className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden shadow-2xl text-white dark:border dark:border-gray-300">
      <img
        src={IMAGE_URL + movie.backdrop_path}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="absolute bottom-0 p-4 w-full">
        <h2 className="text-sm font-semibold">{movie.title}</h2>

        <div className="flex items-center gap-3 text-xs mt-1 text-gray-300">
          <span>{movie.release_date?.split("-")[0]}</span>

          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400" />

            {movie.vote_average?.toFixed(1)}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Link to={`/BingeCat/${type}/${movie.id}`} aria-label={`View details for ${movie.title}`}>
            <BingeCatButton variant="primary">Details</BingeCatButton>
          </Link>

          <BingeCatButton
            variant="ghost"
            className={`px-1.5 ${isSaved ? "text-yellow-400" : "text-white"}`}
            aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
            onClick={() => {
              dispatch(type == "movies" ? addMovie(movie) : addTvShow(movie));
            }}
          >
            <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
          </BingeCatButton>

          <BingeCatButton variant="ghost" aria-label="Like movie">👍</BingeCatButton>

          <BingeCatButton variant="ghost" aria-label="Dislike movie">👎</BingeCatButton>
        </div>

        <p className="text-xs text-gray-300 mt-2 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default MovieDetailsAlert;
