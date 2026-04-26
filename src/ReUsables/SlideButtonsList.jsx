import { useState } from "react";
const SlideButtonsList = ({ options }) => {
    const [active, setActive] = useState(0);
    return (
        <div className="relative flex w-[400px] bg-gray-300 dark:bg-gray-800 rounded-full p-1 overflow-hidden">
            <div
                className="absolute top-1 left-1 h-[calc(100%-8px)] bg-purple-600 rounded-full transition-all duration-300"
                style={{
                    width: `calc((100% - 8px) / ${options.length})`,
                    transform: `translateX(${active * 100}%)`,
                }}
            />

            {options.map((item, index) => (
                <button
                    key={item}
                    onClick={() => setActive(index)}
                    className={`relative z-10 flex-1 py-1 text-sm font-medium text-center transition-colors
                            ${active === index ? "text-white" : "text-black dark:text-gray-300"}`}
                >
                    {item}
                </button>
            ))}
        </div>);
}
export default SlideButtonsList;