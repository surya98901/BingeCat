import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../assets/constants";
import { addRecommendationMovieDetails } from "../store/slices/moviesSlice";
import { addRecommendationSeriesDetails } from "../store/slices/tvSeriesSlice";

const useGetRecommendtaions = (id, type) => {
  const dispatch = useDispatch();

  const getDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US'`,
        API_OPTIONS,
      );

      const data = await response.json();

      if (type === "movie") {
        dispatch(addRecommendationMovieDetails(data.results));
      } else {
        dispatch(addRecommendationSeriesDetails(data.results));
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
export default useGetRecommendtaions;
