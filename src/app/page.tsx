import Link from "next/link";
import { LayoutTemplate, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6 leading-tight font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_50%)] animate-pulse shadow-sm"></div>
      </div>

      <div className="max-w-3xl text-center space-y-8 relative z-10">
        <div className="inline-flex items-center justify-center p-4 bg-sky-500/10 text-sky-400 rounded-full mb-4 ring-1 ring-sky-500/30">
          <LayoutTemplate size={32} />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
          Build landing pages at the speed of thought.
        </h1>
        
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Structured content meets swappable components. Define your page once, and switch themes instantly without touching the code.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-zinc-950 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)] hover:shadow-[0_0_60px_-10px_rgba(56,189,248,0.7)] hover:-translate-y-1"
          >
            Go to Dashboard
            <ArrowRight size={20} />
          </Link>
          <a
            href="https://github.com/example/vibecoding"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all"
          >
            View GitHub
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-zinc-500 text-sm font-medium">
        Powered by Next.js App Router, Tailwind v4, and Prisma.
      </div>
    </div>
  );
}
