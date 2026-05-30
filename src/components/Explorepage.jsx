import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import MovieCard from "./MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { genres, languages } from "../assets/constants";
import { setType } from "../store/slices/typeSlice";

const GENRE_MAP = {
  "Action & Adventure": [10759, 28, 12],
  "Animation": [16],
  "Comedy": [35],
  "Crime": [80],
  "Documentary": [99],
  "Drama": [18],
  "Family": [10751],
  "Kids": [10762],
  "Mystery": [9648],
  "News": [10763],
  "Reality": [10764],
  "Sci-Fi & Fantasy": [10765, 878, 14],
  "Soap": [10766],
  "Talk": [10767],
  "War & Politics": [10768, 10752],
  "Western": [37]
};

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
      data = data.filter((item) => {
        if (!item.genre_ids) return false;
        return item.genre_ids.some((id) =>
          selectedGenres.some((genreName) => {
            const mappedIds = GENRE_MAP[genreName];
            return mappedIds && mappedIds.includes(id);
          })
        );
      });
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
    <div className="mt-20 sm:mt-15 flex w-full justify-center px-4 sm:px-6 py-5">
      <div className="flex flex-col md:flex-row w-full max-w-[1600px] gap-8">
        <div className="mt-5 w-full md:w-[25%] lg:w-[20%] min-w-0 md:min-w-[280px]">
          <h1 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-white">
            Explore
          </h1>

          <div className="flex flex-col gap-1">
            <button className="flex h-10 w-full items-center justify-between rounded-xl bg-purple-700 px-5 text-lg font-bold text-white shadow-lg text-left focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none">
              <span>Sort</span>
              <ChevronRight size={20} />
            </button>

            <button className="flex h-10 w-full items-center justify-between rounded-xl bg-purple-700 px-5 text-lg font-bold text-white shadow-lg text-left focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none">
              <span>Where to Watch</span>
              <ChevronRight size={20} />
            </button>

            <div
              className={`overflow-hidden rounded-xl bg-purple-700 text-white shadow-lg transition-all duration-300 ${
                click ? "rounded-b-none" : ""
              }`}
            >
              <button
                onClick={() => setClick((prev) => !prev)}
                aria-expanded={click}
                aria-controls="explore-filters-panel"
                className="flex h-10 w-full cursor-pointer items-center justify-between px-5 text-lg font-bold text-left focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <span>Filters</span>

                {!click ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </button>

              {click && (
                <div id="explore-filters-panel" className="flex flex-col rounded-b-xl border border-purple-700 bg-[#ECECEC] text-black">
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
                      aria-label="Network"
                      className="w-full rounded-full border border-purple-700 bg-white px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="p-5">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      aria-label="Select Language"
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

        <div className="mt-6 flex w-full md:flex-1 flex-col min-w-0">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Explore : {showMe}
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400">
              {movies.length} Results
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.slice(0, load).map((movie) => (
              <div
                key={movie.id}
                className="relative w-full"
                onMouseEnter={() => setActiveId(movie.id)}
              >
                <motion.div
                  className="cursor-pointer w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/BingeCat/${type}/${movie.id}`} className="block w-full">
                    <MovieCard movie={movie} className="w-full" />
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          {}
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
