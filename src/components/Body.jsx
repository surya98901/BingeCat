import {useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import useNowPlayingMovies  from "../hooks/useNowPlayingMovies";
import  useTopRatedMovies  from "../hooks/useTopRatedMovies";
import  usePopularMovies  from "../hooks/usePopularMovies";
import  useUpcomingMovies  from "../hooks/useUpcomingMovies"; 


const Body = () => {
const theme =useSelector(state => state.theme.theme);
    useNowPlayingMovies();
    useTopRatedMovies();
    usePopularMovies();
    useUpcomingMovies();
    return (
       <div className="text-black dark:bg-gray-900 dark:text-white min-h-screen ">
         <Header />
         <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
            <Outlet />
         </div>
         <Footer />
         
       </div>
    )
}
export default Body;