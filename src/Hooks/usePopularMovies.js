
import  {API_OPTIONS} from "../assets/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addPopularMovie } from "../store/slices/moviesSlice";
import { addPopularSeries } from "../store/slices/tvSeriesSlice";

const useNowPopularMovies = () => {

    const dispatch = useDispatch();
    const PopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS);
        const movies = await data.json();
        dispatch(addPopularMovie(movies.results));
    }
    const PopularSeries = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', API_OPTIONS);
        const series = await data.json();
        dispatch(addPopularSeries(series.results));
    }
    useEffect(() => {
        PopularMovies();
        PopularSeries();
    }, []);

    
}
export default useNowPopularMovies;