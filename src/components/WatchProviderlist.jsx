import { IMAGE_URL } from "../assets/constants";
import useWatchProvider from "../Hooks/useWatchProviders";
import { useSelector } from "react-redux";

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
          <div key={p} className="">
            <label className="capitalize text-l font-bold mr-5">{p}:</label>
            <div className="flex gap-5 my-5 ">
              {list.map((wp) => (
                <img
                  key={wp.provider_id}
                  src={IMAGE_URL + wp.logo_path}
                  alt={wp.provider_name}
                  className="w-[40px] h-[40px] object-contain rounded-lg"
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