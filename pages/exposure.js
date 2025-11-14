"use client";
import React, { useState } from "react";
import NavBar from "../components/navbar";
import BottomLine from "../components/bottomline";
import { details, image, title } from "framer-motion/client";

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#00ff00]/80 text-black hover:bg-[#00ff00] transition-transform duration-150 
                 px-4 py-2 rounded-md flex items-center gap-2 font-[VT323] text-lg 
                 shadow-[0_0_10px_#00ff00] hover:scale-105"
    >
      {children}
    </button>
  );
}

function Card({ name, title, image, term, details }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (flipTo) => setIsFlipped(flipTo);

  return (
    <div className="relative w-full card-perspective">
      <div
        className={`relative w-full card-wrapper ${
          isFlipped ? "is-flipped" : ""
        } rounded-2xl`}
      >
        {/* FRONT SIDE */}
        <div
          className={`bg-zinc-900 border border-[#00ff00]/50 rounded-2xl
                      p-5 flex flex-col justify-between backface-hidden card-side-front`}
        >
          <div className="w-full flex justify-center mb-3">
            <img
              src={image}
              alt={name}
              className="w-24 h-24 object-cover rounded-md border-2 border-[#00ff00]/60 shadow-[0_0_10px_#00ff00]"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-4xl text-[#00ff00] mb-2 tracking-wider line-clamp-2">
              {name}
            </h2>
            <p className="text-green-400 text-2xl mb-2">{title}</p>
            {/* Term of Appointment */}
            {term && (
              <div className="border-t border-[#00ff00]/60 pt-2 text-sm text-green-300">
                <span className="font-semibold text-green-400">
                  Term of Appointment:
                </span>{" "}
                {term}
              </div>
            )}

            <div className="flex justify-end items-center mt-3 pt-2 border-t border-[#00ff00]/30">
              <button className="retro-button" onClick={() => handleFlip(true)}>
                Reveal File
              </button>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-black/90 border border-[#00ff00]/50 rounded-2xl 
                      p-5 flex flex-col justify-between backface-hidden card-side-back`}
        >
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar text-green-300 text-2xl leading-relaxed">
            {details}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button className="retro-button" onClick={() => handleFlip(false)}>
              Close File
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-perspective {
          perspective: 1000px;
        }
        .card-wrapper {
          transform-style: preserve-3d;
          transition: transform 0.6s;
          position: relative;
        }
        .card-wrapper.is-flipped {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .card-side-back {
          transform: rotateY(180deg);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #00ff00;
          border-radius: 10px;
        }

        .retro-button {
          background: rgba(0, 255, 0, 0.8);
          color: black;
          font-family: "VT323";
          font-size: 1.1rem;
          border-radius: 6px;
          padding: 6px 14px;
          box-shadow: 0 0 10px #00ff00;
          transition: all 0.2s ease;
        }
        .retro-button:hover {
          background: #00ff00;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}


export default function ExposureTerminal() {
  const keyPlayers = [
    {
      name: "Maria Anguiano ",
      title: "Vice Chair of the Board of Regents", 
      image: "/maria1.jpg",
      term: "June 16, 2017 - March 1, 2028", 
      details: "Previously, she was Vice Chancellor of Planning & Budget at UC Riverside where she managed their $800 million budget. Anguiano has served as the chief financial officer for the for-profit college/ed-tech capital venture startup Minerva Project, held a senior advisory role at the Bill and Melinda Gates Foundation, and held finance roles at Barclays Capital and Deloitte. In 2020, while Anguiano was a Regent, the Minerva Project announced a partnership with Berkeley Law. The Bill and Melinda Gates Foundation has spent billions of dollars on failed initiatives to reform public education, including breaking up large schools, implementing Common Core standards, and evaluating teachers by standardized test scores. Anguiano is on the Board of the KIPP Foundation, which manages a network of charter schools. KIPP schools have been the subject of multiple sexual misconduct investigations. In 2022, it was revealed that KIPP's director of technology had embezzled $2.2 million which he spent on cars and sports memorabilia which was intended for laptops and other equipment.",
    },
    {
      name: "Richard Lieb",
      title: "Academic and Student Affairs (Chair)",
      image: "/richard.jpg",
      term: "August 6, 2018 - March 1, 2026",
      details:
        "Richard is what one may call a jack of all trades and a master of none. He has worked for a business consulting firm, for a liquid waste recycling facility, for a debt underwriting group, as a political staffer, and as a political fundraiser. In high school, he scored in the bottom 2% of the math and English SAT achievement tests and earned a 3.4 GPA. After graduating from UC Santa Barbara, he worked on Governor Brown’s 1980 unsuccessful presidential campaign. He ran unsuccessfully for Santa Barbara City Council in a race where he was accused of being a carpetbagger because he moved into the City of Santa Barbara from nearby Goleta. His background includes serving as vice president at Lockheed Martin IMS for two years. He also has served as a director of Green Dot Public Schools, a company that operates charter schools. For context, one of the main criticisms of charter schools is that they divert public funds away from public schools. His great-grandfather-in-law is Hollywood mogul and Fox Studio Executive Sol M. Wurtzel. He has also recently faced backlash for liking Islamophobic posts on Twitter. Forget academics. Forget scientists. The writers of this report can think of no one more qualified than Richard Lieb to be a member of the highest governing body of the nation’s preeminent public university system.",
    },
    {
      name: "Gareth Elliott", 
      title: "Compliance and Audit", //Finance and Capital Strategies",
      image: "/gareth.jpg",
      term: "January 2, 2025 - March 1, 2037",
      details:
        "He is a partner at Sacramento Advocates, Inc., a California lobbying firm. Clients of Sacramento Advocates include Israeli company Teva Pharmaceuticals, which is listed as a pressure target by the BDS National Committee. His area of expertise is in advising on the state budget (which also partially funds the University of California system). He previously served in several high-ranking positions in the California state government, including in Governor Brown’s cabinet. In 2014, it was reported that Gareth Elliott (California Legislative Secretary at the time), California Secretary of Labor David Lanier, and other employees appointed by Governor Brown violated state law and the governor’s own conflict of interest policy by failing to turn over complete and accurate financial disclosure records.",
    },
    {
      name: "Michael Cohen",
      title: "Compliance and Audit, Finance and Capital Strategies (Chair), Governance Investments and Nominations (Chair)",
      image: "/michael.jpg",
      term: "August 6, 2018 - March 1, 2030",
      details: 
        "He is the CFO and Interim Chief Operating Investment Officer of CalPERS, the largest public pension fund in the United States. According to their 2022-23 annual investment report, CalPERS owns $829,281,990 in securities issued by the Bank of Israel. The University of California’s retirement plan (UCRP) has a reciprocal retirement agreement with CalPERS. For context, a reciprocity agreement allows employees to combine service credit and compensation from both plans. Moreover, Cohen and Gareth Elliot both spent time together from 2013-15 in Governor Brown’s cabinet, where Cohen was Director of Finance."
    }, 
    {
      name: "Nancy Lee",
      title: "Finance and Capital Strategies, Investments, National Laboratories, Nominations, Public Engagement and Development",
      image: "/nancy.jpg",
      term: "August 6, 2018 - March 1, 2030",
      details:    
        "She is the Chief of Staff to Robert A. Iger, CEO of The Walt Disney Company. She is also the Executive Vice President of Disney’s International Business Operations."
    }, 
    {
      name: "Mark Robinson",
      title: "Finance and Capital Strategies, Governance, Investments (Chair), National Labs, Public Engagement and Development",
      image: "/mark.jpg",
      term: "July 22, 2022 - March 1, 2034",
      details:    
        "He is a partner at Centerview Partners, a leading global investment banking firm, where he primarily advises pharmaceutical, biotechnology, and medical device companies. He previously was co-chair on the advisory board to the UC Berkeley College of Letters & Science and a trustee for the UC Berkeley Foundation. Yossi Cohen, the former director of Mossad, was appointed a Senior Advisor of Centerview Partners in 2021. "
    },
    {
      name: "Jonathan \"Jay\" Sures", 
      title: "Academic and Student Affairs, Compliance and Audit, Governance Health Services (Chair), National Laboratories", 
      image: "/jay.jpg",
      term: "January 4, 2019 - March 1, 2032",
      details:
        "He is Vice Chairman and Managing Director of United Talent Agency (UTA). Susan Sarandon, an Academy Award-winning actress, was dropped by UTA in November 2023 for being critical of the Israeli occupation and genocide. Sures is also the Chair of the Board of Governors of Lawrence Livermore National Laboratory. Sures has been Chair of the Board of Directors of Triad National Security, which is the governing body of Los Alamos National Laboratory, since December 2023. Both laboratories are primarily responsible for the development and security of the U.S nuclear stockpile. In January 2024, Sures pushed a policy that would ban political statements by faculty members on university websites. At the January 2024 Regents meeting, Regent Hadi Makarechian noted that the policy was brought “because some people were making political statements related to Hamas and the Palestinians.” Sures responded by acknowledging that “there was an abuse of the websites and there was not a defined policy in place.” If you’re confused as to why a Hollywood talent manager is leading two national laboratories in charge of nuclear weapons and is setting policies on academic freedom in universities, then just know that so are we."
    }, 
    {
      name: "Jose Hernandez", 
      title: "Academic and Student Affairs, Governance National Laboratories (Chair), Public Engagement and Development", 
      image: "/jose.jpg",
      term: "August 20, 2021 - March 1, 2033",
      details:
        "He is currently President and Chief Executive Officer at Tierra Luna Engineering, LLC, an aerospace consulting firm. He is also currently a Senior Advisor for the Las Vegas Spaceport project, a planned private spaceport. He was President of PT Strategies at PT Capital/PT Strategies, a private equity investment firm, from 2013 to 2016. Hernandez was Executive Director of Strategic Operations at MEI Technologies Inc., a space technology company that has contracts with NASA and the Department of Defense, from 2011 to 2012. He was Program Manager, Group Leader and Engineer at Lawrence Livermore National Laboratory from 1985 to 2001. In 2011, Hernandez unsuccessfully ran as a Democratic candidate to represent California’s 10th Congressional District. During his Congressional campaign, he was criticized for a tax lien imposed by the IRS in 2010 but only paid in 2012."
    },
  ];

  return (
    <div className="min-h-screen bg-[#010101] text-[#00ff00] flex flex-col font-[VT323]">
      <NavBar />

      <h1 className="text-5xl mt-10 mb-8 text-center tracking-widest drop-shadow-[0_0_15px_#00ff00]">
        EXPOSURE TERMINAL
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
        {keyPlayers.map((person, i) => (
          <Card key={i} {...person} />
        ))}
      </div>

      <BottomLine />
    </div>
  );
}
