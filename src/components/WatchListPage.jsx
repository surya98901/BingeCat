import { useSelector } from "react-redux";
import WatchPageCard from "./WatchPageCard";

const WatchListPage = () => {
  const watchlist = useSelector((state) => state.user.watchList);

  return (
    <div className="m-15 p-10 flex flex-col items-center justify-center gap-5">
      <h1 className="text-5xl text-bold">Watch List</h1>

      {watchlist.length &&
        watchlist.map((movie) => (
          <WatchPageCard key={movie.id} movie={movie} />
        ))}
    </div>
  );
};
export default WatchListPage;
