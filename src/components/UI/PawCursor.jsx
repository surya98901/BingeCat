import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PawCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.img
      src="public\pawpointer.png" // your edited paw image
      alt="cursor"
      animate={{ x: pos.x, y: pos.y }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 80
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 50,
        height: 50,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)"
      }}
    />
  );
}