import React, { useState, useEffect } from "react";
import { Film, Tv, Search, SunMoon, Bell, UserRound } from "lucide-react";
import { setTheme, getTheme } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { ToggleTheme } from "../store/slices/themeSlice";
import LogoTextTheme1 from "../svgs/LogoTextSVG";
import { useNavigate } from "react-router-dom";
import { i } from "framer-motion/client";

const tabs = [
    { label: "Movies", icon: <Film size={14} />, path: "/BingeCat/movies" },
    { label: "Series", icon: <Tv size={14} />, path: "/BingeCat/series" },
];

const Header = () => {
    const theme = useSelector(state => state.theme.theme);
    const user = useSelector((state) => state.user.user);
    const [active, setActive] = useState(0);
    const navigate = useNavigate();

    function handleTabClick(index) {
        setActive(index);
        navigate(index === 0 ? "/BingeCat/movies" : "/BingeCat/series");
    }

    const dispatch = useDispatch();

    useEffect(() => {
        setTheme(theme);
    }, [theme]);

    return (
        <div className="h-[8vh] mx-auto  ">
            <div className="flex items-center  h-full dark:bg-black  px-50 text-white ">
                <div className="flex items-center w-[40%]">
                    <div className="flex items-center w-full">
                        <div className="flex items-center w-[50%]">
                            <img
                            src="Assets/images/app logo.png"
                            alt="logo"
                            className="w-[15%] "
                        />
                        <LogoTextTheme1 />
                        </div>

                        <div className="relative flex w-[25%] bg-gray-200 dark:bg-gray-800 rounded-full p-1 overflow-hidden">
                            <div
                                className="absolute top-1 left-1 h-[calc(100%-8px)] bg-purple-600 rounded-full transition-all duration-300"
                                style={{
                                    width: `calc((100% - 8px) / ${tabs.length})`,
                                    transform: `translateX(${active * 100}%)`,
                                }}
                            />
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab.label}
                                    onClick={() => handleTabClick(index)}
                                    className={`relative z-10 flex items-center justify-center gap-1 flex-1 py-1 text-sm font-medium transition-colors
                                    ${active === index ? "text-white" : "text-black dark:text-gray-300"}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>



                </div>

                <div className="flex items-center gap-6 w-[60%] justify-end">
                    <button className="text-black text-xs dark:text-white hover:text-gray-300 hover:bg-purple-700 p-2 text-sm rounded-xl">Discover</button>
                    <button className="text-black text-xs dark:text-white hover:text-gray-300 hover:bg-purple-700 p-2 text-sm rounded-xl">For You</button>
                    <button className="text-black text-xs dark:text-white hover:text-gray-300 hover:bg-purple-700 p-2 text-sm rounded-xl">Watchlist</button>
                    <div className="flex text-black dark:text-white items-center dark:bg-gray-900 rounded-full px-2  w-[40%] 
                        border border-gray-700 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="bg-transparent w-full text-sm placeholder-gray-400 
                         focus:outline-none focus:ring-0 border-none p-2"
                        />
                        <Search size={18} className="text-gray-400" />
                    </div>

                    {user ? (
                        <div className="flex gap-2">
                            <button className="text-sm text-black dark:text-white hover:text-white hover:bg-purple-700 p-2 rounded-lg font-semibold">
                                Sign in
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white text-sm p-2 rounded-lg font-semibold">
                                Sign up
                            </button>
                        </div>
                    ) :
                        (<div className="flex gap-2">
                            <button className="text-sm text-black dark:text-white hover:text-white hover:bg-purple-700 p-2 rounded-full font-semibold">
                                <Bell size={20} />
                            </button>
                            <button className="text-sm text-black dark:text-white hover:text-white hover:bg-purple-700 p-2 rounded-full font-semibold">
                                <UserRound size={20} />
                            </button>
                        </div>)
                    }
                    {(
                        <div className="text-sm text-black dark:text-gray-400 hover:text-white hover:bg-purple-700 p-2 rounded-full">
                            <button onClick={() => dispatch(ToggleTheme())}>
                                <SunMoon size={25} />
                            </button>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Header;