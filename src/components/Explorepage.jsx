import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import MovieCard from "./MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { genres, languages } from "../assets/constants";
import { setType } from "../store/slices/typeSlice";

const Explorepage = () => {
  const [click, setClick] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [load, setLoad] = useState(15);

  const dispatch = useDispatch();

  const type = useSelector((state) => state.type.currentType);

  const [showMe, setShowMe] = useState(
    type === "movies" ? "Movies" : "Tv Shows",
  );

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [network, setNetwork] = useState("");
  const [language, setLanguage] = useState("");

  const {
    popularMovies = [],
    topRatedMovies = [],
    upcomingMovies = [],
    nowPlayingMovies = [],
  } = useSelector((state) => state.movies);

  const {
    popularSeries = [],
    topRatedSeries = [],
    upcomingSeries = [],
    nowPlayingSeries = [],
  } = useSelector((state) => state.tvSeries);

  const movieData = [
    ...popularMovies,
    ...topRatedMovies,
    ...upcomingMovies,
    ...nowPlayingMovies,
  ];

  const seriesData = [
    ...popularSeries,
    ...topRatedSeries,
    ...upcomingSeries,
    ...nowPlayingSeries,
  ];

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  const switchTypes = (item) => {
    setShowMe(item);

    dispatch(setType(item === "Movies" ? "movies" : "series"));

    setLoad(15);
  };

  const movies = useMemo(() => {
    let data = showMe === "Movies" ? movieData : seriesData;

    if (selectedGenres.length) {
      data = data.filter((item) =>
        item.genre_names?.some((g) => selectedGenres.includes(g)),
      );
    }

    if (network.trim()) {
      data = data.filter((item) =>
        item?.origin_country
          ?.join("")
          .toLowerCase()
          .includes(network.toLowerCase()),
      );
    }

    if (language) {
      data = data.filter((item) => item.original_language === language);
    }

    return data.filter(
      (item, index, self) => index === self.findIndex((m) => m.id === item.id),
    );
  }, [showMe, selectedGenres, network, language, movieData, seriesData]);

  return (
    <div className="mt-20 sm:mt-24 flex w-full justify-center px-6 py-5">
      <div className="flex flex-col md:flex-row w-full max-w-[1600px] gap-8">
        <div className="mt-5 w-full md:w-[25%] lg:w-[20%] min-w-0 md:min-w-[280px]">
          <h1 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-white">
            Explore
          </h1>

          <div className="flex flex-col gap-1">
            <div className="flex h-10 items-center justify-between rounded-xl bg-purple-700 px-5 text-lg font-bold text-white shadow-lg">
              <p>Sort</p>
              <ChevronRight size={20} />
            </div>

            <div className="flex h-10 items-center justify-between rounded-xl bg-purple-700 px-5 text-lg font-bold text-white shadow-lg">
              <p>Where to Watch</p>
              <ChevronRight size={20} />
            </div>

            <div
              className={`overflow-hidden rounded-xl bg-purple-700 text-white shadow-lg transition-all duration-300 ${
                click ? "rounded-b-none" : ""
              }`}
            >
              <div
                onClick={() => setClick((prev) => !prev)}
                className="flex h-10 cursor-pointer items-center justify-between px-5 text-lg font-bold"
              >
                <p>Filters</p>

                {!click ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </div>

              {click && (
                <div className="flex flex-col rounded-b-xl border border-purple-700 bg-[#ECECEC] text-black">
                  <div className="flex flex-col gap-3 border-b border-zinc-300 p-5">
                    <p className="font-bold">Show Me</p>

                    {["Movies", "Tv Shows"].map((item) => (
                      <label
                        key={item}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="radio"
                          name="showMe"
                          checked={showMe === item}
                          onChange={() => switchTypes(item)}
                        />

                        {item}
                      </label>
                    ))}
                  </div>

                  <div className="border-b border-zinc-300 p-5">
                    <p className="mb-4 font-bold">Genres</p>

                    <div className="flex flex-wrap gap-3">
                      {genres.map((genre) => (
                        <button
                          key={genre}
                          onClick={() => toggleGenre(genre)}
                          className={`rounded-full border px-4 py-1 text-sm transition ${
                            selectedGenres.includes(genre)
                              ? "border-purple-700 bg-purple-700 text-white"
                              : "border-purple-700 text-black hover:bg-purple-700 hover:text-white"
                          }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-b border-zinc-300 p-5">
                    <p className="mb-4 font-bold">Network</p>

                    <input
                      type="text"
                      value={network}
                      onChange={(e) => setNetwork(e.target.value)}
                      placeholder="e.g. US"
                      className="w-full rounded-full border border-purple-700 bg-white px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="p-5">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-lg border border-zinc-400 bg-white p-3 outline-none"
                    >
                      <option value="">Language</option>

                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.language} ({lang.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full md:w-[75%] lg:w-[80%] flex-col">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Explore : {showMe}
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400">
              {movies.length} Results
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.slice(0, load).map((movie) => (
              <div
                key={movie.id}
                className="relative"
                onMouseEnter={() => setActiveId(movie.id)}
              >
                <motion.div
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/BingeCat/${type}/${movie.id}`}>
                    <MovieCard movie={movie} className="w-full" />
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          {/* LOAD MORE */}
          {load < movies.length && (
            <button
              className="mt-10 w-full max-w-[320px] self-center rounded-xl bg-purple-700 px-6 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-purple-800"
              onClick={() => setLoad((prev) => prev + 15)}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorepage;
