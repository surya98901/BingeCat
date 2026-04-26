import { IMAGE_URL } from "../assets/constants";
import { Star } from "lucide-react";
import BingeCatButton from "../ReUsables/BingeCatButton"
import { Link, useLocation, useParams } from "react-router-dom";

const MovieDetailsAlert = ({ movie }) => {
    const loaction = useLocation();
    return (
        <div className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden shadow-2xl text-white dark:border dark:border-gray-300">
            <img
                src={IMAGE_URL + movie.backdrop_path}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="absolute bottom-0 p-4 w-full">
                <h2 className="text-sm font-semibold">
                    {movie.title}
                </h2>

                <div className="flex items-center gap-3 text-xs mt-1 text-gray-300">
                    <span>{movie.release_date?.split("-")[0]}</span>
                    <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400" />
                        {movie.vote_average?.toFixed(1)}
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                    <Link to = { `${movie.id}`} >
                        <BingeCatButton variant="primary">
                            Details
                        </BingeCatButton></Link>
                    <BingeCatButton variant="ghost" className="px-1.5">
                        +
                    </BingeCatButton>
                    <BingeCatButton variant="ghost">👍</BingeCatButton>
                    <BingeCatButton variant="ghost">👎</BingeCatButton>
                </div>

                <p className="text-xs text-gray-300 mt-2 line-clamp-3">
                    {movie.overview}
                </p>
            </div>
        </div>
    );
};

export default MovieDetailsAlert;