
import React from "react";
import BackgroundAnimation from "./BackGroundAnimation";
import { useSelector,useDispatch } from "react-redux";
import BingeCat from "./BingeCat";

const BasePage = () => {

const movies = useSelector((state) => state.movies?.nowPlayingMovies);
if (!movies) {
    return <div className="text-white">Loading...</div>;
  }

 return (
  <div className="relative w-full h-screen overflow-hidden">

    <div className="absolute inset-0 z-0">
      <BackgroundAnimation movies={movies} />
    </div>

    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <BingeCat />
    </div>

  </div>
);
}
export default BasePage;