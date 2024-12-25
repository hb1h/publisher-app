import { ICON } from "../../assets";
import AnimatedButton from "../Shared/AnimatedButton";
import Image from "next/image";

const PublicBanner = () => {
  return (
    <div className="relative mx-auto my-40 h-[360px] md:h-auto md:max-w-screen-xl">
      <Image src={ICON.bannerBg} alt="banner" className="h-full object-cover" />
      <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-y-14 px-4 md:flex-row md:justify-between">
        <div className="text-left text-[33px] leading-snug font-bold text-white md:w-3/5 md:px-12 md:text-6xl">
        Get started and watch your profits grow!
        </div>

        <div className="flex w-full items-end justify-end md:w-2/5 md:items-center md:justify-center">
          <AnimatedButton
            title="Get Started"
            bgc="#000"
            isAnimated={true}
            h={65}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicBanner;
