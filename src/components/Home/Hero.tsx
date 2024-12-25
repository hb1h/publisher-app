import Image from "next/image";
import bannerGfx from "@/assets/banner2.png";

const Hero = () => {
  return (
    <section className="-mt-22 grid h-[600px] w-full place-items-center overflow-hidden bg-gradient-to-tl from-[#f1c9d6] via-[#D0E0FF] to-[#F1CDD9] bg-[length:100%_100%] bg-[position:10%_80%_10%] text-white lg:grid-cols-5">
      <div className="container col-span-3">
        <div className="w-[80%] px-7">
          <h1 className="t mb-4 text-3xl">
            InstallsPay a ppi network | Earn upto 5$ Per Install
          </h1>
          <h4 className="mb-6">
            We're an emerging Pay Per Install network. We are providing safe
            ads, personal approach, fast payments and highest rates in the
            industry. Get registered today!
          </h4>
          <div>
            <a
              href="/auth/signup"
              className="rounded-md bg-white px-6 py-3 font-semibold text-blue-600 shadow-md hover:bg-gray-100"
            >
              Login
            </a>
          </div>
        </div>
      </div>
      <div className="relative col-span-2 h-full w-full">
          <Image src={bannerGfx} alt="banner gfx" className="bottom-2 -left-13 z-40 absolute"  width={550}/>
        <div className="absolute -bottom-5 h-[550px] w-[550px] rounded-full bg-gradient-to-t from-red-300 via-purple-400 to-cyan-400 animate-spin-3 place-items-center place-content-center">
        </div>
      </div>
    </section>
  );
};

export default Hero;
