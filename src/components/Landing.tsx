import Head from "next/head";
import HeroBanner from "./Home/HeroBanner";
import About from "./Home/About";
import OurServices from "./Home/OurServices";
import Testimonial from "./Home/Testimonial";
import Footer from "./Layout/Footer";
import PublicBanner from "./Home/PublicBanner";
import { useState, useEffect, useRef } from "react";
import FAQ from "./Home/FAQ";
import TermsAndConditions from "./Home/TermsAndConditions";
import Link from "next/link";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleOutsideClick = (event: any) => {
    if (!event.target.closest("nav")) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const sectionRefs: Record<string, React.RefObject<HTMLElement>> = {
    section1: useRef<HTMLElement>(null),
    section2: useRef<HTMLElement>(null),
    section3: useRef<HTMLElement>(null),
    section4: useRef<HTMLElement>(null),
    section5: useRef<HTMLElement>(null),
  };

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Head>
        <title>PPInstalls</title>
        <meta
          name="description"
          content="Flexible installment payment plans made easy."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        className={`sticky inset-0 z-50 h-auto py-3 transition-colors ${false ? "backdrop-blur-xl" : ""}`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-4 text-white">
          <h1 className="text-2xl font-bold text-secondary">PPInstalls</h1>
          <button
            className="block focus:outline-none md:hidden"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute left-6 right-6 top-16 z-50 flex-col rounded-md bg-[rgba(255,255,255,0.9)] bg-white p-4 text-secondary shadow-md  md:static md:flex md:flex-row md:items-center md:space-x-6 md:rounded-none md:bg-transparent md:p-0 md:shadow-none`}
          >
            <button
              onClick={() => scrollToSection("section1")}
              className="mx-4 my-2 block hover:text-secondary md:my-0"
            >
              Who We Are
            </button>
            <button
              onClick={() => scrollToSection("section2")}
              className="mx-4 my-2 block hover:text-secondary md:my-0"
            >
              What We Offer
            </button>
            <button
              onClick={() => scrollToSection("section3")}
              className="mx-4 my-2 block hover:text-secondary md:my-0"
            >
              Trusted Network
            </button>
            <button
              onClick={() => scrollToSection("section4")}
              className="mx-4 my-2 block hover:text-secondary md:my-0"
            >
              Need Help?
            </button>
            <button
              onClick={() => scrollToSection("section5")}
              className="mx-4 my-2 block hover:text-secondary md:my-0"
            >
              Our Terms
            </button>
            <Link
              href="/auth/signin"
              className="mx-4 my-2 block hover:text-secondary md:my-0"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      <main className="con">
        <HeroBanner />
        <About ref={sectionRefs.section1} />
        <PublicBanner />
        <OurServices ref={sectionRefs.section2} />
        <Testimonial ref={sectionRefs.section3} />
        {/* <ClientReviews /> */}

        <FAQ ref={sectionRefs.section4} />
        <TermsAndConditions ref={sectionRefs.section5} />
      <Footer />
      </main>
    </>
  );
}
