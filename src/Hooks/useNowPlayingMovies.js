import  {API_OPTIONS} from "../assets/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addMovie } from  "../store/slices/moviesSlice";;
import { addSeries } from "../store/slices/tvSeriesSlice";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    const NowPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?&page=1', API_OPTIONS);
        const movies = await data.json();
        dispatch(addMovie(movies.results));
    }
    const NowPlayingSeries = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', API_OPTIONS);
        const series = await data.json();
        dispatch(addSeries(series.results));
    }
    useEffect(() => {
        NowPlayingMovies();
        NowPlayingSeries();
    }, []);

    
}
export default useNowPlayingMovies;