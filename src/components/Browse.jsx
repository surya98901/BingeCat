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
      <div className="flex flex-col items-center justify-center">
        <div className="flex  items-center justify-center gap-5">
          {those.map((item) => (
            <Link key={item.title} to={item.path}>
              <div
                key={item.title}
                className="w-[250px] h-[80px] rounded-3xl flex items-center justify-center border border-purple-700 gap-4"
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
        <div className="flex flex-col justify-center items-center gap-5 my-10">
          <p className="text-4xl font-bold mt-10">
            Can't decide what to watch ?
          </p>
          <p className="text-zink-800">
            Let BingeCat recommendation engine find the perfect movie based on
            your mood, favorite genres, and viewing history.
          </p>
          <Link to={"/BingeCat/for-you"}>
            <div className="bg-purple-700 rounded-full w-[400px] h-[50px] text-white text-xl flex justify-center items-center">
              Get Personalized Recommendations
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Browse;
