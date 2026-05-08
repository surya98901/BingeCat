import { div } from "framer-motion/client";
import SlideButtonsList from "../ReUsables/SlideButtonsList";
import { IMAGE_URL } from "../assets/constants";
import {useState } from "react";

const MediaSection = ({ media }) => {
    const [active, setActive] = useState("backdrops");
    console.log(media);
    return (
        <div>
            <label>Images</label>

            <SlideButtonsList
                options={["backdrops", "logos", "posters"]}
                active={active}
                setActive={setActive}
            />

            <div className="flex gap-5 overflow-x-auto">
                {media.images?.[active]?.map((image) => (
                    <div
                        key={image.file_path}
                        className={`h-[50vh] ${active == "posters" ? 'w-[30%]' : 'w-[100%]'} overflow-hidden rounded-lg flex-shrink-0`}
                    >
                        <img
                            className="w-full h-full object-cover"
                            loading="lazy"
                            src={IMAGE_URL + image.file_path}
                            alt={active}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MediaSection;