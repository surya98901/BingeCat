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
export const geners = [{id:28, name:"Action"}]

export const IMAGE_URL = "https://image.tmdb.org/t/p/original";