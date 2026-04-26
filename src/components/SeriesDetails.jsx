import { motion } from "framer-motion";
import { IMAGE_URL } from "../assets/constants";

const SeriesDetails = ({ series }) => {
    return (
        <div className="flex flex-col gap-3">
            <label htmlFor="" className="capitalize text-l font-bold mr-2">Facts</label>
            <div className="flex flex-col gap-2">
                {series.original_name && <div className="flex">
                    <label htmlFor="" className="capitalize text-l font-bold mr-2">Original name :</label>
                    <p>{series.original_name}</p>
                </div>}
                <div className="flex">
                    <label htmlFor="" className="capitalize text-l font-bold mr-2">Status :</label>
                    <p>{series.status}</p>
                </div>
                <label htmlFor="" className="capitalize text-l font-bold mr-2 mb-1">Network :</label>
                <div className="flex flex-wrap gap-2">

                    {series.networks?.map((wp) => (
                        <motion.img
                            key={wp.id}
                            src={IMAGE_URL + wp.logo_path}
                            alt={wp.name}
                            className="w-[100px] h-[50px] object-contain rounded-lg bg-gray-200 p-2"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 250, damping: 15 }}
                        />
                    ))}
                </div>
                <div className="flex">
                    <label htmlFor="" className="capitalize text-l font-bold mr-2">Type :</label>
                    <p>{series.type}</p>
                </div>
                <div className="flex">
                    <label htmlFor="" className="capitalize text-l font-bold mr-2">Original Language :</label>
                    <p>{series.original_language}</p>
                </div>
            </div>
            <div>
                <label className="capitalize text-l font-bold mr-2">keyWords</label>
                <ul className="flex flex-wrap gap-3 mt-2">
                    {series.keywords?.map((keyword) => (
                        <li className="bg-gray-400 p-2 dark:bg-gray-200 p-2 dark:text-black rounded-xl w-[100px] items-center" key={keyword}>
                            {keyword}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default SeriesDetails;