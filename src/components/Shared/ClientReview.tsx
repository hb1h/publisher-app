import React from "react";
import { ICON } from "../../assets";
import Image from "next/image";

const ClientReview = () => {
  return (
    <div className="bg-box-bg bg-no-repeat grid grid-rows-3 px-5 py-8 md:px-10">
      {/* 1 */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full md:h-[85px] md:w-[85px]">
          <Image src={ICON.avatar1} alt="avatar" className="h-full w-full" />
        </div>
        <div>
          <h1 className="mb-1 font-bold text-white md:text-xl">
            IT. Isabella Theodore
          </h1>
          <Image src={ICON.stars} alt="review stars" />
        </div>
      </div>

      {/* 2 */}
      <div className="mt-3 place-content-center text-sm tracking-wide text-gray-500 md:text-xl md:leading-snug">
        Nam ultricies sed leo eget vehi. Sed variunoni magna quistoli mats. Inte
        tempus semper leoli rokomoni our has been lecto.
      </div>

      {/* 3 */}
      <div className="flex w-full items-center justify-between gap-x-4 md:gap-x-8">
        {/* <Image src={ICON.clientLogo1} alt="client logo" className="h-6 w-32" /> */}
        <div className="h-[0.5px] w-full bg-[#aaa3]" />
        <Image src={ICON.qtIcon} alt="qt" className="h-12 w-12" />
      </div>
    </div>
  );
};

export default ClientReview;
