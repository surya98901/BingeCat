
import { API_OPTIONS } from "../assets/constants";
import { useState, useEffect } from "react";

const useGetCredits = (id, type) => {
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
        API_OPTIONS
      );
      const data = await response.json();
      setCredits(data);
    };

    getDetails();
  }, [id, type]);

  return credits;
};

export default useGetCredits;