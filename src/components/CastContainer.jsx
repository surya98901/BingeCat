import { IMAGE_URL } from "../assets/constants";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CastContainer = ({ credits }) => {
  const [index, setIndex] = useState(0);

  const chunkSize = 5;
  const cardWidth = 150 + 12;
  const cast = credits?.cast || [];

  const maxIndex = Math.ceil(cast.length / chunkSize) - 1;

  const next = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="group relative flex flex-col gap-3 overflow-hidden">
      <label className="capitalize text-l font-bold">Cast</label>

      {index > 0 && (
        <ChevronLeft
          size={30}
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
                     opacity-0 group-hover:opacity-100 transition 
                     bg-purple-700 text-white p-2 rounded-full cursor-pointer"
        />
      )}

      {index < maxIndex && (
        <ChevronRight
          size={30}
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
                     opacity-0 group-hover:opacity-100 transition 
                     bg-purple-700 text-white p-2 rounded-full cursor-pointer"
        />
      )}

      <div className="overflow-hidden">
        <motion.div
          animate={{ x: -index * chunkSize * cardWidth }}
          transition={{ type: "tween", ease: "easeInOut", duration: 1 }}
          className="flex gap-3"
        >
          {cast.map((actor) => (
            <div
              key={actor.id}
              className="w-[150px] h-[220px] flex-shrink-0 flex flex-col items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
            >
              <img
                src={IMAGE_URL + actor.profile_path}
                alt={actor.name}
                className="w-full h-[160px] object-cover"
              />
              <p className="text-sm font-bold mt-2 text-center">{actor.name}</p>
              <p className="text-xs text-gray-500 text-center">
                {actor.character}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CastContainer;
