import Image from "next/image";
import Wrapper from "../Wrapper";
import { ICON } from "@/assets";
import { FC } from "react";

const Testimonial: FC<{ ref: any }> = ({ ref }) => {
  return (
    <Wrapper>
      <div ref={ref}
          id="section3" className="flex flex-col md:flex-row justify-center items-center md:h-[90vh] w-full gap-5 px-5 md:px-0">
        {/* Left Box */}
        <div className="flex items-center justify-center h-[80%] md:w-2/5">
          <div className="md:h-[90%] md:w-[90%] overflow-hidden rounded-br-[40px] rounded-tl-[40px]">
            <Image
              src={ICON.connectingPeople}
              alt="Connecting-People"
              className="scale-110 transition-transform duration-300 hover:scale-100"
            />
          </div>
        </div>

        {/* Right Box */}
        <div className="flex h-[75%] md:w-3/5 flex-col justify-center">
          <h2 className="text-xl md:text-4xl font-extrabold text-white mt-5 md:mt-0">
            Your Trusted Pay Per Install Partner
          </h2>
          <h2 className="my-5 text-sm md:text-xl md:font-semibold text-secondary">
            We Are the Best PPI Network for Maximizing Your Earnings
          </h2>
          <p className="font-light  text-sm md:text-lg leading-relaxed tracking-wider text-gray-500">
            At <strong>PPInstalls</strong>, we connect advertisers and
            publishers through a seamless Pay Per Install network. Our platform
            is designed to help publishers monetize their websites, blogs, or
            applications with ease, while offering advertisers premium
            placements to achieve maximum exposure. We provide safe and
            effective advertising solutions, ensuring a high level of trust and
            performance for all stakeholders. Whether you're an advertiser
            looking to grow your brand or a publisher seeking stable and
            high-paying ad formats, PPInstalls is your go-to platform.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Testimonial;
