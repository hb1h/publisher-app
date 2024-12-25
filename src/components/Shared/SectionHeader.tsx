import { ICON } from "@/assets";
import Image from "next/image";
import React from "react";

const SectionHeader: React.FC<{ heading: string }> = ({ heading }) => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-y-6 px-4 md:mt-20 md:gap-y-8 md:px-0">
      <Image src={ICON.textLogo} alt="meika logo" className="h-8 w-14" />
      <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-[64px]">
        {heading}
      </h1>
      <p className="text-gray-500 text-center text-[15px] text-base leading-relaxed md:max-w-[65%]">
      {/* We are technology solutions providing company all over the world doing over 10 years. */}
      </p>
    </div>
  );
};

export default SectionHeader;
