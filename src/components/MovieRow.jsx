import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { IMAGE_URL } from "../assets/constants";


const MovieRow = ({ movies, direction, offset, shift, scale, rotate, speed }) => {
  const isLeft = direction === "left";

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return null;
  }

  return (
    <div
      className="absolute w-full overflow-hidden"
      style={{
        top: offset,
        transform: `translateX(${shift}px) scale(${scale}) rotate(${rotate}deg)`
      }}
    >
      <motion.div
        className="flex gap-6 w-max"
        animate={{
          x: isLeft ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...movies, ...movies].map((m, i) => (
          <div
            key={i}
            className="min-w-[160px] h-[240px] rounded-2xl overflow-hidden"
          >
            <img
              src={IMAGE_URL + m.poster_path}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
export default MovieRow;