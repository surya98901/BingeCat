import React from "react";
import BackgroundAnimation from "./BackGroundAnimation";
import { useSelector, useDispatch } from "react-redux";
import BingeCat from "./BingeCat";
import BingeCatButton from "../ReUsables/BingeCatButton";
import SignInPage from "./SignInPage";

const BasePage = () => {
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  const user = useSelector((state) => state.user.user);
  if (!movies) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <BackgroundAnimation movies={movies} />
      </div>

      {user ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <BingeCat />
        </div>
      ) : (
        <SignInPage />
      )}
    </div>
  );
};
export default BasePage;
