import Image from "next/image";
import { FaTelegram, FaDiscord, FaSkype } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="place-content-center place-items-center bg-footer-bg md:h-[67vh] pb-8 md:pb-0">
        <div className="w-full max-w-screen-xl">
          <div className="grid grid-cols-1 px-7 md:grid-cols-10 md:gap-20 md:px-0">
            <div className="col-span-4 mb-10 grid grid-rows-3 place-items-center md:mb-0">
              <div className="row-span-1 md:mb-20 w-full">
                <span className="text-2xl md:text-5xl font-extrabold text-secondary">
                  PPInstalls
                </span>
              </div>
              <div className="row-span-2 md:w-[80%] place-self-start">
                <h5 className="md:mb-5 text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                  get contact
                </h5>

                <div className="mb-8 flex h-16 items-center gap-x-4 border-b border-[#aaa3] md:w-full md:gap-x-6">
                  <input
                    type="text"
                    placeholder="support@ppinstalls.com"
                    className="text-mainGray h-full w-full bg-transparent text-lg font-bold outline-none placeholder:text-[#aaa3] md:text-2xl"
                  />
                </div>
                <h6 className="mt-1 text-gray-500">
                  <span className="text-secondary">Address :</span>{" "}
                  <span>Deutschlandsberg</span>
                </h6>
              </div>
            </div>

            <div className="col-span-2 flex flex-col gap-y-5">
              <h2 className="mb-2 mt-8 md:mt-0 text-lg font-bold text-white">
                Follow Us
              </h2>
              <div className="flex gap-x-6">
                <a href="https://t.me/PhilippBraun10" target="_blank" rel="noopener noreferrer">
                  <FaTelegram className="w-6 h-6 cursor-pointer hover:text-secondary" />
                </a>
                <a href="https://discord.com/users/philippbraun78_32262" target="_blank" rel="noopener noreferrer">
                  <FaDiscord className="w-6 h-6 cursor-pointer hover:text-secondary" />
                </a>
                <a href="skype:live:support_38205?chat" target="_blank" rel="noopener noreferrer">
                  <FaSkype className="w-6 h-6 cursor-pointer hover:text-secondary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:h-[90px] w-full bg-[#231629]">
        <div className="relative mx-auto flex h-full max-w-screen-xl flex-col items-center justify-between p-3 md:flex-row">
          <p className="text-center text-white text-sm md:text-base">
            Copyright © 2024{" "}
            <span className="text-secondary">PPInstalls Corporation</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
