import { useState, useEffect } from "react";
import {
  Film,
  Tv,
  Search,
  SunMoon,
  Bell,
  UserRound,
  Compass,
  Heart,
  Bookmark,
} from "lucide-react";
import { setTheme } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { ToggleTheme } from "../store/slices/themeSlice";
import LogoTextTheme1 from "../svgs/LogoTextSVG";
import { useNavigate, Link } from "react-router-dom";
import SlideToSwitchPath from "../ReUsables/SlideToSwitchPath";
import BingeCatButton from "../ReUsables/BingeCatButton";
import { label } from "framer-motion/client";
import { setType } from "../store/slices/typeSlice";

const tabs = [
  {
    label: "Movies",
    icon: <Film size={14} />,
    path: "/BingeCat/movies",
    val: "movies",
  },
  {
    label: "Series",
    icon: <Tv size={14} />,
    path: "/BingeCat/series",
    val: "series",
  },
];

const navButtons = [
  { label: "Explore", icon: <Compass size={20} />, path: "/BingeCat/explore" },
  { label: "For You", icon: <Heart size={20} />, path: "/BingeCat/for-you" },
  {
    label: "Watchlist",
    icon: <Bookmark size={20} />,
    path: "/BingeCat/watchlist",
  },
];

const Header = () => {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);
  const type = useSelector((state) => state.type.currentType);
  const watchlist = useSelector((state) => state.user.watchList);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loc = location.pathname.includes("movies") ? "movie" : "tv";
  dispatch(setType(loc === "movie" ? "movies" : "series"));

  const handleTabClick = (index) => {
    setActive(index);
    navigate(tabs[index].path);
    dispatch(setType(tabs[index].val));
  };

  useEffect(() => {
    setActive(type === "movies" ? 0 : 1);
    setTheme(theme);
  }, [theme]);

  return (
    <div className="h-[8vh] mx-auto fixed top-0 left-0 right-0 w-[full] z-50">
      <div className="flex items-center bg-white h-full dark:bg-black px-50 text-white">
        <div className="flex items-center w-[40%]">
          <div className="flex items-center w-full">
            <img src="public\applogo.png" alt="logo" className="w-[10%]" />
            <Link to={`/BingeCat/${type}`}>
              <LogoTextTheme1 />
            </Link>
            <SlideToSwitchPath
              tabs={tabs}
              active={active}
              handleTabClick={handleTabClick}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-[60%] justify-end">
          <div
            className="flex text-black dark:text-white items-center dark:bg-gray-900 rounded-full px-2 w-[40%]
                        border border-gray-700 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30"
          >
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-transparent w-full text-sm placeholder-gray-400 
                            focus:outline-none focus:ring-0 border-none p-2"
            />
            <Search size={18} className="text-gray-400" />
          </div>
          {user ? (
            <Link to="/BingeCat/">
              <BingeCatButton>Sign In</BingeCatButton>
            </Link>
          ) : (
            <>
              <div className="flex gap-2 items-center">
                {navButtons.map((btn) => (
                  <Link to={btn.path} key={btn.label}>
                    <BingeCatButton
                      variant="ghost"
                      className="text-black dark:text-gray-400 relative flex gap-1"
                    >
                      {btn.icon}

                      <span>{btn.label}</span>

                      {btn.label === "Watchlist" && watchlist.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-purple-700 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-semibold">
                          {watchlist.length}
                        </span>
                      )}
                    </BingeCatButton>
                  </Link>
                ))}
              </div>

              <div className="flex gap-2">
                <BingeCatButton
                  variant="ghost"
                  className="text-black dark:text-gray-400"
                >
                  <Bell size={20} />
                </BingeCatButton>

                <BingeCatButton
                  variant="ghost"
                  className="text-black dark:text-gray-400"
                >
                  <UserRound size={20} />
                </BingeCatButton>
              </div>
            </>
          )}
          <BingeCatButton
            variant="ghost"
            className="text-black dark:text-gray-400 rounded-full "
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
