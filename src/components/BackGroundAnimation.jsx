import React from "react";
import MovieRow from "./MovieRow";


const rows = [
  { dir: "right", offset:-110 , shift: 0, scale: 1, rotate: -5, speed: 30 },
  { dir: "left", offset: 140 , shift: 0, scale: 1, rotate: -5, speed: 30 },
  { dir: "right", offset: 390 , shift: 0, scale: 1, rotate: -5, speed: 30 },
  { dir: "left", offset: 640 , shift: 0, scale: 1, rotate: -5, speed: 30 },
  { dir: "right", offset: 890 , shift: 0, scale: 1, rotate: -5, speed: 30 },

];

const BackgroundAnimation = ({ movies }) => {
  return (
    <div className="inset-0 -z-10 dark:bg-none overflow-hidden">
      {rows.map((row, i) => (
        <MovieRow
          key={i}
          movies={movies}
          direction={row.dir}
          offset={row.offset}
          shift={row.shift}
          scale={row.scale}
          rotate={row.rotate}
          speed={row.speed}
        />
      ))}

      {/* Overlay for cinematic feel */}
  
    </div>
  );
};
export default React.memo(BackgroundAnimation);