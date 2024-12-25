import { ICON } from "../assets";
import { GoShieldLock } from "react-icons/go";
import { TbVirusSearch } from "react-icons/tb";
import { MdOutlinePayments } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiDivergence } from "react-icons/gi";

export const menuData = [
  {
    pageName: "Projects",
    // href: "/projects",
  },
  {
    pageName: "Services",
    // href: "/our-services",
  },
  {
    pageName: "Contact Us",
    // href: "/contact-us",
  },
  {
    pageName: "About Us",
    // href: "/about-us",
  },
];
export const serviceData = [
  {
    title: "Quick Signup",
    icon: <GoShieldLock />,
    hoverIcon: <GoShieldLock />,
    desc: "Easily register and start using our services within minutes, ensuring a hassle-free onboarding process.",
    // href: "/",
  },
  {
    title: "Fraud Detection",
    icon: <TbVirusSearch />,
    hoverIcon: <TbVirusSearch />,
    desc: "Protect your business with our advanced fraud detection system, ensuring safety and transparency.",
    // href: "/",
  },
  {
    title: "Payment Modes",
    icon: <MdOutlinePayments />,
    hoverIcon: <MdOutlinePayments />,
    desc: "Choose from multiple payment options tailored for your convenience and financial security.",
    // href: "/",
  },
  {
    title: "Targeting Capability",
    icon: <TbTargetArrow />,
    hoverIcon: <TbTargetArrow />,
    desc: "Reach your desired audience with precision using our advanced targeting tools and analytics.",
    // href: "/",
  },
  {
    title: "Detailed Reporting",
    icon: <HiOutlineClipboardDocumentList />,
    hoverIcon: <HiOutlineClipboardDocumentList />,
    desc: "Gain insights with our comprehensive reports, helping you track performance and optimize strategies.",
    // href: "/",
  },
  {
    title: "Diverse Ad Formats",
    icon: <GiDivergence />,
    hoverIcon: <GiDivergence />,
    desc: "Engage your audience with a variety of ad formats, including banners, videos, and interactive ads.",
    // href: "/",
  },
];

export const portfolioData = [
  { title: "Web Design", desc: "Responsive Web Design", img: ICON.protfolio1 },
  {
    title: "UI/UX Design",
    desc: "Responsive Web Design",
    img: ICON.protfolio2,
  },
  { title: "Branding", desc: "Responsive Web Design", img: ICON.protfolio3 },
  { title: "App Design", desc: "Responsive Web Design", img: ICON.protfolio4 },
  { title: "Marketing", desc: "Responsive Web Design", img: ICON.protfolio1 },
];

export const clientsData = [
  ICON.logo1,
  ICON.logo2,
  ICON.logo3,
  ICON.logo4,
  ICON.logo5,
];

export const footerData = [
  {
    title: "Follow Me",
    routeNames: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
  },
  // {
  //   title: "Top Links",
  //   routeNames: ["About", "Careers", "Terms of service", "News & Media"],
  // },
  // {
  //   title: "Explore",
  //   routeNames: [
  //     "Contact Us",
  //     "Team Member",
  //     "Latest Portfolio",
  //     "News & Media",
  //   ],
  // },
];
