import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Wrapper from "../Wrapper";
import SectionHeader from "../Shared/SectionHeader";
import { serviceData } from "@/utils/TextData";
import Service from "../Shared/Service";

const OurServices: FC<{ ref: any }> = ({ ref }) => {
  return (
    <section ref={ref} id="section2" className="mb-20 md:h-screen">
      <Wrapper>
        <SectionHeader heading="Features" />
        <div className="mt-12 px-5 md:mt-14 md:px-0">
          <Swiper
            slidesPerView={4}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {serviceData.map((item, index) => (
              <SwiperSlide key={index}>
                <Service
                  title={item?.title}
                  desc={item?.desc}
                  icon={item?.icon}
                  iconHover={item?.hoverIcon}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Wrapper>
    </section>
  );
};

export default OurServices;
