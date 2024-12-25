import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const AnimatedButton = ({
  title = "Read More",
  border = false,
  bgc = "#a5a5a511",
  isAnimated = false,
  h = 45,
}) => {
  return (
    <button
      style={{ backgroundColor: bgc, height: h }}
      className={`relative flex gap-3 px-4 w-40 group text-sm font-medium ${
        border ? "border border-[#aaa2]" : bgc
      } text-white`}
    >
      <div className="z-10 flex items-center justify-center w-full h-full gap-x-2">
        {title} <GoArrowUpRight color="#fff" className="text-[18px]" />
      </div>
      {isAnimated && (
        <div className="absolute top-0 right-0 z-0 w-0 h-full transition-all duration-300 bg-secondary group-hover:inset-0 group-hover:w-full" />
      )}
    </button>
  );
};

export default AnimatedButton;
