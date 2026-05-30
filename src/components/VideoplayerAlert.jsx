import { X } from "lucide-react";
import useMovieTrailer from "../Hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoplayerAlert = ({ movie, play, setPlay, type }) => {
  useMovieTrailer(movie.id, type);
  const trailer = useSelector((state) =>
    type === "tv" ? state.tvSeries.trailer : state.movies.trailer,
  );
  if (!play) return null;
  if (!trailer) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <p className="text-white text-xl">Loading Trailer...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-hidden p-3 sm:p-5">
      <img
        src={`${import.meta.env.BASE_URL}pawlogo.png`}
        alt="BingeCat Logo"
        className="hidden md:block absolute top-[5%] left-[30%] w-30 opacity-90 z-50 drop-shadow-[0_0_40px_rgba(168,85,247,0.45)]"
      />
      <img
        src={`${import.meta.env.BASE_URL}applogo.png`}
        alt="BingeCat Logo"
        className="absolute top-[2%] md:top-[0%] w-16 sm:w-24 md:w-52 opacity-90 z-50 md:z-0 left-1/2 -translate-x-1/2 drop-shadow-[0_0_30px_rgba(168,85,247,0.45)]"
      />
      <img
        src={`${import.meta.env.BASE_URL}pawlogo.png`}
        alt="BingeCat Logo"
        className="hidden md:block absolute top-[5%] right-[30%] w-30 opacity-90 z-50 drop-shadow-[0_0_40px_rgba(168,85,247,0.45)]"
      />

      <div className="relative z-10 w-[95%] sm:w-[90%] md:w-[75%] h-[50vh] sm:h-[70vh] md:h-[80%] max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-700/40 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-[0_0_40px_rgba(168,85,247,0.25)] flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-purple-700/20 bg-zinc-900/80 backdrop-blur-md">
          <div className="min-w-0 flex-1">
            <h1 className="text-white text-base sm:text-xl md:text-2xl font-semibold tracking-tight truncate pr-4">
              {movie.title || movie.name}
            </h1>

            <p className="text-zinc-500 text-xs sm:text-sm">Now Playing</p>
          </div>

          <button
            className="p-2 rounded-full hover:bg-purple-700/30 transition flex-shrink-0"
            onClick={() => setPlay(false)}
          >
            <X className="text-zinc-300 hover:text-white" size={20} />
          </button>
        </div>

        <div className="w-full flex-1 bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoplayerAlert;
