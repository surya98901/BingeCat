import { IMAGE_URL } from "../assets/constants";
import useWatchProvider from "../Hooks/useWatchProviders";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const WatchProviderList = ({ id }) => {
  useWatchProvider(id);

  const watchProviders = useSelector(
    (state) => state.watchProvider.providers
  );

  if (!watchProviders) return <h1></h1>;

  const prov = ["flatrate", "buy", "rent"];

  return (
    <div>
      {prov.map((p) => {
        const list = watchProviders[p];

        if (!list) return null;

        return (
          <div key={p}>
            <label className="capitalize text-l font-bold mr-5">
              {p}:
            </label>

            <div className="flex flex-wrap gap-3 my-3">
              {list.map((wp) => (
                <motion.img
                  key={wp.provider_id}
                  src={IMAGE_URL + wp.logo_path}
                  alt={wp.provider_name}
                  className="w-[40px] h-[40px] object-contain rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800"
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 250, damping: 15 }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WatchProviderList;