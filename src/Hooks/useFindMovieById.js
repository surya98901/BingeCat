import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../assets/constants";
import { addMovieDetails } from "../store/slices/moviesSlice"; // fix path
import { addSeriesDetails } from "../store/slices/tvSeriesSlice";

const useFindMovieById = (id, type) => {
  const dispatch = useDispatch();

  const getDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
        API_OPTIONS,
      );
      const data = await response.json();

      if (type === "movie") {
        dispatch(addMovieDetails(data));
      } else {
        dispatch(addSeriesDetails(data));
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, [id, type]);
};
export default useFindMovieById;
