export const setTheme = (theme) => {
    const root = document.documentElement;

    if (theme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
};

export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};