import { motion, AnimatePresence } from "framer-motion";
import SlideButtonsList from "../ReUsables/SlideButtonsList";
import { IMAGE_URL } from "../assets/constants";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const MediaSection = ({ media }) => {
    const [active, setActive] = useState("backdrops");
    const [selectedIndex, setSelectedIndex] = useState(null);

    const images = media.images?.[active] || [];

    const handlePrev = () => {
        setSelectedIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setSelectedIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="space-y-4">
            <label className="text-xl font-semibold">Images</label>

            <SlideButtonsList
                options={["backdrops", "logos", "posters"]}
                active={active}
                setActive={setActive}
            />

            <div className="flex gap-5 overflow-x-auto scrollbar-hide">
                {images.map((image, index) => (
                    <motion.div
                        key={image.file_path}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedIndex(index)}
                        className={`
                            h-[50vh]
                            ${active === "posters"
                                ? "w-[30%]"
                                : active === "logos"
                                    ? "w-[40%]"
                                    : "w-[100%]"
                            }
                            overflow-hidden
                            rounded-xl
                            flex-shrink-0
                            cursor-pointer
                            bg-zinc-900
                        `}
                    >
                        <img
                            className={`
                                w-full
                                h-full
                                ${active === "logos"
                                    ? "object-contain p-5"
                                    : "object-cover"
                                }
                            `}
                            loading="lazy"
                            src={IMAGE_URL + image.file_path}
                            alt={active}
                        />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="
                            fixed
                            inset-0
                            z-50
                            bg-black/85
                            backdrop-blur-sm
                            flex
                            items-center
                            justify-center
                            p-5
                        "
                    >
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="
                                absolute
                                top-5
                                right-5
                                z-50
                                bg-white/10
                                hover:bg-white/20
                                text-white
                                p-2
                                rounded-full
                                transition
                            "
                        >
                            <X size={28} />
                        </button>


                        <button
                            onClick={handlePrev}
                            className="
                                absolute
                                left-5
                                z-50
                                bg-white/10
                                hover:bg-white/20
                                text-white
                                p-3
                                rounded-full
                                transition
                            "
                        >
                            <ChevronLeft size={34} />
                        </button>

                        <button
                            onClick={handleNext}
                            className="
                                absolute
                                right-5
                                z-50
                                bg-white/10
                                hover:bg-white/20
                                text-white
                                p-3
                                rounded-full
                                transition
                            "
                        >
                            <ChevronRight size={34} />
                        </button>

                        <motion.img
                            key={images[selectedIndex]?.file_path}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            src={
                                IMAGE_URL +
                                images[selectedIndex]?.file_path
                            }
                            alt="preview"
                            className="
                                max-w-[95vw]
                                max-h-[90vh]
                                rounded-2xl
                                shadow-2xl
                                object-contain
                            "
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MediaSection;