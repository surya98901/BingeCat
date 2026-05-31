
const SlideToSwitchPath = ({ tabs, active, handleTabClick }) => {
  return (
    <div className="relative flex w-[180px] sm:w-[200px] md:w-[250px] bg-gray-200 dark:bg-gray-800 rounded-full p-1 ">
      <div
        className="absolute top-1 left-1 h-[calc(100%-8px)] bg-purple-600 rounded-full transition-all duration-300"
        style={{
          width: `calc((100% - 8px) / ${tabs.length})`,
          transform: `translateX(${active * 100}%)`,
        }}
      />
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          onClick={() => handleTabClick(index)}
          className={` relative z-10 flex items-center justify-center gap-1 flex-1 p-1 text-xs font-medium transition-colors
                                    ${active === index ? "text-white" : "text-black dark:text-gray-300"}`}
        >
          {tab.icon} <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
export default SlideToSwitchPath;
