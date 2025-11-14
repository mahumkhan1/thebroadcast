import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// import "../styles/globals.css";
import NavBar from "../components/navbar";
import BottomLine from "../components/bottomline";

export default function BroadcastHome() {
  return (
    <div className="min-h-screen bg-[#010101] text-[#008000] flex flex-col font-[VT323]">
      <NavBar />
      
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* CRT static background */}
        <div className="absolute inset-0 opacity-15 bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5c/Static_White_Noise.gif')] bg-cover mix-blend-screen" />

        {/* Screen text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center p-8 max-w-2xl"
        >
          <h2 className="text-5xl text-[#008000] drop-shadow-[0_0_15px_rgba(0,128,0,0.8)] mb-4 animate-pulse">
            [THE STATIC IS CLEARING...]
          </h2>
          <p className="text-2xl text-[#008000]/80 leading-relaxed tracking-wide">
            A <span className="text-[#008000]">glitch in the system</span> revealing UC’s hidden networks, regent ties, and DOD-backed funding streams.
            <br /> Tune into the resistance and amplify the broadcast.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="retro-button">
              <Link href="/frequencies">Tune In</Link>
              {/* Tune In */}
            </button>
            {/* <button className="px-5 py-2 border border-[#008000]/50 text-[#008000] rounded-md text-lg hover:bg-[#008000]/10 transition-all">View Frequencies</button> */}
          </div>
        </motion.div>
      </main>

      <BottomLine />
    </div>
  );
}
