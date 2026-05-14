import { useParams, useLocation } from "react-router-dom";
import useFindMovieById from "../Hooks/useFindMovieById"
import { useSelector } from "react-redux";
import { IMAGE_URL } from "../assets/constants";
import MovieCard from "./MovieRow"
import BingCatButton from "../ReUsables/BingeCatButton"
import ReleaseDetails from "./ReleaseDetails";
import WatchProviderList from "./WatchProviderlist";
import useWatchProvider from "../Hooks/useWatchProviders";
import SeriesDetails from "./SeriesDetails";
import AwardsBanner from "./AwardsBanner";
import useGetCredits from "../Hooks/useGetCredits";
import CastContainer from "./CastContainer";
import MediaSection from "./MediaSection";
import useGetMediaById from "../Hooks/useGetMediaById";
import { Play, Heart, Bookmark } from "lucide-react";
import { useDispatch } from "react-redux";
import { addMovie } from "../store/slices/userSlice";



const MovieDetailsPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const type = location.pathname.includes("movies") ? "movie" : "tv";
    useFindMovieById(id, type);
    const credits = useGetCredits(id, type);
    const media = useGetMediaById(type, id);
    const movie = useSelector((state) =>
        type === "movie"
            ? state.movies.movieDetails
            : state.tvSeries.SeriesDetails
    );
    const dispatch = useDispatch();
    const watchlist = useSelector(
        (state) => state.user.watchList
    );
    if (!movie || !credits || !media) return <h1>Loading...</h1>;
    
    const isSaved = watchlist.some(
        (item) => item.id === movie.id
    );

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
                    <div className="flex gap-5">
                        <img
                            src={IMAGE_URL + movie.poster_path}
                            alt={movie.title}
                            className="w-[20vw] h-[60vh] rounded-2xl overflow-hidden shadow-lg m-10 "
                        />
                    </div>
                    <div className="mb-10 w-[65vw] h-[50vh] flex flex-col gap-2">
                        <h1 className="text-[3rem] font-bold">
                            {movie.title || movie.name}
                            <span className="text-gray-300 text-xl ml-4">
                                {(movie.release_date || movie.first_air_date)?.split("-")[0]}
                            </span>
                        </h1>
                        <p>{movie.genres?.map((genre) => genre.name).join(", ")}</p>
                        {movie.tagline && <p className="text-xl italic text-gray-400">{movie.tagline}</p>}
                        <div className="items-center gap-5 p-2">
                            <div className="flex gap-3">
                                <p> ⭐ {movie.vote_average?.toFixed(1)}</p>
                                <p>emoji</p>
                            </div>
                            <div className=" generic gap-3 mt-2 flex">
                                <BingCatButton variant="round"><Heart /></BingCatButton>
                                <BingCatButton variant="round"
                                    className={`px-1.5 ${isSaved
                                        ? "text-yellow-400"
                                        : "text-white"
                                        }`}
                                    onClick={() => { dispatch(addMovie(movie)) }}>
                                    <Bookmark />
                                </BingCatButton>
                                <BingCatButton variant="round"><Play /></BingCatButton>
                            </div>
                        </div>
                        <label className="">Overview</label>
                        <p className="text-xl text-gray-300 mb-6">
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
                <div className="leftpart w-[75%] p-10 border-r border-purple-700">
                    <AwardsBanner />
                    <div className="w-full text-xl p-5">
                        <CastContainer credits={credits} />
                        <p className="m-2">fullcast -</p>
                    </div>
                    <MediaSection media={media} />
                    <div className="w-full h-[20vh] border-y border-purple-700  text-xl p-5">
                        <label htmlFor=""> suggestons</label>
                        sugestion movie card

                    </div>
                </div>
                <div className="rightpart w-[25%] p-10" >

                    <div className="r">
                        {type === "movie" ? <ReleaseDetails movie={movie} /> : <SeriesDetails series={movie} />}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;