import { buttonVariants } from "../components/UI/ButtonVarients";

const BingeCatButton = ({ children, onClick, variant = "primary", className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-2 py-2 rounded-xl text-sm transition
        ${buttonVariants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default BingeCatButton