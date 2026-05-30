const SlideButtonsList = ({ options, active, setActive }) => {
  const activeIndex = options.indexOf(active);

  return (
    <div className="relative flex w-full max-w-[400px] bg-gray-300 dark:bg-gray-800 rounded-full p-1 overflow-hidden">
      <div
        className="absolute top-1 left-1 h-[calc(100%-8px)] bg-purple-600 rounded-full transition-all duration-300"
        style={{
          width: `calc((100% - 8px) / ${options.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {options.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={`relative z-10 flex-1 py-1 text-sm font-medium text-center transition-colors
                        ${active === item ? "text-white" : "text-black dark:text-gray-300"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default SlideButtonsList;
