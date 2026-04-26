export const handleMouseEnter = (movie, setSelectedMovie, hoverTimeout) => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
        setSelectedMovie(movie);
    }, 100);
};

export const handleMouseLeave = (hoverTimeout, setSelectedMovie) => {
    clearTimeout(hoverTimeout.current);

    hoverTimeout.current = setTimeout(() => {
        setSelectedMovie(null);
    }, 80); // 🔥 reduced from 200 → 80
};

export const formatMoney = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  }
  return num;
};
export const formatRuntime = (mins) => {
  if (!mins) return "";

  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};
export const timeAgo = (dateString) => {
  if (!dateString) return "";

  const now = new Date();
  const past = new Date(dateString);

  const diff = now - past;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

  return "Recently";
};