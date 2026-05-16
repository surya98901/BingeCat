import { useDispatch } from "react-redux";
import { addTrailer } from "../store/slices/moviesSlice";
import { addtvTrailer } from "../store/slices/tvSeriesSlice";
import { API_OPTIONS } from "../assets/constants";
import { useEffect } from "react";

const useMovieTrailer = (id, type = "movie") => {
  const dispatch = useDispatch();

  const getMovieVideo = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
        API_OPTIONS,
      );

      const data = await response.json();

      const trailers = data.results.filter(
        (item) => item.type === "Trailer" && item.site === "YouTube",
      );

      const officialTrailer = trailers.find((item) => item.official === true);

      const trailer =
        officialTrailer ||
        trailers.sort((a, b) => {
          if (b.size !== a.size) {
            return b.size - a.size;
          }

          return new Date(b.published_at) - new Date(a.published_at);
        })[0];

      if (type === "tv") {
        dispatch(addtvTrailer(trailer));
      } else {
        dispatch(addTrailer(trailer));
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    getMovieVideo();
  }, [id, type]);
};

export default useMovieTrailer;
