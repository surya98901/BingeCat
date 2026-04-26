import { motion } from "framer-motion";

const AwardsBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex items-center gap-6 bg-purple-700 text-white px-8 py-6 rounded-2xl overflow-hidden my-5"
    >
      {/* CONTENT */}
      <h1 className="text-3xl font-serif tracking-wide z-10">
        AWARDS
      </h1>

      <span className="text-lg font-medium opacity-90 z-10">
        1 Nomination
      </span>

      {/* LINE + ARROW */}
      <div className="flex items-center gap-2 z-10">
  
        <motion.span whileHover={{ x: 10 }} >→</motion.span>
      </div>


      {/* left small */}
      <motion.span
        className="absolute left-3 top-3 text-sm"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ✦
      </motion.span>

      {/* center tiny */}
      <motion.span
        className="absolute left-[45%] top-2 text-xs"
        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ✦
      </motion.span>

      {/* bottom right small */}
      <motion.span
        className="absolute right-16 bottom-2 text-xs"
        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
      >
        ✦
      </motion.span>

      {/* BIG STAR (top right) */}
      <motion.span
        className="absolute right-4 top-2 text-2xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ✦
      </motion.span>
    </motion.div>
  );
};

export default AwardsBanner;