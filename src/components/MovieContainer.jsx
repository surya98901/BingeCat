import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const options = ["Streaming", "On TV", "For Rent", "In Theatres"];

const MovieContainer = ({ gene, type }) => {
    const [active, setActive] = useState(0);

    const popular = useSelector((state) => state.movies.popularMovies);
    const topRated = useSelector((state) => state.movies.topRatedMovies);
    const upcoming = useSelector((state) => state.movies.upcomingMovies);
    const nowPlaying = useSelector((state) => state.movies.nowPlayingMovies);

    const popularSeries = useSelector((state) => state.tvSeries.popularSeries);
    const topRatedSeries = useSelector((state) => state.tvSeries.topRatedSeries);
    const upcomingSeries = useSelector((state) => state.tvSeries.upcomingSeries);
    const nowPlayingSeries = useSelector((state) => state.tvSeries.nowPlayingSeries);

    let movies;
    if (type === "movie") {
        if (gene === "popular") movies = popular;
        else if (gene === "topRated") movies = topRated;
        else if (gene === "upcoming") movies = upcoming;
        else if (gene === "nowPlaying") movies = nowPlaying;
    } else {
        if (gene === "popular") movies = popularSeries;
        else if (gene === "topRated") movies = topRatedSeries;
        else if (gene === "upcoming") movies = upcomingSeries;
        else if (gene === "nowPlaying") movies = nowPlayingSeries;
    }
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    };

    useEffect(() => {
        checkScroll();
    }, [movies]);

    const scroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;

        const amount = el.clientWidth * 0.8;

        el.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });

        setTimeout(checkScroll, 300);
    };

    return (
        <div className="movie-container px-50 dark:bg-black py-5 rounded-xl">

            <div className="flex px-5 items-center gap-10 rounded-xl">
                <h1 className="text-lg font-semibold dark:text-white">
                    {gene.charAt(0).toUpperCase() + gene.slice(1)}
                </h1>
                <div className="relative flex w-[400px] bg-gray-300 dark:bg-gray-800 rounded-full p-1 overflow-hidden">
                    <div
                        className="absolute top-1 left-1 h-[calc(100%-8px)] bg-purple-600 rounded-full transition-all duration-300"
                        style={{
                            width: `calc((100% - 8px) / ${options.length})`,
                            transform: `translateX(${active * 100}%)`,
                        }}
                    />

                    {options.map((item, index) => (
                        <button
                            key={item}
                            onClick={() => setActive(index)}
                            className={`relative z-10 flex-1 py-1 text-sm font-medium text-center transition-colors
              ${active === index ? "text-white" : "text-black dark:text-gray-300"}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>


            <div className="relative group">
                {showLeft && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center 
            dark:bg-gradient-to-r from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition"
                    >
                        <ChevronLeft className="text-white bg-purple-600 p-2 dark:bg-none rounded-full " size={50} />
                    </button>
                )}

                {showRight && (
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center 
            dark:bg-gradient-to-l from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition"
                    >
                        <ChevronRight className="text-white bg-purple-600 p-2 dark:bg-none rounded-full " size={50} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-4 overflow-x-scroll py-5 px-6 scroll-smooth no-scrollbar"
                >
                    {movies?.map((movie) => (
                        <div key={movie.id} className="snap-start">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieContainer;