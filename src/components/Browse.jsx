import MovieContainer from "./MovieContainer";
import Banner from "./Banner";
import { div } from "framer-motion/client";
import { genes, those } from "../assets/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Browse = ({ type }) => {
  const currUser = useSelector((state) => state.user.user);
  const containerType = type === "movie" ? "movie" : "series";
  return (
    <div className="browse-page relative  min-h-screen bg-white dark:bg-black">
      <Banner type={containerType} />

      {genes.map((gene) => (
        <MovieContainer key={gene} gene={gene} type={containerType} />
      ))}
      <div className="flex flex-col items-center justify-center px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
          {those.map((item) => (
            <Link key={item.title} to={item.path} className="w-full sm:w-auto flex justify-center">
              <div
                key={item.title}
                className="w-full max-w-[280px] sm:w-[250px] h-[80px] rounded-3xl flex items-center justify-center border border-purple-700 gap-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h1 className="dark:text-white text-xl font-semibold tracking-tight">
                    {item.title}
                  </h1>
                  <p className="text-zinc-500 ">{item.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center gap-5 my-10 max-w-3xl text-center">
          <p className="text-2xl sm:text-4xl font-bold mt-10">
            Can't decide what to watch?
          </p>
          <p className="text-zinc-800 dark:text-zinc-300 px-4">
            Let BingeCat recommendation engine find the perfect movie based on
            your mood, favorite genres, and viewing history.
          </p>
          <Link to={"/BingeCat/for-you"} className="w-full max-w-[400px]">
            <div className="bg-purple-700 rounded-full w-full h-[50px] text-white text-base sm:text-xl flex justify-center items-center hover:bg-purple-800 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition duration-300 px-4">
              Get Personalized Recommendations
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Browse;
