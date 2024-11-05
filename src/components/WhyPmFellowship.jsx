import vector1 from "../assets/benifits-1-1 1.svg";
import vector3 from "../assets/benifits-2-1 1.svg";
import vector2 from "../assets/Vector (3).svg";
import vector4 from "../assets/Vector (4).svg";
import underline from "../assets/yellow-underline.png";

const BenefitCard = ({ vector, title, desc, size }) => {
  return (
    <div>
      <div
        className={`bg-white rounded-2xl p-4 items-center justify-center text-center sm:text-start min-h-full hover:cursor-arrow transition-shadow duration-100 hover:shadow-[0_0px_18px_rgba(151,71,255,0.3)]`}
      >
        <div
          className={`flex ${
            size == 16 ? "mb-4" : "mb-6"
          } justify-center sm:justify-start`}
        >
          <img src={vector} alt="" className={`w-${size} h-${size - 1}`} />
        </div>
        <div className="text-[20px] lg:text-[28px] font-semibold mb-4 lg:mb-10 font-sans">
          {title}
        </div>
        <div className="text-[14px] lg:text-[18px] text-gray-500 font-medium md:leading-7">
          {desc}
        </div>
      </div>
    </div>
  );
};

const WhyPmFellowship = ({ bgColor }) => {
  return (
    <div className={`flex flex-col bg-[${bgColor}] pb-7 pt-3 lg:pt-0`}>
      <div className="py-5 lg:py-12">
        <div className="text-[24px] lg:text-[40px] font-bold px-2 text-center font-sans">
          Why should you{" "}
          <span
            className="pb-1 bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${underline})`,
              backgroundSize: "60%",
              backgroundPosition: "bottom right"
            }}
          >
            choose
          </span>{" "}
          our <span className="text-black">PM Fellowship Program</span>
        </div>
        <div className="text-[16px] text-center text-gray-800 font-medium mt-2 px-4 xl:px-60">
          <p>Connect with Mentors and Alums to get career counselling </p>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-5 px-2 lg:px-16 py-4 lg:py-8">
        <div>
          <div
            className={`bg-white rounded-2xl p-4 items-center justify-center text-center sm:text-start min-h-full hover:cursor-arrow transition-shadow duration-100 hover:shadow-[0_0px_18px_rgba(151,71,255,0.3)]`}
          >
            <div className={`flex mb-2 justify-center sm:justify-start`}>
              <img src={vector1} alt="" className="w-[70px] h-[70px]" />
            </div>
            <div className="text-[20px] lg:text-[28px] font-semibold mb-4 lg:mb-10 font-sans">
              Personalized Guidance
            </div>
            <div className="text-[14px] lg:text-[18px] text-gray-500 font-medium md:leading-7">
              With dedicated 1:1 mentorship by seasoned product leaders like
              VPs, Directors & Sr PMs
            </div>
          </div>
        </div>

        <BenefitCard
          vector={vector2}
          title={"Interview Preparation"}
          desc={`Comprehensive interview preparation, feedback sessions and mock
            interviews.`}
          size={16}
        />

        <div>
          <div
            className={`bg-white rounded-2xl p-4 items-center justify-center text-center sm:text-start min-h-full hover:cursor-arrow transition-shadow duration-100 hover:shadow-[0_0px_18px_rgba(151,71,255,0.3)]`}
          >
            <div className={`flex mb-2 justify-center sm:justify-start`}>
              <img src={vector3} alt="" className="w-[70px] h-[70px]" />
            </div>
            <div className="text-[20px] lg:text-[28px] font-semibold mb-4 lg:mb-10 font-sans">
              Industry Focus Content
            </div>
            <div className="text-[14px] lg:text-[18px] text-gray-500 font-medium md:leading-7">
            Actionable insights tailored to specific domains & real product use-cases.
            </div>
          </div>
        </div>

        <div>
          <div
            className={`bg-white rounded-2xl p-4 items-center justify-center text-center sm:text-start min-h-full hover:cursor-arrow transition-shadow duration-100 hover:shadow-[0_0px_18px_rgba(151,71,255,0.3)]`}
          >
            <div className={`flex mb-4 justify-center sm:justify-start`}>
              <img src={vector4} alt="" className="h-16 w-14 md:h-14" />
            </div>
            <div className="text-[20px] lg:text-[28px] font-semibold mb-4 lg:mb-10 font-sans">
              Job Placements Support
            </div>
            <div className="text-[14px] lg:text-[18px] text-gray-500 font-medium md:leading-7">
              Access to the latest jobs from 350+ product companies
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyPmFellowship;
