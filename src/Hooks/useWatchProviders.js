
import { API_OPTIONS } from "../assets/constants";
import { useDispatch } from "react-redux";
import { setWatchProviders} from "../store/slices/watchProviderslice";
import { useEffect } from "react";

const useWatchProvider = (id) => {
    const dispatch = useDispatch();
  const getMoviewatchproviders = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
      API_OPTIONS
    );
    const data = await response.json();
    console.log(data.results.IN);
    dispatch(setWatchProviders(data.results.IN));
  };

  const lst = useEffect(() => {
    getMoviewatchproviders(id);
  }, []);
};

export default useWatchProvider;