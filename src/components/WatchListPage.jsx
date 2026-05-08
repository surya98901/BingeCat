import { useSelector } from "react-redux";

const WatchListPage = ()=>{
    const watchlist = useSelector(
        (state) => state.user.movieList
    );

    return (
        <div className="mt-20">
            
            <h1>watch list count : {watchlist.length}</h1>
        </div>
    )
}
export default WatchListPage;