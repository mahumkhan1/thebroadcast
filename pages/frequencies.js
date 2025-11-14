"use client";
import React, { useState } from "react";
import NavBar from "../components/navbar";
import BottomLine from "../components/bottomline";

export default function Frequencies() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Emergency Town Hall Mobilization",
      body:
        "Organizers are asking all members to attend the Thursday town hall. We need voices on agenda item 4-B regarding campus sustainability violations.",
      createdAt: "2025-01-14",
      author: "Operations Command",
    },
    {
      id: 2,
      title: "Email Blitz: Divestment Push",
      body:
        "Next 48 hours: send directed emails to administrative offices urging financial transparency. Templates available on the Broadcast Station.",
      createdAt: "2025-01-14",
      author: "Signal Tower",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#010101] text-[#00ff00] font-[VT323] flex flex-col">
      <NavBar />

      <h1 className="text-5xl mt-10 mb-8 text-center tracking-widest drop-shadow-[0_0_15px_#00ff00]">
        FREQUENCIES FEED
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 pb-20">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-zinc-900 border border-[#00ff00]/50 rounded-2xl p-5 shadow-[0_0_20px_#00ff00] flex flex-col h-full"
          >
            {/* HEADER ROW */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl tracking-wider leading-tight w-[70%]">
                {post.title}
              </h2>
              <span className="text-sm text-green-400 w-[30%] text-right">
                {post.createdAt}
              </span>
            </div>

            {/* SCROLLING BODY */}
            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar text-lg leading-relaxed">
              {post.body}
            </div>

            {/* FOOTER */}
            <div className="mt-5 pt-3 border-t border-[#00ff00]/30 text-green-300 text-right text-sm">
              — {post.author}
            </div>
          </div>
        ))}
      </div>

      <BottomLine />

      {/* Scrollbar styling */}
      <style jsx>{`
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
