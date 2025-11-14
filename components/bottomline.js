import { motion } from "framer-motion";

export default function BottomLine() {
  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-[#008000]/40 bg-black/80 overflow-hidden py-2">
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="whitespace-nowrap text-[#008000] text-lg tracking-wide drop-shadow-[0_0_8px_rgba(0,128,0,1)]"
        >
          ⚠️ SYSTEM ALERT: Funding Data Leaked — Broadcast Transmissions to Complicit Parties  — Student Mobilization in Progress ⚠️
        </motion.div>
    </div>

    
  );
}

