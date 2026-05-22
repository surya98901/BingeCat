import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import MovieContaier2 from "./MovieContainer2";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { Play, Heart, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";

import { IMAGE_URL } from "../assets/constants";

import useFindMovieById from "../Hooks/useFindMovieById";
import useGetCredits from "../Hooks/useGetCredits";
import useGetMediaById from "../Hooks/useGetMediaById";
import useGetRecommendtaions from "../Hooks/useGetRecommendtaions";
import MovieCard from "../components/MovieCard";
import { addMovie } from "../store/slices/userSlice";
import BingCatButton from "../ReUsables/BingeCatButton";
import ReleaseDetails from "./ReleaseDetails";
import SeriesDetails from "./SeriesDetails";
import AwardsBanner from "./AwardsBanner";
import CastContainer from "./CastContainer";
import MediaSection from "./MediaSection";
import VideoplayerAlert from "./VideoplayerAlert";
import MovieDetailsAlert from "./MovieDetailsAlert";
import { setType } from "../store/slices/typeSlice";

const MovieDetailsPage = () => {
  const [play, setPlay] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [activeId, setActiveId] = useState(null);

  const scrollRef = useRef(null);

  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const type = location.pathname.includes("movies") ? "movie" : "tv";
  useFindMovieById(id, type);
  useGetRecommendtaions(id, type);

  const credits = useGetCredits(id, type);
  const media = useGetMediaById(type, id);

  const movie = useSelector((state) =>
    type === "movie" ? state.movies.movieDetails : state.tvSeries.SeriesDetails,
  );

  const recommendations = useSelector((state) =>
    type === "movie"
      ? state.movies.recommendationMovieDetails
      : state.tvSeries.recommendationSeriesDetails,
  );

  const watchlist = useSelector((state) => state.user.watchList);

  const isSaved = watchlist.some((item) => item.id === movie?.id);

  if (!movie || !credits || !media) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="group relative h-[80vh] overflow-hidden text-white">
        <img
          key={movie.backdrop_path}
          src={IMAGE_URL + movie.backdrop_path}
          alt="banner"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <div className="relative z-10 mx-50 flex h-full items-end">
          <div className="flex gap-5">
            <img
              src={IMAGE_URL + movie.poster_path}
              alt={movie.title || movie.name}
              className="m-10 h-[60vh] w-[20vw] overflow-hidden rounded-2xl shadow-lg"
            />
          </div>

          <div className="mb-10 flex h-[50vh] w-[65vw] flex-col gap-3">
            <h1 className="text-[3rem] font-bold">
              {movie.title || movie.name}

              <span className="ml-4 text-xl text-gray-300">
                {(movie.release_date || movie.first_air_date)?.split("-")[0]}
              </span>
            </h1>

            <p>{movie.genres?.map((genre) => genre.name).join(", ")}</p>

            {movie.tagline && (
              <p className="text-xl italic text-gray-400">{movie.tagline}</p>
            )}

            <div className="items-center gap-5 p-2">
              <div className="flex gap-3">
                <p>⭐ {movie.vote_average?.toFixed(1)}</p>
              </div>

              <div className="mt-2 flex gap-3">
                <BingCatButton variant="round">
                  <Heart />
                </BingCatButton>

                <BingCatButton
                  variant="round"
                  className={`px-1.5 ${
                    isSaved ? "text-yellow-400" : "text-white"
                  }`}
                  onClick={() => dispatch(addMovie(movie))}
                >
                  <Bookmark />
                </BingCatButton>

                <BingCatButton variant="round" onClick={() => setPlay(true)}>
                  <Play />
                </BingCatButton>
              </div>
            </div>

            <label>Overview</label>

            <p className="mb-6 text-xl text-gray-300">{movie.overview}</p>
          </div>
        </div>
      </div>

      <div className="section-2 mx-30 flex p-2">
        <div className="leftpart w-[75%] border-r border-purple-700 p-10">
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

        <div className="rightpart w-[25%] p-10">
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
