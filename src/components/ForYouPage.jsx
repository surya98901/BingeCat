import { useState, useEffect } from "react";
import { genres, languages, mood, eras, ratings, API_OPTIONS } from "../assets/constants";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../store/slices/typeSlice";
import { Link } from "react-router-dom";
import { clearChatAiSuggestedMovies } from "../store/slices/userSlice";

const MOVIE_GENRES = {
  "Action & Adventure": [28, 12],
  "Animation": [16],
  "Comedy": [35],
  "Crime": [80],
  "Documentary": [99],
  "Drama": [18],
  "Family": [10751],
  "Kids": [10751],
  "Mystery": [9648],
  "News": [99],
  "Reality": [99],
  "Sci-Fi & Fantasy": [878, 14],
  "Soap": [18],
  "Talk": [99],
  "War & Politics": [10752, 36],
  "Western": [37],
};

const TV_GENRES = {
  "Action & Adventure": [10759],
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
  "Sci-Fi & Fantasy": [10765],
  "Soap": [10766],
  "Talk": [10767],
  "War & Politics": [10768],
  "Western": [37],
};

const MOOD_GENRES = {
  "Happy": [35, 10751],
  "Dark": [27, 53, 9648],
  "Emotional": [18, 10749],
  "Exciting": [28, 12],
  "Relaxing": [99, 14],
  "Theilling": [53, 9648],
};

const steps = ["Genres", "Mood", "Eras", "Ratings", "Languages", "Summary"];

const ForYouPage = () => {
  const [step, setStep] = useState(0);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMood, setSelectedMood] = useState([]);
  const [selectedEras, setSelectedEras] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendedSeries, setRecommendedSeries] = useState([]);
  const [resultTab, setResultTab] = useState("movies");
  const dispatch = useDispatch();
  dispatch(setType(resultTab == "movies" ? "movies" : "series"))
  const pathType = useSelector((state)=>state.type.currentType)
  const chatAiSuggestedMovies = useSelector((state) => state.user.chatAiSuggestedMovies) || [];
  const toggleHandler = (value, state, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const renderButtons = (list, state, setState) => {
    return (
      <div className="flex flex-wrap gap-4">
        {list.map((item) => (
          <button
            key={item}
            onClick={() => toggleHandler(item, state, setState)}
            className={`rounded-2xl border px-6 py-3 text-sm font-semibold transition-all duration-200 ${
              state.includes(item)
                ? "border-purple-700 bg-purple-700 text-white shadow-lg"
                : "border-zinc-300 bg-white text-zinc-900 hover:border-purple-700 hover:bg-purple-700 hover:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    );
  };

  const handleFinish = async () => {
    setShowResults(true);
    setLoading(true);

    let movieGenreIds = [];
    selectedGenres.forEach((g) => {
      if (MOVIE_GENRES[g]) movieGenreIds.push(...MOVIE_GENRES[g]);
    });
    selectedMood.forEach((m) => {
      if (MOOD_GENRES[m]) movieGenreIds.push(...MOOD_GENRES[m]);
    });
    movieGenreIds = [...new Set(movieGenreIds)];

    let tvGenreIds = [];
    selectedGenres.forEach((g) => {
      if (TV_GENRES[g]) tvGenreIds.push(...TV_GENRES[g]);
    });
    selectedMood.forEach((m) => {
      if (MOOD_GENRES[m]) tvGenreIds.push(...MOOD_GENRES[m]);
    });
    tvGenreIds = [...new Set(tvGenreIds)];

    const langCodes = selectedLanguages
      .map((name) => languages.find((lang) => lang.language === name)?.code)
      .filter(Boolean);

    let minRating = 0;
    if (selectedRatings.includes("Top Rated (8+)")) {
      minRating = 8;
    } else if (selectedRatings.includes("Good (6+)")) {
      minRating = 6;
    }

    let minDate = "";
    let maxDate = "";
    const eraDates = {
      Latest: { gte: "2024-01-01", lte: "" },
      "2020s": { gte: "2020-01-01", lte: "2029-12-31" },
      "2010s": { gte: "2010-01-01", lte: "2019-12-31" },
      "2000s": { gte: "2000-01-01", lte: "2009-12-31" },
      "90s": { gte: "1990-01-01", lte: "1999-12-31" },
      Classic: { gte: "1940-01-01", lte: "1989-12-31" },
    };

    if (!selectedEras.includes("All Eras") && selectedEras.length > 0) {
      const gtes = selectedEras.map((e) => eraDates[e]?.gte).filter(Boolean);
      const ltes = selectedEras.map((e) => eraDates[e]?.lte).filter(Boolean);

      if (gtes.length > 0) {
        gtes.sort();
        minDate = gtes[0];
      }
      if (ltes.length > 0) {
        ltes.sort();
        maxDate = ltes[ltes.length - 1];
      }
    }

    try {
      let movieUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1`;
      if (movieGenreIds.length > 0) movieUrl += `&with_genres=${movieGenreIds.join("|")}`;
      if (langCodes.length > 0) movieUrl += `&with_original_language=${langCodes.join("|")}`;
      movieUrl += `&vote_average.gte=${minRating}&vote_count.gte=50`;
      if (minDate) movieUrl += `&primary_release_date.gte=${minDate}`;
      if (maxDate) movieUrl += `&primary_release_date.lte=${maxDate}`;

      let tvUrl = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&page=1`;
      if (tvGenreIds.length > 0) tvUrl += `&with_genres=${tvGenreIds.join("|")}`;
      if (langCodes.length > 0) tvUrl += `&with_original_language=${langCodes.join("|")}`;
      tvUrl += `&vote_average.gte=${minRating}&vote_count.gte=50`;
      if (minDate) tvUrl += `&first_air_date.gte=${minDate}`;
      if (maxDate) tvUrl += `&first_air_date.lte=${maxDate}`;

      const [movieRes, tvRes] = await Promise.all([
        fetch(movieUrl, API_OPTIONS),
        fetch(tvUrl, API_OPTIONS),
      ]);

      const movieData = await movieRes.json();
      const tvData = await tvRes.json();

      setRecommendedMovies(movieData.results || []);
      setRecommendedSeries(tvData.results || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedGenres([]);
    setSelectedMood([]);
    setSelectedEras([]);
    setSelectedRatings([]);
    setSelectedLanguages([]);
    setRecommendedMovies([]);
    setRecommendedSeries([]);
    setShowResults(false);
    setResultTab("movies");
  };

  const nextHandler = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const backHandler = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  if (chatAiSuggestedMovies.length > 0) {
    return (
      <div className="min-h-screen w-full px-4 sm:px-12 md:px-24 lg:px-32 xl:px-48 pt-24 sm:pt-30 bg-white dark:bg-black">
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                AI Chat Picks
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base">
                Here are the recommendations recommended by the BingeCat Assistant in the chat.
              </p>
            </div>
            <button
              onClick={() => {
                dispatch(clearChatAiSuggestedMovies());
                handleReset();
              }}
              className="rounded-2xl border border-purple-700 px-6 py-3 text-sm font-bold text-purple-700 hover:bg-purple-700 hover:text-white transition duration-300 w-full md:w-auto"
            >
              Clear Recommendations
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {chatAiSuggestedMovies.map((movie) => {
              const movieType = "title" in movie && !("name" in movie) ? "movies" : "series";
              return (
                <Link to={`/BingeCat/${movieType}/${movie.id}`} key={movie.id}>
                  <MovieCard
                    movie={{ ...movie, type: movieType === "movies" ? "movies" : "series" }}
                    className="w-full transition-all duration-300 hover:scale-[1.03]"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen w-full px-4 sm:px-12 md:px-24 lg:px-32 xl:px-48 pt-24 sm:pt-30 bg-white dark:bg-black">
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                Picks For You
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base">
                Here are your personalized recommendations based on your preferences.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="rounded-2xl border border-purple-700 px-6 py-3 text-sm font-bold text-purple-700 hover:bg-purple-700 hover:text-white transition duration-300 w-full md:w-auto"
            >
              Reset Filters
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">Curating your customized watch list...</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-1">
                <button
                  onClick={() => setResultTab("movies")}
                  className={`pb-3 text-lg font-bold transition-all relative ${
                    resultTab === "movies"
                      ? "text-purple-700 dark:text-purple-400"
                      : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  }`}
                >
                  Movies ({recommendedMovies.length})
                  {resultTab === "movies" && (
                    <motion.div
                      layoutId="resultTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple-700 dark:bg-purple-400 rounded-full"
                    />
                  )}
                </button>
                <button
                  onClick={() => setResultTab("series")}
                  className={`pb-3 text-lg font-bold transition-all relative ${
                    resultTab === "series"
                      ? "text-purple-700 dark:text-purple-400"
                      : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  }`}
                >
                  TV Series ({recommendedSeries.length})
                  {resultTab === "series" && (
                    <motion.div
                      layoutId="resultTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple-700 dark:bg-purple-400 rounded-full"
                    />
                  )}
                </button>
              </div>

              {/* Grid of Results */}
              {resultTab === "movies" ? (
                recommendedMovies.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {recommendedMovies.map((movie) => (
                      <Link to={`/BingeCat/${pathType}/${movie.id}`} key={movie.id}>
                      <MovieCard
                        movie={{ ...movie, type: "movie" }}
                        className="w-full transition-all duration-300 hover:scale-[1.03]"
                      />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-20 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30">
                    <p className="text-zinc-500 dark:text-zinc-400">No movies found matching those exact options.</p>
                  </div>
                )
              ) : (
                recommendedSeries.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {recommendedSeries.map((series) => (
                      <Link to={`/BingeCat/${pathType}/${series.id}`} key={series.id}>
                      <MovieCard
                        movie={{ ...series, type: "series" }}
                        className="w-full transition-all duration-300 hover:scale-[1.03]"
                      />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-20 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30">
                    <p className="text-zinc-500 dark:text-zinc-400">No TV shows found matching those exact options.</p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-screen px-6 pt-30">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-5xl font-bold text-zinc-900 dark:text-white">
          Personalized Recommendations
        </h1>

        <p className="mt-3 text-lg text-zinc-700 dark:text-zinc-400">
          Tell us what you like and we’ll pick the best
        </p>

        <div className="mt-14 flex w-full max-w-[1100px] flex-col">
          <div className="mb-10 flex items-center gap-3 overflow-x-auto">
            {steps.map((item, index) => (
              <div
                key={item}
                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                  index === step
                    ? "bg-purple-700 text-white"
                    : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {step === 0 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Pick your genres
              </h2>

              {renderButtons(genres, selectedGenres, setSelectedGenres)}
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Choose your mood
              </h2>

              {renderButtons(mood, selectedMood, setSelectedMood)}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Select preferred eras
              </h2>

              {renderButtons(eras, selectedEras, setSelectedEras)}
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Rating preference
              </h2>

              {renderButtons(ratings, selectedRatings, setSelectedRatings)}
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Preferred languages
              </h2>

              {renderButtons(
                languages.map((lang) => lang.language),
                selectedLanguages,
                setSelectedLanguages,
              )}
            </>
          )}

          {step === 5 && (
            <div className="rounded-3xl border border-zinc-300 bg-white p-8 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
              <h2 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white">
                Your Preferences
              </h2>

              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Genres
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedGenres.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Mood
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedMood.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Eras
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedEras.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Ratings
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedRatings.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Languages
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedLanguages.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-14 flex items-center justify-between">
            <button
              onClick={backHandler}
              disabled={step === 0}
              className="rounded-2xl border border-purple-700 px-8 py-4 text-lg font-bold text-purple-700 transition hover:bg-purple-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            <button
              onClick={nextHandler}
              className="rounded-2xl bg-purple-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-purple-800"
            >
              {step === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYouPage;
