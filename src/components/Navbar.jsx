'use client';

import { useEffect, useRef, useState } from "react";
import logo from "../assets/ps-logo-dark.svg";
import { RiArrowRightSFill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { isOpenFormState, isVisibleformState } from "../atoms/modalState";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  console.log("Router object:", router);
  
  const navigationRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [daysToGo, setDaysToGo] = useState(0);

  const [isVisible, setIsVisible] = useRecoilState(isVisibleformState); // Recoil for visibility
  const [isOpenForm, setIsOpenForm] = useRecoilState(isOpenFormState);

  const toggleModal = () => {
    if (!isOpenForm) {
      setIsOpenForm(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsOpenForm(false), 300);
    }
  };

  const handleScrollOrNavigate = () => {
    if (router.pathname === "/pm-fellowship") {
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/pm-fellowship#reviews");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const screenHeight = window.innerHeight;
      const buffer = 20; // Adjust the buffer size if needed

      if (scrollPosition < screenHeight - buffer) {
        setShowTopBar(true);
      } else if (scrollPosition > screenHeight + buffer) {
        setShowTopBar(false);
      }
    };

    const calculateDaysLeft = () => {
      const cohortDate = new Date("2024-11-30");
      const today = new Date();
      const diffTime = cohortDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysToGo(diffDays);
    };

    calculateDaysLeft();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    if (navigationRef.current) {
      if (isOpen) {
        navigationRef.current.classList.remove("active");
      } else {
        navigationRef.current.classList.add("active");
      }
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg">
      {showTopBar && (
        <div className="text-white py-2 font-semibold items-center text-center bg-[#AEECFF]">
          <div className="container mx-auto flex items-center justify-center text-yellow-500 gap-1 lg:gap-2 text-[10px] lg:text-[14px]">
            <div className="text-black">NEXT COHORT STARTS: 30th November</div>
            <Link href="/pm-fellowship">
              <button className="bg-[#130D00] px-2 py-1 rounded-md">
                {daysToGo} DAYS TO GO
              </button>
              <div className="text-black">
                <RiArrowRightSFill />
              </div>
            </Link>
          </div>
        </div>
      )}

      <div className="flex justify-between w-full items-center px-[10px] md:px-[80px] lg:px-[120px] py-[15px] custom-12:px-[0px] xl:mx-auto max-w-screen-2xl font-hind">
        <Link href="/" className="hidden lg:block font-semibold text-[23px] pb-1 font-serif">
          Product <span className="text-[#21C1F3]">Space</span>
        </Link>

        <div className="flex gap-4 items-center">
          <div className="lg:hidden">
            <button onClick={toggleNavbar} className="text-black focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          <div className="lg:hidden font-semibold text-[23px] pb-1 font-serif">
            <Link href="/">
              <Image src={logo} alt="Logo" />
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex space-x-8 items-center">
          <div className="hidden lg:flex space-x-10 xl:space-x-16 font-medium text-[18px]">
            <Link href="/pm-fellowship" className="hover:underline flex items-center gap-1">
              PM Fellowship
            </Link>
            <Link href="/pm-hackathon" className="hover:underline">
              PM Hackathon
            </Link>
            <a onClick={handleScrollOrNavigate} className="hover:cursor-pointer hover:underline flex items-center gap-1">
              Alumni
            </a>
            <Link href="/blogs" className="hover:underline flex items-center gap-1">
              Blogs
            </Link>
            <button onClick={toggleModal} className="hover:underline flex items-center gap-1">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={navigationRef}
        className={`lg:hidden flex flex-col items-start h-0 px-[15px] md:px-[80px] space-y-4 py-0 transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'h-auto py-4' : ''}`}
      >
        <Link href="/pm-fellowship" className="hover:underline">
          PM Fellowship
        </Link>
        <Link href="/pm-hackathon" className="hover:underline">
          PM Hackathon
        </Link>
        <a onClick={handleScrollOrNavigate} className="hover:underline">
          Alumni
        </a>
        <Link href="/blogs" className="hover:underline">
          Blogs
        </Link>
        <button onClick={toggleModal} className="hover:underline flex items-center gap-1">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default Navbar;