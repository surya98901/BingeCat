import React from "react";
import { useSelector } from "react-redux";


const LogoTextSVG = ({ className = "" }) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      {theme === "dark" ? (
        <LogoTextThemeDark className={className} />
      ) : (
        <LogoTextThemeLight className={className} />
      )}
    </>
  )
};

const LogoTextThemeDark = ({ className }) => {
  return (
        <svg
      viewBox="0 0 300 100"
      className={`w-[clamp(100px,12vw,150px)] h-auto ${className}`}
    >
      <defs>
        <linearGradient id="grad-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a63ae4" />   
          <stop offset="50%" stopColor="#b481e0" /> 
          <stop offset="100%" stopColor="#a63ae4" /> 
        </linearGradient>
      </defs>

      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fontFamily="Fredoka, sans-serif"
        fontSize="52"
        fontWeight="700"
        fill="url(#grad-light)"

      >
        BingeCat
      </text>


    </svg>)
};


const LogoTextThemeLight = ({ className }) => {
  return (
     <svg
      viewBox="0 0 300 100"
      className={`w-[clamp(100px,12vw,150px)] h-auto ${className}`}
    >
      <defs>
        <linearGradient id="grad-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#240e35" />   
          <stop offset="50%" stopColor="#9f1ceb" /> 
          <stop offset="100%" stopColor="#240e35" /> 
        </linearGradient>
      </defs>

      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fontFamily="Fredoka, sans-serif"
        fontSize="52"
        fontWeight="700"
        fill="url(#grad-light)"

      >
        BingeCat
      </text>


    </svg>
  );
};

export default LogoTextSVG;