
import { API_OPTIONS } from "../assets/constants";
import { useDispatch } from "react-redux";
import { setWatchProviders} from "../store/slices/watchProviderslice";
import { useEffect } from "react";

const useWatchProvider = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    const getMoviewatchproviders = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(setWatchProviders(data.results.IN));
    };

    getMoviewatchproviders();
  }, [id, dispatch]);
};

export default useWatchProvider;