
import  {API_OPTIONS} from "../assets/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addTopRatedMovie } from "../store/slices/moviesSlice";
import { addTopRatedSeries } from "../store/slices/tvSeriesSlice";

const useTopRatedMovies = () => {

    const dispatch = useDispatch();
    const TopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS);
        const movies = await data.json();
        dispatch(addTopRatedMovie(movies.results));
    }
    const TopRatedSeries = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', API_OPTIONS);
        const series = await data.json();
        dispatch(addTopRatedSeries(series.results));
    }
    useEffect(() => {
        TopRatedMovies();
        TopRatedSeries();
    }, []);

    
}
export default useTopRatedMovies;