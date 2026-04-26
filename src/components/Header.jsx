import { useState, useEffect } from "react";
import { Film, Tv, Search, SunMoon, Bell, UserRound } from "lucide-react";
import { setTheme } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { ToggleTheme } from "../store/slices/themeSlice";
import LogoTextTheme1 from "../svgs/LogoTextSVG";
import { useNavigate } from "react-router-dom";
import SlideToSwitchPath from "../ReUsables/SlideToSwitchPath";
import BingeCatButton from "../ReUsables/BingeCatButton";

const tabs = [
    { label: "Movies", icon: <Film size={14} />, path: "/BingeCat/movies" },
    { label: "Series", icon: <Tv size={14} />, path: "/BingeCat/series" },
];

const navButtons = ["Explore", "For You", "Watchlist"];

const Header = () => {
    const theme = useSelector(state => state.theme.theme);
    const user = useSelector((state) => state.user.user);
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleTabClick = (index) => {
        setActive(index);
        navigate(tabs[index].path);
    };

    useEffect(() => {
        setTheme(theme);
    }, [theme]);

    return (
        <div className="h-[8vh] mx-auto fixed top-0 left-0 right-0 w-[full] z-50">
            <div className="flex items-center bg-white h-full dark:bg-black px-50 text-white">
                <div className="flex items-center w-[40%]">
                    <div className="flex items-center w-full">
                        <img
                            src="public\applogo.png"
                            alt="logo"
                            className="w-[10%]"
                        />
                        <LogoTextTheme1 />
                        <SlideToSwitchPath
                            tabs={tabs}
                            active={active}
                            handleTabClick={handleTabClick}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-6 w-[60%] justify-end">
                    <div className="flex text-black dark:text-white items-center dark:bg-gray-900 rounded-full px-2 w-[40%]
                        border border-gray-700 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="bg-transparent w-full text-sm placeholder-gray-400 
                            focus:outline-none focus:ring-0 border-none p-2"
                        />
                        <Search size={18} className="text-gray-400" />
                    </div>
                    {navButtons.map((btn) => (
                        <BingeCatButton key={btn} variant="ghost">
                            {btn}
                        </BingeCatButton>
                    ))}

                    {!user ? (
                        <div className="flex gap-2">
                            <BingeCatButton variant="ghost">Sign in</BingeCatButton>
                            <BingeCatButton variant="danger">Sign up</BingeCatButton>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <BingeCatButton variant="ghost" className="text-black dark:text-gray-400">
                                <Bell size={20} />
                            </BingeCatButton>
                            <BingeCatButton variant="ghost" className="text-black dark:text-gray-400">
                                <UserRound size={20} />
                            </BingeCatButton>
                        </div>
                    )}
                    <BingeCatButton
                        variant="ghost"
                        className="text-black dark:text-gray-400 rounded-full p-1"
                        onClick={() => dispatch(ToggleTheme())}
                    >
                        <SunMoon size={25} />
                    </BingeCatButton>

                </div>
            </div>
        </div>
    );
};

export default Header;