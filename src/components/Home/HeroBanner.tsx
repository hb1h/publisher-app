import Image from "next/image";
import bannerGfx from "@/assets/banner2.png";
import { GoArrowUpRight } from "react-icons/go";

const HeroBanner = () => {
  return (
    <div className="relative -mt-22 grid h-screen place-items-center bg-hero-bg bg-cover bg-center md:grid-cols-5">
      <div className="col-span-3 px-5 md:px-15">
        <h2 className="mt-10 text-3xl font-bold text-white md:mt-0 md:text-4xl md:text-[80px] md:leading-[6rem]">
          Smooth and grow your business.
        </h2>

        <div className="mt-7 flex w-full flex-col items-end md:gap-7">
          <p className="text-sm leading-relaxed text-gray-300 md:w-[85%] md:text-base">
            We are a growing Pay Per Install network offering secure
            advertisements, personalized service, quick payments, and the
            industry's top rates. Sign up now!
          </p>

          <button
            className="gap-3 md:mt-0 mt-7 flex self-start cursor-pointer items-center md:w-[85%] md:gap-6 text-sm font-bold text-white duration-300 hover:text-secondary md:text-base bg-transparent hover:bg-gray-200 px-4 py-2 rounded-md"
            onClick={() => window.location.href = '/auth/signup'}
          >
            Discover Now
            <GoArrowUpRight className="ml-2" />
          </button>

        </div>
      </div>
      <div className="col-span-2">
        {/* <Image
          src={bannerGfx}
          alt="banner gfx"
          // className="absolute left-0 z-40"
          width={550}
        /> */}
      </div>
    </div>
  );
};

export default HeroBanner;
