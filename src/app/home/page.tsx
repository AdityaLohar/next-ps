'use client'
import Alumni from "@/components/Alumni";
import Benefits from "@/components/Benefits";
import BottomBar from "@/components/BottomBar";
import CaseStudies1 from "@/components/CaseStudies1";
import Companies from "@/components/Companies";
import HomeHeroSection from "@/components/HomeHeroSection";
import MeetMentors from "@/components/MeetMentors";
import NewsLetter from "@/components/NewsLetter";
import Results from "@/components/ResultsHome";
import { useState, useEffect } from "react";

const Home = () => {
  const [showBottomBar, setShowBottomBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const screenHeight = window.innerHeight;

      if (scrollPosition > (4 * screenHeight) / 5) {
        setShowBottomBar(true);
      } else {
        setShowBottomBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-hind xl:flex xl:flex-col items-center">
      {/* <Helmet>
        <title>Product Space | The Only Personalized Product Management Course for Your Unique Journey</title>
        <meta
          name="description"
          content="Join our PM Fellowship cohort to upskill and excel into product management roles from any background. Get access to industry live projects, 1-1 expert mentorship, and placement support to thrive in your PM job."
        />
      </Helmet> */}

      <div className="bg-transparent py-2 max-w-screen-xl lg:py-16">
        <HomeHeroSection />
      </div>

      <div className="w-full max-w-screen-2xl">
        <Benefits bgColor={"#F5F5F5"} />
        <Companies />
      </div>

      <hr className="w-full max-w-screen-xl border-t-2" />

      <div className="w-full max-w-screen-2xl space-y-10 md:space-y-0">
        <Results />
        <Alumni />
        <MeetMentors bgColor={"#F5F5F5"} />
        <CaseStudies1 />
        <NewsLetter />
      </div>

      {showBottomBar && <BottomBar />}
    </div>
  );
};

export default Home;