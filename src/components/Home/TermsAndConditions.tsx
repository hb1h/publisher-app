import React, { FC, useState } from "react";
import SectionHeader from "../Shared/SectionHeader";
import Wrapper from "../Wrapper";
import { BiChevronDown } from "react-icons/bi";

const TermsAndConditions: FC<{ ref: any }> = ({ ref }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const termsAndConditions = [
    {
      number: 1,
      title: "Initial Testing Period",
      description:
        "We will conduct a 3-day testing period to evaluate the quality and volume of your traffic. During this period, no payments will be made. The purpose of the test is solely to assess the potential performance and compatibility of your traffic with our service.",
    },
    {
      number: 2,
      title: "Negotiation and Agreement",
      description:
        "Upon successful completion of the 3-day testing period, we will negotiate the payment terms based on the results observed. The payment rates and terms will be discussed and agreed upon by both parties before proceeding with the service.",
    },
    {
      number: 3,
      title: "Payment Schedule",
      description:
        "Payments can be made on a daily, weekly, or monthly basis as per your preference and mutual agreement. The agreed payment terms and schedule will be documented in a separate agreement following the testing period.",
    },
    {
      number: 4,
      title: "Traffic Quality",
      description:
        "The quality of the traffic must meet our standards as determined during the testing period. Any significant deviation in traffic quality after the initial agreement may result in renegotiation of terms or termination of the service.",
    },
    {
      number: 5,
      title: "Compliance",
      description:
        "You must comply with all applicable laws and regulations regarding the generation and delivery of traffic. Any traffic generated through fraudulent means, including but not limited to bots or automated scripts, is strictly prohibited and will result in immediate termination of the service and forfeiture of any outstanding payments.",
    },
    {
      number: 6,
      title: "Confidentiality",
      description:
        "Both parties agree to keep all terms, negotiations, and related information confidential. No information regarding the service or payment terms will be disclosed to any third party without prior written consent.",
    },
    {
      number: 7,
      title: "Termination",
      description:
        "Either party may terminate the service agreement at any time with a written notice. Upon termination, any outstanding payments due will be settled as per the agreed terms up to the date of termination.",
    },
    {
      number: 8,
      title: "Limitation of Liability",
      description:
        "We are not liable for any indirect, incidental, or consequential damages arising out of or in connection with the service. Our total liability for any claim arising out of this agreement shall not exceed the total amount paid or payable to you under the terms of this service.",
    },
    {
      number: 9,
      title: "Governing Law",
      description:
        "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is registered. Any disputes arising out of or in connection with this agreement will be subject to the exclusive jurisdiction of the courts in that jurisdiction.",
    },
    {
      number: 10,
      title: "Ad Exclusivity",
      description:
        "If you are using our ad, you are not allowed to use other popups and banners simultaneously. This ensures the effectiveness and integrity of our ad placements.",
    },
  ];

  return (
    <section ref={ref} className="mb-20 md:mb-40">
      <Wrapper>
        <SectionHeader heading="Term and Condition" />
        <div className="px-5">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 border-b border-gray-200 py-5 font-medium text-gray-400 dark:border-gray-700 dark:text-gray-400 md:text-lg rtl:text-right"
            onClick={() => toggleAccordion(1)}
          >
            <span>Term and Condition</span>
            <BiChevronDown
              size={30}
              className={`transition-transform ${
                activeIndex === 1 ? "rotate-180" : ""
              }`}
            />
          </button>
          <div className={`${activeIndex === 1 ? "block" : "hidden"}`}>
            <div className="bg-[#231629] p-2 text-lg md:p-5">
              {termsAndConditions.map((tc, index) => (
                <div className="t-and-c space-y-3" key={index}>
                  <h2>
                    <b>{tc?.number}.</b> {tc?.title}
                  </h2>
                  <p>{tc?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default TermsAndConditions;
