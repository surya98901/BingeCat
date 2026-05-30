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
  Menu,
  X,
} from "lucide-react";
import { setTheme } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { ToggleTheme } from "../store/slices/themeSlice";
import LogoTextTheme1 from "../svgs/LogoTextSVG";
import { useNavigate, Link } from "react-router-dom";
import SlideToSwitchPath from "../ReUsables/SlideToSwitchPath";
import BingeCatButton from "../ReUsables/BingeCatButton";
import { motion, AnimatePresence } from "framer-motion";
import { setType } from "../store/slices/typeSlice";
import { clearUser } from "../store/slices/userSlice";

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
  const user = useSelector((state) => state.user.currentUser);
  const type = useSelector((state) => state.type.currentType);
  const moviewatchlist =
    useSelector((state) => state.user.movieWatchList) || [];
  const tvshowwatchlist =
    useSelector((state) => state.user.tvShowWatchList) || [];
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTabClick = (index) => {
    setActive(index);
    navigate(tabs[index].path);
    dispatch(setType(tabs[index].val));
  };

  useEffect(() => {
    setActive(type === "movies" ? 0 : 1);
    setTheme(theme);
  }, [theme, type]);

  return (
    <header className="h-[8vh] min-h-[60px] fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white dark:bg-black px-2 sm:px-6 md:px-24 text-white" role="banner">
      <div className="flex flex-1 min-w-0 items-center">
        <div className="flex items-center gap-2 min-w-0">
          <img src={`${import.meta.env.BASE_URL}applogo.png`} alt="logo" className="w-[60px]" />
          <Link to={`/BingeCat/${type}`}>
            <div className="hidden sm:block shrink-0">
              <LogoTextTheme1 />
            </div>
          </Link>
          <div className="hidden sm:flex sm:max-w-[250px] md:max-w-[300px] min-w-0">
            <SlideToSwitchPath
              tabs={tabs}
              active={active}
              handleTabClick={handleTabClick}
            />
          </div>
        </div>
      </div>
      <div className="hidden sm:flex shrink-0 items-center gap-2 sm:justify-end">
        <div
          className="hidden sm:flex text-black dark:text-white items-center dark:bg-gray-900 rounded-full px-2 w-[180px] md:w-[220px] lg:w-[300px]
                        border border-gray-700 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/30"
        >
          <input
            type="text"
            placeholder="Search movies..."
            aria-label="Search movies"
            className="bg-transparent w-full text-sm placeholder-gray-400 
                            focus:outline-none focus:ring-0 border-none p-2"
          />
          <Search size={18} className="text-gray-400" />
        </div>
        {!user ? (
          <Link to="/BingeCat/">
            <BingeCatButton>Sign In</BingeCatButton>
          </Link>
        ) : (
          <>
            <nav aria-label="Desktop Navigation" className="flex gap-2 items-center hidden md:flex">
              {navButtons.map((btn) => (
                <Link to={btn.path} key={btn.label} aria-label={btn.label}>
                  <BingeCatButton
                    variant="ghost"
                    className="text-black dark:text-gray-400 relative flex gap-1"
                  >
                    {btn.icon}

                    <span>{btn.label}</span>

                    {btn.label === "Watchlist" &&
                      moviewatchlist.length + tvshowwatchlist.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-purple-700 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-semibold">
                          {moviewatchlist.length + tvshowwatchlist.length}
                        </span>
                      )}
                  </BingeCatButton>
                </Link>
              ))}
            </nav>

            <div className="flex gap-2 hidden sm:flex items-center">
              <BingeCatButton
                variant="ghost"
                className="text-black dark:text-gray-400"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </BingeCatButton>

              <BingeCatButton
                variant="ghost"
                className="text-black dark:text-gray-400"
                onClick={() => {
                  dispatch(clearUser());
                  navigate("/BingeCat/");
                }}
                title="Sign Out"
                aria-label="Sign Out"
              >
                <UserRound size={20} />
              </BingeCatButton>
            </div>
          </>
        )}
        <BingeCatButton
          variant="ghost"
          className="text-black dark:text-gray-400 rounded-full  hidden sm:flex"
          onClick={() => dispatch(ToggleTheme())}
          aria-label="Toggle Theme"
        >
          <SunMoon size={25} />
        </BingeCatButton>
      </div>
      
      {}
      <div className="flex items-center gap-1 sm:hidden">
        <button
          onClick={() => setShowMobileSearch((prev) => !prev)}
          aria-label="Toggle mobile search"
          aria-expanded={showMobileSearch}
          className="text-black dark:text-gray-400 rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <Search size={22} />
        </button>
        <button 
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          className="text-black dark:text-gray-400 rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <Menu />
        </button>
      </div>

      {}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-[8vh] left-0 right-0 z-40 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 sm:hidden shadow-lg overflow-hidden"
          >
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full px-3 py-1.5 border border-zinc-300 dark:border-zinc-800 focus-within:border-purple-500">
              <input
                type="text"
                placeholder="Search movies..."
                aria-label="Search movies"
                className="bg-transparent w-full text-sm placeholder-zinc-400 focus:outline-none text-black dark:text-white p-1"
                autoFocus
              />
              <Search size={18} className="text-zinc-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <AnimatePresence>
        {menuOpen && (
          <>
            {}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm sm:hidden"
            />
            {}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.05, duration: 0.35 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              className="fixed right-0 top-0 bottom-0 z-[110] w-[80vw] max-w-[320px] bg-white dark:bg-zinc-950 p-6 shadow-2xl flex flex-col gap-6 sm:hidden border-l border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between text-black dark:text-white">
                <div className="flex items-center gap-2">
                  <img src={`${import.meta.env.BASE_URL}applogo.png`} alt="logo" className="w-[45px]" />
                  <span className="font-bold text-lg text-purple-700 dark:text-purple-400">BingeCat</span>
                </div>
                <div className="flex items-center gap-1">
                  <BingeCatButton
                    variant="ghost"
                    className="text-black dark:text-gray-400 rounded-full"
                    onClick={() => dispatch(ToggleTheme())}
                    aria-label="Toggle Theme"
                  >
                    <SunMoon size={20} />
                  </BingeCatButton>
                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="p-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {}
              <nav className="flex flex-col gap-2" aria-label="Mobile Categories">
                <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Categories</label>
                <div className="flex w-full justify-center">
                  <SlideToSwitchPath
                    tabs={tabs}
                    active={active}
                    handleTabClick={(idx) => {
                      handleTabClick(idx);
                      setMenuOpen(false);
                    }}
                  />
                </div>
              </nav>

              {}
              <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
                <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Navigation</label>
                <div className="flex flex-col gap-2">
                  {navButtons.map((btn) => (
                    <Link
                      to={btn.path}
                      key={btn.label}
                      onClick={() => setMenuOpen(false)}
                      className="w-full"
                      aria-label={btn.label}
                    >
                      <BingeCatButton
                        variant="ghost"
                        className="w-full text-left justify-start flex gap-3 text-zinc-700 dark:text-zinc-300 py-2.5 px-4"
                      >
                        {btn.icon}
                        <span>{btn.label}</span>
                        {btn.label === "Watchlist" &&
                          moviewatchlist.length + tvshowwatchlist.length > 0 && (
                            <span className="ml-auto bg-purple-700 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-semibold">
                              {moviewatchlist.length + tvshowwatchlist.length}
                            </span>
                          )}
                      </BingeCatButton>
                    </Link>
                  ))}
                </div>
              </nav>

              {}
              <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800">
                {!user ? (
                  <Link
                    to="/BingeCat/"
                    onClick={() => setMenuOpen(false)}
                    className="w-full block"
                  >
                    <BingeCatButton className="w-full py-3 justify-center">
                      Sign In
                    </BingeCatButton>
                  </Link>
                ) : (
                  <BingeCatButton
                    onClick={() => {
                      dispatch(clearUser());
                      setMenuOpen(false);
                      navigate("/BingeCat/");
                    }}
                    className="w-full py-3 justify-center bg-red-600 hover:bg-red-700 text-white shadow-lg border-none"
                  >
                    Sign Out
                  </BingeCatButton>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
