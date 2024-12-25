import { ICON } from "../../assets";
import { IoMdPlay } from "react-icons/io";

import AnimatedButton from "../Shared/AnimatedButton";
import Wrapper from "../Wrapper";
import Image from "next/image";
import HalfSectionHeader from "../Shared/HalfSectionHeader";
import React, { FC } from "react";

const About:FC<{ref:any}> = ({ref}) => {
  return (
    <div ref={ref} id="section1" className="mt-20 bg-about-bg">
      <Wrapper>
        <div className="grid grid-cols-1 gap-y-10 md:h-screen md:grid-cols-2 md:gap-y-0">
          {/* left */}
          <div className="h-full place-content-center place-items-center p-7 md:p-0">
            <Image
              src={ICON.aboutposter}
              alt="about poster"
              className="h-auto w-auto"
            />
          </div>

          {/* right */}
          <div className="px-7 pb-20 md:pb-0 md:pt-10">
            <HalfSectionHeader
              title="About Us"
              tagLine="Experience Excellence with Our Services"
            />

            <div className="my-8 md:my-5">
              <p className="text-lg font-semibold text-gray-500">
                We are dedicated to delivering unparalleled experiences tailored
                to your needs.
              </p>
              <hr className="my-5 border-[#aaa2]" />
              <p className="text-gray-500">
                PPInstalls is a platform that empowers webmasters to promote
                their websites with ease. Supporting PC games, software,
                torrents, and more, we guarantee the best rates and robust
                security. Trust us to provide exceptional stability while
                fostering healthy partnerships with our publishers.
              </p>
            </div>

            <div className="grid gap-y-12 px-2 md:grid-cols-2 md:gap-x-6 md:px-0">
              <AboutComponent
                num="01"
                head="Advertisers"
                desc="PPInstalls is a leading online ad network for brands, agencies, and media buyers. With 20+ targeting options, it connects you to the ideal audience. Access premium CPM, CPC, and CPA traffic from over 35K direct publishers."
              />
              <AboutComponent
                num="02"
                head="Publishers"
                desc="Maximize your earnings with our top-paying ad network. Monetize sites, blogs, or social media traffic even without a website. Our AI ensures optimal CPM rates and highly relevant ad feeds."
              />
            </div>
            {/* <div className="flex gap-x-4 md:mt-6 bg-green-500">
              <AnimatedButton border={true} h={56} bgc="" isAnimated />
              <button className="flex h-14 w-14 items-center justify-center border border-secondary text-secondary">
                <IoMdPlay size={20} className="text-secondary" />
              </button>
            </div> */}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default About;

const AboutComponent: React.FC<{
  num: string;
  head: string;
  desc: string;
}> = ({ num, head, desc }) => (
  <div className="grid space-y-5 md:h-[55%] md:grid-rows-2 md:space-y-0">
    <div className="flex items-center gap-x-3">
      <div className="h-[50px] w-[50px] place-content-center rounded-full border-[3px] border-secondary text-center text-lg font-bold text-white">
        {num}
      </div>
      <span className="self-center text-2xl font-bold text-white">{head}</span>
    </div>

    <div className="text-gray-500 md:mt-2 md:leading-relaxed">{desc}</div>
  </div>
);
