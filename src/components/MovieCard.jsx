import { IMAGE_URL } from "../assets/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-[160px] flex flex-col gap-2 mx-2 flex-shrink-0">

      <div className="relative h-[240px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={IMAGE_URL + movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
          ⭐ {movie.vote_average?.toFixed(1)}
        </div>
      </div>

      <h1 className="text-sm font-semibold dark:text-white line-clamp-1">
        {movie.title || movie.name}
      </h1>

      <p className="text-xs text-gray-400 p-1">
        {(movie.release_date || movie.first_air_date)?.split("-")[0]}
      </p>
    </div>
  );
};

export default MovieCard;