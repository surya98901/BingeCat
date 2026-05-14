
import { useDispatch } from "react-redux";
import { addTrailer } from "../store/slices/moviesSlice";
import { API_OPTIONS } from "../assets/constants";
import { useState, useEffect } from "react";

const useGetCredits = (id,type) => {
  const [credits, setCredits] = useState(null);

  const getDetails = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();
    setCredits(data);
  };

  useEffect(() => {
    getDetails(id); // <-- you provide the id here
  }, [id, type]);
  return credits;
};

export default useGetCredits;