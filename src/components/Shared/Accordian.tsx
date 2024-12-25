import React, { FC, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface AccordianProps {
  title: string;
  desc: string;
  index: number;
}

const Accordian: FC<AccordianProps> = ({ title, desc, index }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="my-1" key={index}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 border-b border-gray-200 py-5 text-lg font-medium text-gray-400 dark:border-gray-700 dark:text-gray-400 rtl:text-right"
        onClick={() => toggleAccordion(index)}
      >
        <span>{title}</span>
        <BiChevronDown
          size={30}
          className={`transition-transform ${
            activeIndex === index ? "rotate-180" : ""
          }`}
        />
      </button>
      <div className={`${activeIndex === index ? "block" : "hidden"}`}>
        <div className="border-b border-gray-200 py-5 text-lg text-gray-400 dark:border-gray-700">
          {desc}
        </div>
      </div>
    </div>
  );
};

export default Accordian;
