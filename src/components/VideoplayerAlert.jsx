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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-hidden pt-10">
      <img
        src="public/pawlogo.png"
        alt="BingeCat Logo"
        className="absolute top-[8%] left-[25%] w-30 opacity-90 z-50 drop-shadow-[0_0_40px_rgba(168,85,247,0.45)]  "
      />
      <img
        src="public/applogo.png"
        alt="BingeCat Logo"
        className="absolute top-[0%] w-52 opacity-90 z-0 drop-shadow-[0_0_40px_rgba(168,85,247,0.45)] "
      />
      <img
        src="public/pawlogo.png"
        alt="BingeCat Logo"
        className="absolute top-[8%] right-[25%] w-30 opacity-90 z-50 drop-shadow-[0_0_40px_rgba(168,85,247,0.45)] "
      />

      <div className="relative z-10 w-[70%] h-[80%] rounded-3xl overflow-hidden border border-purple-700/40 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-700/20 bg-zinc-900/80 backdrop-blur-md">
          <div>
            <h1 className="text-white text-2xl font-semibold tracking-tight">
              {movie.title || movie.name}
            </h1>

            <p className="text-zinc-500 text-sm">Now Playing</p>
          </div>

          <button
            className="p-2 rounded-full hover:bg-purple-700/30 transition"
            onClick={() => setPlay(false)}
          >
            <X className="text-zinc-300 hover:text-white" size={24} />
          </button>
        </div>

        <div className="w-full h-[calc(100%-80px)] bg-black">
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
