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
  UserStar,
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
import LikedContent from "./LikedContent";

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
  { label: "For You", icon: <UserStar size={20} />, path: "/BingeCat/for-you" },
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
  const likedMovies = useSelector((state) => state.user.likedMovies) || [];
  const likedTvShows = useSelector((state) => state.user.likedTvShows) || [];
  const moviewatchlist =
    useSelector((state) => state.user.movieWatchList) || [];
  const tvshowwatchlist =
    useSelector((state) => state.user.tvShowWatchList) || [];
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [profileTab, setProfileTab] = useState("details");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const active = type === "movies" ? 0 : 1;

  const handleTabClick = (index) => {
    navigate(tabs[index].path);
    dispatch(setType(tabs[index].val));
  };

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <header className="h-[8vh] min-h-[60px] fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white dark:bg-black px-2 lg:px-24 text-white" role="banner">
      <div className="flex flex-1 min-w-0 items-center">
        <div className="flex items-center gap-2 min-w-0">
          <img src={`${import.meta.env.BASE_URL}applogo.png`} alt="logo" className="w-[60px]" />
          <Link to={`/BingeCat/${type}`}>
            <div className="hidden lg:block shrink-0">
              <LogoTextTheme1 />
            </div>
          </Link>
          <div className="hidden lg:flex lg:max-w-[300px] min-w-0">
            <SlideToSwitchPath
              tabs={tabs}
              active={active}
              handleTabClick={handleTabClick}
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex shrink-0 items-center gap-2 lg:justify-end">
        <div
          className="hidden lg:flex text-black dark:text-white items-center dark:bg-gray-900 rounded-full px-2 w-[220px] lg:w-[300px]
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
            <nav aria-label="Desktop Navigation" className="flex gap-2 items-center hidden lg:flex">
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

            <div className="relative flex gap-2 hidden lg:flex items-center">
              <BingeCatButton
                variant="ghost"
                className="text-black dark:text-gray-400"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </BingeCatButton>

              <div className="relative">
                <BingeCatButton
                  variant="ghost"
                  className="text-black dark:text-gray-400"
                  onClick={() => {
                    setProfileDropdownOpen((prev) => !prev);
                    setProfileTab("details");
                  }}
                  aria-label="User Profile Options"
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                >
                  <UserRound size={20} />
                </BingeCatButton>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40 cursor-default" 
                        onClick={() => setProfileDropdownOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 p-4 flex flex-col gap-3 text-black dark:text-white"
                      >
                        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl" role="tablist" aria-label="Profile Tabs">
                          <button
                            role="tab"
                            aria-selected={profileTab === "details"}
                            aria-controls="profile-details-panel"
                            onClick={() => setProfileTab("details")}
                            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                              profileTab === "details"
                                ? "bg-white dark:bg-zinc-900 text-purple-700 dark:text-purple-400 shadow-sm"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                            }`}
                          >
                            User Details
                          </button>
                          <button
                            role="tab"
                            aria-selected={profileTab === "signout"}
                            aria-controls="profile-signout-panel"
                            onClick={() => setProfileTab("signout")}
                            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                              profileTab === "signout"
                                ? "bg-white dark:bg-zinc-900 text-red-500 shadow-sm"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                            }`}
                          >
                            Sign Out
                          </button>
                        </div>

                        {profileTab === "details" && (
                          <div id="profile-details-panel" role="tabpanel" aria-label="User Details Panel" className="flex flex-col gap-2">
                            <div className="flex flex-col bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Display Name</span>
                              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate mt-0.5">{user?.displayName || "Guest User"}</span>
                            </div>
                            <div className="flex flex-col bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">Email Address</span>
                              <span className="text-xs text-zinc-600 dark:text-zinc-300 truncate mt-0.5">{user?.email || "guest@bingecat.com"}</span>
                            </div>
                            <Link to={"/BingeCat/liked-content"}>
                              <div className="flex gap-2 items-center bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                              <span className="text-xs text-zinc-600 dark:text-zinc-300 truncate mt-0.5">Liked Content</span>
                              <span className="text-xs text-white bg-purple-700 rounded-full px-1.5 py-0.5 ml-auto">{likedMovies.length + likedTvShows.length || ""}</span>
                            </div>
                            </Link>
                          </div>
                        )}

                        {profileTab === "signout" && (
                          <div id="profile-signout-panel" role="tabpanel" aria-label="Sign Out Confirmation Panel" className="flex flex-col gap-3 text-center py-2">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 px-1">
                              Are you sure you want to sign out?
                            </p>
                            <button
                              onClick={() => {
                                dispatch(clearUser());
                                setProfileDropdownOpen(false);
                                navigate("/BingeCat/");
                              }}
                              className="w-full py-2.5 px-3 text-xs font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition duration-200 text-center cursor-pointer border-none"
                            >
                              Sign Out
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
        <BingeCatButton
          variant="ghost"
          className="text-black dark:text-gray-400 rounded-full  hidden lg:flex"
          onClick={() => dispatch(ToggleTheme())}
          aria-label="Toggle Theme"
        >
          <SunMoon size={25} />
        </BingeCatButton>
      </div>
      
      {}
      <div className="flex items-center gap-1 lg:hidden">
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
            className="absolute top-[8vh] left-0 right-0 z-40 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 lg:hidden shadow-lg overflow-hidden"
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
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
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
              className="fixed right-0 top-0 bottom-0 z-[110] h-[90vh] w-[80vw] max-w-[320px] bg-white dark:bg-zinc-950 p-6 shadow-2xl flex flex-col gap-6 lg:hidden border-l border-zinc-200 dark:border-zinc-800"
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
                  <Link to={"/BingeCat/liked-content"}>
                              <div className="flex gap-2 items-center bg-zinc-50 dark:bg-zinc-800/40 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                              <span className="text-xs text-zinc-600 dark:text-zinc-300 truncate mt-0.5">Liked Content</span>
                              <span className="text-xs text-white bg-purple-700 rounded-full px-1.5 py-0.5 ml-auto">{likedMovies.length + likedTvShows.length || ""}</span>
                            </div>
                            </Link>
                </div>
              </nav>

              {}
              <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
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
                  <>
                    <div className="flex flex-col bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-black dark:text-white">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">User Details</span>
                      <span className="text-sm font-bold truncate mt-1">{user?.displayName || "Guest User"}</span>
                      <span className="text-xs text-zinc-500 truncate mt-0.5">{user?.email || "guest@bingecat.com"}</span>
                    </div>
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
                  </>
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
