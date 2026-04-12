

import  {API_OPTIONS} from "../assets/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addUpcomingMovie } from "../store/slices/moviesSlice";
import { addUpcomingSeries } from "../store/slices/tvSeriesSlice";

const useUpcomingMovie = () => {

    const dispatch = useDispatch();
    const UpComingMovie = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS);
        const movies = await data.json();
        dispatch(addUpcomingMovie(movies.results));
    }
    const UpComingSeries = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',API_OPTIONS);
        const series = await data.json();
        dispatch(addUpcomingSeries(series.results));
    }
    useEffect(() => {
        UpComingMovie();
        UpComingSeries();
    }, []);

    
}
export default useUpcomingMovie;