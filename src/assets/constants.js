import { Film, Tv } from "lucide-react";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
};

export const tabs = [
  { label: "Movies", icon: Film, path: "/BingeCat/movies" },
  { label: "Series", icon: Tv, path: "/BingeCat/series" },
];
export const options = ["Streaming", "On TV", "For Rent", "In Theatres"];
export const geners = [{ id: 28, name: "Action" }];

export const IMAGE_URL = "https://image.tmdb.org/t/p/original";
export const genes = ["topRated", "nowPlaying", "popular", "upcoming"];
export const those = [
  {
    title: "Discover",
    subtitle: "Browse by genre",
    icon: "🎬",
    path: "/Bingecat/explore",
  },
  {
    title: "Search",
    subtitle: "Find any title",
    icon: "🔍",
    path: "/Bingecat/explore",
  },
  {
    title: "TV Series",
    subtitle: "Top rated shows",
    icon: "📺",
    path: "/Bingecat/series",
  },
  {
    title: "AI Picks",
    subtitle: "Personalized for you",
    icon: "✨",
    path: "/Bingecat/for-you",
  },
  {
    title: "Watchlist",
    subtitle: "Save for later",
    icon: "🎟️",
    path: "/Bingecat/watchlist",
  },
];
export const rows = [
  { dir: "right", offset: -110, shift: 0, scale: 1, rotate: -5, speed: 30 },
  { dir: "left", offset: 140, shift: 0, scale: 1, rotate: -5, speed: 30 },
  { dir: "right", offset: 390, shift: 0, scale: 1, rotate: -5, speed: 30 },
  { dir: "left", offset: 640, shift: 0, scale: 1, rotate: -5, speed: 30 },
  { dir: "right", offset: 890, shift: 0, scale: 1, rotate: -5, speed: 30 },
];

export const showmList = ["Everything", "Tv shows", "Movies"];
export const availabilitiesList = [
  "All availabilities",
  "MediaStream",
  "Free",
  "Ads",
  "Rent",
  "Buy",
];
export const genres = [
  "Action & Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Kids",
  "Mystery",
  "News",
  "Reality",
  "Sci-Fi & Fantasy",
  "Soap",
  "Talk",
  "War & Politics",
  "Western",
];
export const languages = [
  { language: "English", code: 482 },
  { language: "Spanish", code: 731 },
  { language: "French", code: 264 },
  { language: "German", code: 918 },
  { language: "Italian", code: 547 },
  { language: "Portuguese", code: 386 },
  { language: "Russian", code: 629 },
  { language: "Chinese", code: 145 },
  { language: "Japanese", code: 873 },
  { language: "Korean", code: 294 },
  { language: "Hindi", code: 561 },
  { language: "Telugu", code: 708 },
  { language: "Tamil", code: 432 },
  { language: "Malayalam", code: 956 },
  { language: "Kannada", code: 317 },
  { language: "Bengali", code: 684 },
  { language: "Marathi", code: 253 },
  { language: "Gujarati", code: 792 },
  { language: "Punjabi", code: 468 },
  { language: "Arabic", code: 905 },
  { language: "Turkish", code: 341 },
  { language: "Thai", code: 617 },
  { language: "Vietnamese", code: 529 },
  { language: "Indonesian", code: 884 },
  { language: "Urdu", code: 176 },
];
export const mood = [
  "Happy",
  "Dark",
  "Emotional",
  "Exciting",
  "Relaxing",
  "Theilling",
];
export const eras = [
  "All Eras",
  "Latest",
  "2020s",
  "2010s",
  "2000s",
  "90s",
  "Classic",
];
export const ratings = ["Any Rating", "Good (6+)", "Top Rated (8+)"];
