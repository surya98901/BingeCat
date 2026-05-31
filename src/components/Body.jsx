import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import BingecatChatAI from "./BingecatChatAI";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser, clearUser } from "../store/slices/userSlice";

const Body = () => {
  const dispatch = useDispatch();

  useNowPlayingMovies();
  useTopRatedMovies();
  usePopularMovies();
  useUpcomingMovies();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="text-black dark:bg-gray-900 dark:text-white min-h-screen ">
      <Header />
      <div className="inset-0 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <Outlet />
      </div>
      <Footer />
      <BingecatChatAI />
    </div>
  );
};
export default Body;
