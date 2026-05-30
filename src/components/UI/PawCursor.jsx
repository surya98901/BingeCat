import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PawCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Only hide custom cursor on devices that do not support hover (mobile/tablet)
    const hoverMediaQuery = window.matchMedia("(hover: none)");
    setIsTouchDevice(hoverMediaQuery.matches);

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (isTouchDevice) return null;

  return (
    <motion.img
      src={`${import.meta.env.BASE_URL}pawpointer.png`} 
      alt="cursor"
      animate={{ x: pos.x - 25, y: pos.y - 5 }} // Center horizontally (-25px), point with the top toe bean (-5px)
      transition={
        {
          type: "tween",
          duration: 0 // Instant movement to eliminate trailing lag and prevent clicking offset issues
        }
      }
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 50,
        height: 50,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}