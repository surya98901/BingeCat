import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import MovieContaier2 from "./MovieContainer2";

import { Play, Heart, Bookmark } from "lucide-react";

import { IMAGE_URL } from "../assets/constants";

import useFindMovieById from "../Hooks/useFindMovieById";
import useGetCredits from "../Hooks/useGetCredits";
import useGetMediaById from "../Hooks/useGetMediaById";
import useGetRecommendtaions from "../Hooks/useGetRecommendtaions";
import { addMovie, addTvShow,addLikedMovie,addLikedTvShow } from "../store/slices/userSlice";

import BingCatButton from "../ReUsables/BingeCatButton";
import ReleaseDetails from "./ReleaseDetails";
import SeriesDetails from "./SeriesDetails";
import AwardsBanner from "./AwardsBanner";
import CastContainer from "./CastContainer";
import MediaSection from "./MediaSection";
import VideoplayerAlert from "./VideoplayerAlert";
import BackgroundAnimation from "./BackGroundAnimation";

const MovieDetailsPage = () => {
  const Loadingmovies = useSelector((state) => state.movies?.nowPlayingMovies);
  const [play, setPlay] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const type = location.pathname.includes("movies") ? "movie" : "tv";
  useFindMovieById(id, type);
  useGetRecommendtaions(id, type);

  const credits = useGetCredits(id, type);
  const media = useGetMediaById(id, type);

  const movie = useSelector((state) =>
    type === "movie" ? state.movies.movieDetails : state.tvSeries.SeriesDetails,
  );



  const recommendations = useSelector((state) =>
    type === "movie"
      ? state.movies.recommendationMovieDetails
      : state.tvSeries.recommendationSeriesDetails,
  );

  const movieWatchList = useSelector((state) => state.user.movieWatchList) || [];
  const tvShowWatchList = useSelector((state) => state.user.tvShowWatchList) || [];
  const watchlist = type === "movie" ? movieWatchList : tvShowWatchList;
  
  const likedMovies = useSelector((state) => state.user.likedMovies) || [];
  const likedTvShows = useSelector((state) => state.user.likedTvShows) || [];
  const liked = type === "movie" ? likedMovies : likedTvShows;
  const isLiked = liked.some((item) => item.id === movie?.id);

  const isSaved = watchlist.some((item) => item.id === movie?.id);

  if (!movie) {
    return <BackgroundAnimation movies={Loadingmovies} speed={0.5} />;
  }

  return (
    <div>
      <div className="group relative min-h-[85vh] md:h-[80vh] overflow-hidden text-white flex items-center md:items-end py-16 md:py-0">
        <img
          key={movie.backdrop_path}
          src={IMAGE_URL + movie.backdrop_path}
          alt="banner"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 md:bg-gradient-to-r md:from-black md:via-black/60 md:to-transparent" />

        <div className="relative z-10 mx-4 sm:mx-12 md:mx-20 lg:mx-30 flex flex-col md:flex-row h-full items-center md:items-end gap-6 w-full pb-8 pt-10 md:pt-0">
          <div className="flex-shrink-0">
            <img
              src={IMAGE_URL + movie.poster_path}
              alt={movie.title || movie.name}
              className="w-[150px] sm:w-[200px] md:w-[220px] lg:w-[250px] aspect-[2/3] overflow-hidden rounded-2xl shadow-lg border-2 border-purple-500/30"
            />
          </div>

          <div className="flex flex-col gap-3 w-full max-w-4xl px-4 md:px-0 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
              {movie.title || movie.name}

              <span className="ml-4 text-sm sm:text-base md:text-xl text-gray-300">
                {(movie.release_date || movie.first_air_date)?.split("-")[0]}
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-purple-400 font-medium">
              {movie.genres?.map((genre) => genre.name).join(", ")}
            </p>

            {movie.tagline && (
              <p className="text-sm sm:text-base md:text-lg italic text-zinc-400">
                "{movie.tagline}"
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 justify-center md:justify-start">
              <span className="bg-purple-700/60 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-xl text-sm sm:text-base border border-purple-500/20">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>

              <div className="flex gap-3">
                <BingCatButton variant="round" className={`w-10 h-10 flex items-center justify-center ${
                    isLiked ? "text-yellow-400" : "text-white"
                  }`}
                onClick={()=>{
                  dispatch(type=="movie" ? addLikedMovie(movie) : addLikedTvShow(movie))
                }}
                >
                  <Heart size={18} />
                </BingCatButton>

                <BingCatButton
                  variant="round"
                  className={`w-10 h-10 flex items-center justify-center ${
                    isSaved ? "text-yellow-400" : "text-white"
                  }`}
                  onClick={() => {
                    dispatch(
                      type == "movie" ? addMovie(movie) : addTvShow(movie),
                    );
                  }}
                >
                  <Bookmark size={18} />
                </BingCatButton>

                <BingCatButton variant="round" className="w-10 h-10 flex items-center justify-center" onClick={() => setPlay(true)}>
                  <Play size={18} />
                </BingCatButton>
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-500">Overview</label>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-2 mx-4 sm:mx-12 md:mx-20 lg:mx-30 flex flex-col lg:flex-row p-2 gap-6 lg:gap-10">
        <div className="leftpart w-full lg:w-[75%] border-b lg:border-b-0 lg:border-r border-purple-700/50 p-4 sm:p-10">
          <AwardsBanner />

          <div className="w-full p-5 text-xl">
            <CastContainer credits={credits} />
          </div>

          <MediaSection media={media} />

          <div className="w-full border-y border-purple-700 mt-5 text-xl">
            <label className="p-2">Suggestions</label>
            <MovieContaier2 movies={recommendations || []} />
          </div>
        </div>

        <div className="rightpart w-full lg:w-[25%] p-4 sm:p-10">
          {type === "movie" ? (
            <ReleaseDetails movie={movie} />
          ) : (
            <SeriesDetails series={movie} />
          )}
        </div>
      </div>

      <VideoplayerAlert
        movie={movie}
        play={play}
        setPlay={setPlay}
        type={type}
      />
    </div>
  );
};

export default MovieDetailsPage;
