import { useParams, useLocation } from "react-router-dom";
import useFindMovieById from "../Hooks/useFindMovieById"
import { useSelector } from "react-redux";
import { IMAGE_URL } from "../assets/constants";
import MovieCard from "./MovieRow"
import BingCatButton from "../ReUsables/BingeCatButton"
import ReleaseDetails from "./ReleaseDetails";
import WatchProviderList from "./WatchProviderlist";
import useWatchProvider from "../Hooks/useWatchProviders";


const MovieDetailsPage = () => {
    const { id } = useParams();
    const location = useLocation();

    const type = location.pathname.includes("movies") ? "movie" : "tv";
    

    useFindMovieById(id, type);
  

    const movie = useSelector((state) =>
        type === "movie"
            ? state.movies.movieDetails
            : state.tvSeries.SeriesDetails
    );
    if (!movie ) return <h1>Loading...</h1>;

    return (
       <div className="">
        <div className="relative w-[full] h-[80vh] overflow-hidden text-white group ">
            <img
                key={movie.backdrop_path}
                src={IMAGE_URL + movie.backdrop_path}
                alt="banner"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="relative z-10 h-full flex items-end mx-50">
                <div>
                    <img
                    src={IMAGE_URL + movie.poster_path}
                    alt={movie.title}
                    className="w-[10vw] h-[40vh] rounded-2xl overflow-hidden shadow-lg m-10 "
                    />
                </div>
                <div className="mb-10 w-[65vw]">
                    <h1 className="text-[3rem] font-bold mb-2">
                        {movie.title || movie.name}
                        <span className="text-gray-400">
                            {(movie.release_date || movie.first_air_date)?.split("-")[0]}
                        </span>
                    </h1>
                    <p>adult ,  geners</p>
                    <div className="items-center gap-5 p-2">
                        <div className="flex gap-3">
                            <p> ⭐ {movie.vote_average?.toFixed(1)}</p>
                            <p>emoji</p>
                        </div>
                        <div className=" generic gap-3">
                            <BingCatButton variant="round">add to list</BingCatButton>
                            <BingCatButton variant="round">like</BingCatButton>
                            <BingCatButton variant="round">watch later</BingCatButton>
                            <BingCatButton variant="round">play trailer</BingCatButton>
                        </div>
                    </div>
                    <label>Overview</label>
                    <p className="text-xl text-gray-300 line-clamp-3 mb-6">
                        {movie.overview}
                    </p>
                    <p>
                        director info
                    </p>
                    <div className="flex gap-4">
                    </div>
                </div>
            </div>
        </div>
        <div className="section-2 flex mx-30 p-2">
            <div className="leftpart w-[60%] p-10 border-r border-purple-700">
                <div className="w-full h-[10vh] border border-purple-700 rounded-xl text-xl p-5">
                    Awards <span>wins/nominations</span>
                </div>
                <div className="w-full h-[20vh] border-y border-purple-700  text-xl p-5">
                    <label htmlFor="">Cast</label>
                    cast cards
                    <p>fullcast -</p>
                </div>
                <div className="w-full h-[20vh] border-y border-purple-700  text-xl p-5">
                    <label htmlFor=""> suggestons</label>
                    sugestion movie card
                    
                </div>
            </div>
            <div className="rightpart w-[30%] p-10" >
                
                <div className="r">
                   {type === "movie" ? <ReleaseDetails movie={movie} /> : <h1>TV series details</h1>}
                </div>
                
            </div>
        </div>
       </div>
    );
};

export default MovieDetailsPage;