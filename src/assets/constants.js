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
    path: "/BingeCat/explore",
  },
  {
    title: "Search",
    subtitle: "Find any title",
    icon: "🔍",
    path: "/BingeCat/explore",
  },
  {
    title: "TV Series",
    subtitle: "Top rated shows",
    icon: "📺",
    path: "/BingeCat/series",
  },
  {
    title: "AI Picks",
    subtitle: "Personalized for you",
    icon: "✨",
    path: "/BingeCat/for-you",
  },
  {
    title: "Watchlist",
    subtitle: "Save for later",
    icon: "🎟️",
    path: "/BingeCat/watchlist",
  },
];
export const rows = [
  { dir: "right", offset: -110, shift: 0, scale: 1, rotate: -5 },
  { dir: "left", offset: 140, shift: 0, scale: 1, rotate: -5 },
  { dir: "right", offset: 390, shift: 0, scale: 1, rotate: -5 },
  { dir: "left", offset: 640, shift: 0, scale: 1, rotate: -5 },
  { dir: "right", offset: 890, shift: 0, scale: 1, rotate: -5 },
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
  { language: "English", code: "en" },
  { language: "Spanish", code: "es" },
  { language: "French", code: "fr" },
  { language: "German", code: "de" },
  { language: "Italian", code: "it" },
  { language: "Portuguese", code: "pt" },
  { language: "Russian", code: "ru" },
  { language: "Chinese", code: "zh" },
  { language: "Japanese", code: "ja" },
  { language: "Korean", code: "ko" },
  { language: "Hindi", code: "hi" },
  { language: "Telugu", code: "te" },
  { language: "Tamil", code: "ta" },
  { language: "Malayalam", code: "ml" },
  { language: "Kannada", code: "kn" },
  { language: "Bengali", code: "bn" },
  { language: "Marathi", code: "mr" },
  { language: "Gujarati", code: "gu" },
  { language: "Punjabi", code: "pa" },
  { language: "Arabic", code: "ar" },
  { language: "Turkish", code: "tr" },
  { language: "Thai", code: "th" },
  { language: "Vietnamese", code: "vi" },
  { language: "Indonesian", code: "id" },
  { language: "Urdu", code: "ur" },
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
