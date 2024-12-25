import Image from "next/image";
import { ICON } from "../../assets";

const HalfSectionHeader:React.FC<{title:string, tagLine:string, fns?:string}> = ({ title, tagLine, fns }) => {
  return (
    <div className="flex flex-col gap-y-4 ">
      <div className="flex items-center gap-x-3">
        {/* <Image src={ICON.textLogo} alt="" className="w-[30px] h-[17px]" />{" "} */}
        {/* <h1 className="font-semibold tracking-[0.3em] text-sm uppercase text-gray-400">
          {title}
        </h1> */}
      </div>
      <h2 className={`${fns ? fns:"text-3xl md:text-5xl"}  font-bold leading-tight text-white`}>{tagLine}</h2>
    </div>
  );
};

export default HalfSectionHeader;
