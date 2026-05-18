import { useSelector } from "react-redux";
import WatchPageCard from "./WatchPageCard";
import { those } from "../assets/constants";
import { Film } from "lucide-react";
import BingeCatButton from "../ReUsables/BingeCatButton";
import { Link } from "react-router-dom";

const WatchListPage = () => {
  const watchlist = useSelector((state) => state.user.watchList);

  return (
    <div className="m-15 p-10 flex flex-col items-center justify-center gap-5">
      {watchlist.length ? (
        watchlist.map((movie) => <WatchPageCard key={movie.id} movie={movie} />)
      ) : (
        <div className="flex flex-col items-center justify-center g">
          <div className="flex flex-col items-center justify-center gap-5 m-20">
            <Film size={50} />
            <h1 className="text-2xl mt-5 mb-2 text-purple-700 dark:text-purple-500 ">
              Your Watchlist is empty
            </h1>
            <p className="">
              Start adding movies and TV shows you want to watch later by
              clicking the bookmark icon.
            </p>
            <div className="flex gap-4 ">
              <Link to="/BingeCat/movies">
                <BingeCatButton variant="outline">
                  Discover Movies
                </BingeCatButton>
              </Link>
              <Link to="/BingeCat/series">
                <BingeCatButton>Discover TV Shows</BingeCatButton>
              </Link>
            </div>
          </div>
          <div className="flex  items-center justify-center gap-5">
            {those.map((item) => (
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
            <Link to={"/BingeCat/explore"}>
              <div className="bg-purple-700 rounded-full w-[400px] h-[50px] text-white text-xl flex justify-center items-center">
                Get Personalized Recommendations
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default WatchListPage;
