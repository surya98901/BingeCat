import { useState } from "react";
import { genres, languages, mood, eras, ratings } from "../assets/constants";

const steps = ["Genres", "Mood", "Eras", "Ratings", "Languages", "Summary"];

const ForYouPage = () => {
  const [step, setStep] = useState(0);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMood, setSelectedMood] = useState([]);
  const [selectedEras, setSelectedEras] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const toggleHandler = (value, state, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const renderButtons = (list, state, setState) => {
    return (
      <div className="flex flex-wrap gap-4">
        {list.map((item) => (
          <button
            key={item}
            onClick={() => toggleHandler(item, state, setState)}
            className={`rounded-2xl border px-6 py-3 text-sm font-semibold transition-all duration-200 ${
              state.includes(item)
                ? "border-purple-700 bg-purple-700 text-white shadow-lg"
                : "border-zinc-300 bg-white text-zinc-900 hover:border-purple-700 hover:bg-purple-700 hover:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    );
  };

  const nextHandler = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const backHandler = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="mt-10 min-h-screen px-6 pt-30">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-5xl font-bold text-zinc-900 dark:text-white">
          Personalized Recommendations
        </h1>

        <p className="mt-3 text-lg text-zinc-700 dark:text-zinc-400">
          Tell us what you like and we’ll pick the best
        </p>

        <div className="mt-14 flex w-full max-w-[1100px] flex-col">
          <div className="mb-10 flex items-center gap-3 overflow-x-auto">
            {steps.map((item, index) => (
              <div
                key={item}
                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                  index === step
                    ? "bg-purple-700 text-white"
                    : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {step === 0 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Pick your genres
              </h2>

              {renderButtons(genres, selectedGenres, setSelectedGenres)}
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Choose your mood
              </h2>

              {renderButtons(mood, selectedMood, setSelectedMood)}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Select preferred eras
              </h2>

              {renderButtons(eras, selectedEras, setSelectedEras)}
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Rating preference
              </h2>

              {renderButtons(ratings, selectedRatings, setSelectedRatings)}
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                Preferred languages
              </h2>

              {renderButtons(
                languages.map((lang) => lang.language),
                selectedLanguages,
                setSelectedLanguages,
              )}
            </>
          )}

          {step === 5 && (
            <div className="rounded-3xl border border-zinc-300 bg-white p-8 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
              <h2 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white">
                Your Preferences
              </h2>

              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Genres
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedGenres.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Mood
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedMood.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Eras
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedEras.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Ratings
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedRatings.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-purple-700">
                    Languages
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selectedLanguages.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-14 flex items-center justify-between">
            <button
              onClick={backHandler}
              disabled={step === 0}
              className="rounded-2xl border border-purple-700 px-8 py-4 text-lg font-bold text-purple-700 transition hover:bg-purple-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            <button
              onClick={nextHandler}
              className="rounded-2xl bg-purple-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-purple-800"
            >
              {step === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYouPage;
