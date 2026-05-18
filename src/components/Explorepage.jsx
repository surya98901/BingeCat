import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  showmList,
  availabilitiesList,
  genres,
  languages,
} from "../assets/constants";

const Explorepage = () => {
  const [click, setClick] = useState(false);

  const filterClickHandler = () => {
    setClick(!click);
  };

  return (
    <div className="mt-15 flex w-full justify-center px-6 py-5">
      <div className="flex w-full max-w-[1600px] gap-8">
        <div className="w-[20%] min-w-[280px] mt-5">
          <h1 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-white">
            Explore
          </h1>

          <div className="flex flex-col gap-1">
            <div className="flex h-10 items-center justify-between rounded-xl bg-purple-700 px-5 text-lg font-bold text-white shadow-lg">
              <p>Sort</p>
              <ChevronRight size={20} />
            </div>

            <div className="flex h-10 items-center justify-between rounded-xl bg-purple-700 px-5 text-lg font-bold text-white shadow-lg">
              <p>Where to Watch</p>
              <ChevronRight size={20} />
            </div>

            <div
              className={`overflow-hidden rounded-xl bg-purple-700 text-white shadow-lg transition-all duration-300 ${
                click ? "rounded-b-none" : ""
              }`}
            >
              <div
                onClick={filterClickHandler}
                className="flex h-10 cursor-pointer items-center justify-between px-5 text-lg font-bold"
              >
                <p>Filters</p>

                {!click ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </div>

              {click && (
                <div className="flex flex-col rounded-b-xl bg-white text-black border border-purple-700 ">
                  <div className="border-b border-zinc-200 p-4 flex flex-col gap-1">
                    Show Me
                    {showmList.map((item) => (
                      <label key={item} htmlFor={item} className="flex gap-3">
                        <input type="checkbox" name={item} id={item} />
                        {item}
                      </label>
                    ))}
                  </div>
                  <div className="border-b border-zinc-200 p-4">
                    Availabilities
                    {availabilitiesList.map((item) => (
                      <label key={item} htmlFor={item} className="flex gap-3">
                        <input type="checkbox" name={item} id={item} />
                        {item}
                      </label>
                    ))}
                  </div>
                  <div className="border-b border-zinc-200 p-4">
                    Release Dates
                    <label htmlFor="searchRelease" className="flex gap-3">
                      <input
                        type="checkbox"
                        name="searchRelease"
                        id="searchRelease"
                      />
                      searchRelease
                    </label>
                    <div className="flex flex-col gap-2 my-2">
                      <div className="flex items-center gap-2">
                        From
                        <input
                          type="text"
                          placeholder=""
                          className="border border-purple-700 rounded-full p-1"
                        />
                      </div>
                      <div className="flex items-center gap-7">
                        To
                        <input
                          type="text"
                          placeholder=""
                          className="border border-purple-700 rounded-full p-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-zinc-200 p-4">
                    Genres
                    <div className="flex flex-wrap gap-2">
                      {genres.map((genre) => (
                        <span
                          key={genre}
                          className=" border border-purple-700 hover:bg-purple-700 hover:text-white px-3 py-1 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-b border-zinc-200 p-4 flex flex-col gap-2">
                    Network
                    <input
                      type="text"
                      placeholder="e.g. Netflix"
                      className="border border-purple-700 rounded-full p-1"
                    />
                  </div>
                  <select className="p-2 m-4">
                    <option value="">Language</option>
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.language} {`(${lang.code})`}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button className="mt-4 rounded-xl bg-purple-700 px-5 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-purple-800">
              Apply Filters
            </button>
          </div>
        </div>

        <div className="flex w-[80%] flex-col mt-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              sort param
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400"> x / y Results</p>
          </div>

          <div className="grid grid-cols-5 gap-6">
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[320px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <button className="mt-10 rounded-xl bg-purple-700 px-6 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-purple-800">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explorepage;
