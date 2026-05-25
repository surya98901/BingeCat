import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Film, Trash2, Sparkles } from "lucide-react";

import WatchPageCard from "./WatchPageCard";
import SlideButtonsList from "../ReUsables/SlideButtonsList";
import BingeCatButton from "../ReUsables/BingeCatButton";

import { those } from "../assets/constants";

import {
  clearMovieWatchList,
  clearTvShowWatchList,
} from "../store/slices/userSlice";

const WatchListPage = () => {
  const dispatch = useDispatch();

  const [listType, setListType] = useState("movies");

  const movieWatchList =
    useSelector((state) => state.user.movieWatchList) || [];

  const tvShowWatchList =
    useSelector((state) => state.user.tvShowWatchList) || [];

  const totalItems = movieWatchList.length + tvShowWatchList.length;

  const currentList = useMemo(() => {
    return listType === "movies" ? movieWatchList : tvShowWatchList;
  }, [listType, movieWatchList, tvShowWatchList]);

  const handleClearAll = () => {
    dispatch(clearMovieWatchList());
    dispatch(clearTvShowWatchList());
  };

  const isCurrentListEmpty = currentList.length === 0;
  const isCompletelyEmpty = totalItems === 0;

  return (
    <section className="min-h-screen w-full px-4 pt-30 px-50 bg-white dark:bg-black">
      {!isCompletelyEmpty ? (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                My Watchlist
              </h1>

              <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base">
                Save movies and TV shows to watch later.
              </p>
            </div>

            <button
              onClick={handleClearAll}
              className="
                flex items-center justify-center gap-2
                border border-red-500/50
                text-red-500
                hover:bg-red-500 hover:text-white
                transition-all duration-300
                rounded-xl px-5 py-2.5
                text-sm font-medium
                w-full sm:w-fit
              "
            >
              <Trash2 size={16} />
              Clear Watchlist
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <SlideButtonsList
              options={["movies", "tv shows"]}
              active={listType}
              setActive={setListType}
            />

            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {totalItems} saved item
              {totalItems > 1 && "s"}
            </div>
          </div>
          <div>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm md:text-base">
              {listType === "movies"
                ? "Movies you've saved for later viewing."
                : "TV shows you've added to your watchlist."}
            </p>
          </div>

          {!isCurrentListEmpty ? (
            <div className="flex flex-col  gap-6">
              {currentList.map((item) => (
                <div
                  key={item.id}
                  className="transition-transform duration-300hover:-translate-y-1 "
                >
                  <WatchPageCard
                    movie={item}
                    type={listType == "movies" ? "movies" : "series"}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-300 
              dark:border-zinc-700 rounded-3xlbg-zinc-50 dark:bg-zinc-900/30"
            >
              <Film size={40} className="text-zinc-400 mb-4" />
              <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
                No {listType} added yet
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 mt-3 max-w-md">
                {listType === "movies"
                  ? "Start adding movies to build your personal watchlist."
                  : "Start adding TV shows to keep track of what you want to watch."}
              </p>

              <Link
                to={
                  listType === "movies"
                    ? "/BingeCat/movies"
                    : "/BingeCat/series"
                }
                className="mt-6"
              >
                <BingeCatButton>
                  Discover {listType === "movies" ? "Movies" : "TV Shows"}
                </BingeCatButton>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="max-w-2xl text-center flex flex-col items-center">
            <div
              className="
                w-24 h-24 rounded-full
                bg-purple-100 dark:bg-purple-900/30
                flex items-center justify-center
                mb-6
              "
            >
              <Film
                size={42}
                className="text-purple-700 dark:text-purple-400"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              Your Watchlist is Empty
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed text-sm md:text-base">
              Start saving movies and TV shows you want to watch later. Your
              personalized collection will appear here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
              <Link to="/BingeCat/movies">
                <BingeCatButton variant="outline" className="w-full sm:w-auto">
                  Discover Movies
                </BingeCatButton>
              </Link>

              <Link to="/BingeCat/series">
                <BingeCatButton className="w-full sm:w-auto">
                  Discover TV Shows
                </BingeCatButton>
              </Link>
            </div>
          </div>

          <div
            className="
              grid grid-cols-1 md:grid-cols-3
              gap-5 mt-16 w-full max-w-6xl
            "
          >
            {those.map((item) => (
              <div
                key={item.title}
                className="
                  group
                  rounded-3xl
                  border border-zinc-200 dark:border-zinc-800
                  bg-white dark:bg-zinc-900/40
                  backdrop-blur-sm
                  p-6
                  flex items-center gap-5
                  hover:border-purple-500/50
                  hover:shadow-xl
                  transition-all duration-300
                "
              >
                <div
                  className="
                    text-5xl
                    group-hover:scale-110
                    transition-transform duration-300
                  "
                >
                  {item.icon}
                </div>

                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {item.title}
                  </h2>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center text-center gap-5 mt-20 max-w-3xl">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Sparkles size={20} />
              <span className="font-medium">Personalized Discovery</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Not Sure What to Watch?
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
              Let BingeCat recommend movies and TV shows based on your mood,
              interests, favorite genres, and viewing history.
            </p>

            <Link to="/BingeCat/explore" className="w-full sm:w-auto">
              <div
                className="
                  mt-4
                  bg-purple-700 hover:bg-purple-600
                  transition-all duration-300
                  rounded-2xl
                  px-8 py-4
                  text-white
                  font-medium
                  shadow-lg shadow-purple-700/20
                  hover:shadow-purple-700/40
                  hover:-translate-y-1
                "
              >
                Get Personalized Recommendations
              </div>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default WatchListPage;
