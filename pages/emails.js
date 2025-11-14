"use client";
import React, { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";

import NavBar from "../components/navbar";
import BottomLine from "../components/bottomline";

function EmailOverlay({ emailData, onClose, onSend }) {
  if (!emailData) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-zinc-950 border border-[#00ff00]/50 rounded-2xl p-6 w-[90%] max-w-2xl text-[#00ff00] font-[VT323] shadow-[0_0_20px_#00ff00]">
        <h2 className="text-3xl mb-4 text-center tracking-wider">📡 TRANSMISSION READY</h2>

        <div className="space-y-2 mb-4 text-sm">
          <p><span className="text-green-400">Subject:</span> {emailData.subject}</p>
          <p><span className="text-green-400">From:</span> {emailData.sender_email}</p>
          <p><span className="text-green-400">To:</span> {emailData.recipient_emails}</p>
        </div>

        <textarea
          readOnly
          className="w-full h-60 p-3 bg-zinc-900 border border-[#00ff00]/30 rounded focus:outline-none text-[#00ff00]"
          value={emailData.content}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="bg-[#00ff00]/30 hover:bg-[#00ff00]/60 text-black px-4 py-2 rounded-md"
          >
            Close
          </button>
          <button
            onClick={onSend}
            className="bg-[#00ff00]/80 hover:bg-[#00ff00] text-black px-4 py-2 rounded-md"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}


function Card({ title, description, status, objective, recipients, address_to_email }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");

  // generated emails states
  const [loading, setLoading] = useState(false);

  // sending emails states
  const [emailData, setEmailData] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleFlip = (flipTo) => {
    setIsFlipped(flipTo);
  };

  const handleGenerate = async () => {
    if (!alias || !email) {
      alert("Please enter alias and email!");
      return;
    }

    // if (email.endsWith("@uc.edu") === false) {
    //   alert("Please enter a valid email address!");
    //   return;
    // }

    setLoading(true);
    // setGeneratedEmail("");
    setEmailData(null);

    try {
      const prompt = `
        Write a professional advocacy email from ${alias} with the email <${email}> 
        about "${title}": ${description}. 
        The objective is to "${objective}". 
        It should be addressed to "${recipients}" with email addresses "${address_to_email}". 
        Make it is in paragraph format and do not include information about the sender except signed by their name. 
      `;

      const res = await fetch("/api/generate-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      let text = data.text?.trim() || "";
      text = text.replace(/```json|```/gi, "").trim();

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        // fallback: construct a JSON object manually
        parsed = {
          subject: title || "Generated Email",
          sender_email: email,
          recipient_emails: address_to_email,
          content: text,
        };
      }

      setEmailData(parsed);
      setShowOverlay(true);

    } catch (err) {
      console.error(err);
      alert("Error generating email");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
  if (!emailData) return;

  const subject = encodeURIComponent(emailData.subject);
  const body = encodeURIComponent(emailData.content);
  const recipients = encodeURIComponent(emailData.recipient_emails);

  const mailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipients}&su=${subject}&body=${body}`;
  window.open(mailURL, "_blank");
};

  // const handleSend = async () => {
  //   alert(`📧 Email sent to: ${emailData.recipient_emails}`);
  //   setShowOverlay(false);
  // };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  return (
    <div className="relative w-full h-[280px] card-perspective">
      <div 
        className={`relative w-full h-full card-wrapper ${isFlipped ? 'is-flipped' : ''} rounded-2xl`}
      >
        {/* FRONT SIDE */}
        <div
          className={`absolute inset-0 bg-zinc-900 border border-[#00ff00]/50 rounded-2xl
                      p-5 flex flex-col backface-hidden card-side-front`}
        >
        <div className="p-5 flex flex-col h-full">
          <h2 className="text-4xl text-[#00ff00] mb-2 tracking-wider line-clamp-2">{title}</h2>
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {description}
          </div>

          <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#00ff00]/30">
            <span className="uppercase text-xs text-green-400 tracking-widest">{status}</span>
            <button className="retro-button" onClick={() => handleFlip(true)}>
              <Send size={16} /> Launch
            </button>
          </div>
        </div>

        </div>

        {/* BACK SIDE */}
        <div className={`absolute inset-0 bg-black/90 border border-[#00ff00]/50 rounded-2xl 
                      p-5 flex flex-col justify-between backface-hidden card-side-back`} >
          <div>
            <label className="text-green-300 text-xl block mb-1">Alias</label>
            <input
              className="w-full p-2 mb-3 bg-zinc-950 border border-[#00ff00]/40 rounded text-[#00ff00] focus:outline-none focus:border-[#00ff00]"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Your_Name"
            />
            <label className="text-green-300 text-xl block mb-1">Email Address</label>
            <input
              className="w-full p-2 bg-zinc-950 border border-[#00ff00]/40 rounded text-[#00ff00] focus:outline-none focus:border-[#00ff00]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sample@email.com"
            />
          </div>
          <div className="flex justify-between items-center mt-3">

            <button className="retro-button" onClick={() => handleFlip(false)}>
              <Send size={16} /> Back
            </button>
            <button className="retro-button" onClick={handleGenerate} >
              {loading ? "Generating..." : "Generate Transmission"}
            </button>
          </div>
        </div>
      </div>


      {/* Display the generated email */}
      {showOverlay && (
        <EmailOverlay
          emailData={emailData}
          onClose={() => setShowOverlay(false)}
          onSend={handleSend}
        />
      )}


      <style jsx>{`
        .card-perspective {
          perspective: 1000px;
        }
        .card-wrapper {
          transform-style: preserve-3d;
          transition: transform 0.6s;
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

        /* Custom scrollbar for descriptions */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #00ff00;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>

    </div>
  );
}

export default function EmailCampaigns() {
  const campaigns = [
    {
      title: "UC Regents urge Campaign",
      description:
        "Send automated, personalized emails to UC regents urging zero waste initiative",
      objective: "To urge be happy again",
      recipients: "sample, sample2, sample3",
      address_to_email: "sample@email.com, sample2@email.com, sample3@email.com",
    },
    {
      title: "Chancellor Outreach",
      description:
        "Generate advocacy emails to each UC chancellor’s office calling for ethical divestment.",
    },
    {
      title: "Student Organization Call to Action",
      description:
        "Encourage campus orgs to cut ties with military-affiliated research programs.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#010101] text-[#00ff00] flex flex-col font-[VT323]">
      <NavBar />

      <h1 className="text-5xl mt-10 mb-8 text-center tracking-widest drop-shadow-[0_0_15px_#00ff00]">
        EMAIL BROADCAST STATION
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
        {campaigns.map((campaign, i) => (
          <Card key={i} {...campaign} />
        ))}
      </div>

      <BottomLine />
    </div>
  );
}
