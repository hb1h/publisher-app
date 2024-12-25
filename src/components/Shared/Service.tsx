import AnimatedButton from "./AnimatedButton";
import { ICON } from "../../assets";
import Image from "next/image";

const Service:React.FC<{ icon:any, iconHover:any, title:string, desc:string}> = ({ icon, iconHover, title, desc }) => {
  return (
    <div className="relative overflow-hidden grid group grid-rows-11 h-[455px] border w-full border-[#aaa2] p-8">
      {/* Pattern appear will on hover */}
      <Image
        src={ICON.patternbg}
        alt="iconHover"
        className="absolute -bottom-10 group-hover:bottom-0 -right-[160px] group-hover:right-0 transition-all duration-700 w-full h-[80%]"
      />

      <div className="relative w-auto h-auto row-span-4 group-hover:text-secondary text-[60px]">
        {/* <Image src={icon} alt="icon" className="w-auto h-24 group-hover:hidden" />
        <Image
          src={iconHover}
          alt="iconHover"
          className="absolute inset-0 hidden w-auto h-24 -z-10 group-hover:block"
        /> */}

        {icon}
      </div>

      <div className="row-span-5">
        <h1 className="text-2xl font-bold text-white duration-300 cursor-pointer group-hover:text-secondary">
          {title}
        </h1>
        <p className="text-[15px] tracking-[0.018em] leading-[1.9] text-gray-500 mt-6">
          {desc}
        </p>
      </div>

      {/* <div className="row-span-2 place-content-center">
        <AnimatedButton />
      </div> */}
    </div>
  );
};

export default Service;
