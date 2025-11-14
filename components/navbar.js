import Link from "next/link";

export default function NavBar() {
  return (
    <header className="z-30 w-full py-4 px-6 flex items-center justify-between border-b border-[#008000]/40 bg-[#020202] shadow-inner">
        <div className="flex items-center gap-4">
          <div className="w-14 h-10 flex items-center justify-center bg-[#050505] rounded-sm shadow-inner border border-[#008000]/40 logo-flicker">
            <span className="text-lg tracking-widest text-[#008000]">
              📺
              
            </span>
          </div>
          <div>
            <h1 className="text-2xl tracking-wide text-[#008000] drop-shadow-[0_0_8px_rgba(0,128,0,0.7)]">
              <Link href="/" >THE BROADCAST</Link>
            
            </h1>
            <p className="text-[13px] text-[#008000]/70"> </p>
          </div>
        </div>
    <nav className="flex justify-center gap-8 p-4 bg-black text-[#008000] font-mono border-b border-[#008000]/30">
      <Link href="/" className="hover:text-[#00ff00] transition-colors">Home</Link>
      <Link href="/frequencies" className="hover:text-[#00ff00] transition-colors">Frequencies</Link>
      <Link href="/emails" className="hover:text-[#00ff00] transition-colors">Email Campaigns</Link>
      <Link href="/exposure" className="hover:text-[#00ff00] transition-colors">Exposure Terminal</Link>
    </nav>
    </header>
    
  );
}