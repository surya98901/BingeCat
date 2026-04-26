import { p } from "framer-motion/client";
import { formatMoney, formatRuntime } from "../ReUsables/reusableFunction";
import { IMAGE_URL } from "../assets/constants";
import WatchProviderList from "./WatchProviderlist";
const ReleaseDetails = ({ movie }) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex">
                <label className="capitalize text-l font-bold mr-2">
                    Original title :
                </label>
                <p>{movie.original_title}</p>
            </div>
            <div className="flex ">
                <label className="capitalize text-l font-bold mr-2">Status :</label>
                <p>{movie.status}</p></div>
            <div className="flex">
                <label className="capitalize text-l font-bold mr-2"> Original Language :</label>
                <p>{movie.original_language}</p>
            </div>
            <div className="flex">
                <label className="capitalize text-l font-bold mr-2">Runtime :</label>
                <p>{formatRuntime(movie.runtime)}</p>
            </div>
            <WatchProviderList id={movie.id} />
            {movie.budget > 0 && movie.revenue > 0 && <div className="flex gap-5">
                 <div className="flex flex-col bg-green-700 text-white p-3 rounded-lg w-[120px]">
                    <label className="text-sm font-semibold">Budget</label>
                    <p className="text-lg font-bold">
                        {formatMoney(movie.budget)}
                    </p>
                </div>
                <div className="flex flex-col bg-yellow-500 text-black p-3 rounded-lg w-[120px]">
                    <label className="text-sm font-semibold">Revenue</label>
                    <p className="text-lg font-bold">
                        {formatMoney(movie.revenue)}
                    </p>
                </div>
            </div>}
            <div>
                <label className="capitalize text-l font-bold mr-2">Production :</label>

                <div className="flex flex-wrap gap-4 mt-2">
                    {movie.production_companies?.map((company) => (
                        <div key={company.id} className="flex items-center gap-4 ">
                            {company.logo_path ? <img
                                src={IMAGE_URL + company.logo_path}
                                alt={company.name}
                                className="object-contain rounded-lg w-[160px] h-[80px] dark:bg-gray-200  p-2"

                            /> :
                                <p className="rounded-lg w-[160px] h-[80px] dark:bg-gray-200 p-2 dark:text-black text-xl font-bold items-center">{company.name}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label className="capitalize text-l font-bold mr-2">keyWords</label>
                <ul className="flex flex-wrap gap-3 mt-2">
                    <li className="bg-gray-400 p-2 dark:bg-gray-200 p-2 dark:text-black rounded-xl w-[100px] items-center">key one</li>
                    <li className="bg-gray-400 p-2 dark:bg-gray-200 p-2 dark:text-black rounded-xl w-[100px] items-center">key one</li>
                    <li className="bg-gray-400 p-2 dark:bg-gray-200 p-2 dark:text-black rounded-xl w-[100px] items-center">key one</li>
                    <li className="bg-gray-400 p-2 dark:bg-gray-200 p-2 dark:text-black rounded-xl w-[100px] items-center">key one</li>
                    <li className="bg-gray-400 p-2 dark:bg-gray-200 p-2 dark:text-black rounded-xl w-[100px] items-center">key one</li>
                </ul>
            </div>
        </div >
    )
}


export default ReleaseDetails;