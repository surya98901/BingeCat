import React from "react";
import MovieRow from "./MovieRow";
import { rows } from "../assets/constants";

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
    </div>
  );
};
export default React.memo(BackgroundAnimation);
