import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Wrapper from "../Wrapper";
import SectionHeader from "../Shared/SectionHeader";
import ClientReview from "../Shared/ClientReview";

const ClientReviews = () => {
  return (
    <section className="mb-10 flex w-full justify-center md:h-screen">
      <Wrapper>
        <div className="mt-10 flex flex-col items-center gap-5 md:-mt-20">
          <SectionHeader heading="What Client Says?" />
        </div>

        <div className="mt-14 flex flex-col items-center gap-8">
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
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
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ClientReview />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Wrapper>
    </section>
  );
};

export default ClientReviews;
