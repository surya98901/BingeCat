import { API_OPTIONS } from "../assets/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addGptSuggestedMovies } from "../store/slices/moviesSlice";;

const useSearchMovie = (queryList = []) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!queryList.length) return;

    const fetchMovies = async () => {
      try {
        const allResults = [];

        for (const query of queryList) {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
            API_OPTIONS
          );
          const data = await response.json();

          if (data?.results?.length) {
            allResults.push(...data.results); // add all matching results
          }
        }

        dispatch(addGptSuggestedMovies(allResults)); // dispatch once with all results
      } catch (error) {
        console.error("Failed to fetch GPT suggested movies:", error);
      }
    };

    fetchMovies();
  }, [JSON.stringify(queryList), dispatch]); // include JSON.stringify to track deep changes
};

export default useSearchMovie;
