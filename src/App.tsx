import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Palette, Github, Linkedin, Mail, ExternalLink, Code2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import all 240 frames
const frames = Array.from({ length: 240 }, (_, i) => 
  new URL(`./assets/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`, import.meta.url).href
);

gsap.registerPlugin(ScrollTrigger);

type ThemeKey = 'purple' | 'emerald' | 'ocean' | 'sunset' | 'forest' | 'rose';

const themes: Record<ThemeKey, { 
  bg: string; 
  surface: string; 
  text: string; 
  accent: string; 
  muted: string; 
  border: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
  scrollbarThumbHover: string;
}> = {
  purple: {
    bg: "bg-[#0f0320]",
    surface: "bg-[#1a0b2e]",
    text: "text-[#e4d4f4]",
    accent: "text-[#c084fc]",
    muted: "bg-[#4c1d95]/30",
    border: "border-[#6d28d9]/30",
    scrollbarTrack: "#1a0b2e",
    scrollbarThumb: "linear-gradient(180deg, #8b5cf6, #ec4899)",
    scrollbarThumbHover: "linear-gradient(180deg, #a78bfa, #f472b6)",
  },
  emerald: {
    bg: "bg-[#0a0f1a]",
    surface: "bg-[#0f1729]",
    text: "text-[#d4f4dd]",
    accent: "text-[#10b981]",
    muted: "bg-[#065f46]/30",
    border: "border-[#059669]/30",
    scrollbarTrack: "#0f1729",
    scrollbarThumb: "linear-gradient(180deg, #10b981, #14b8a6)",
    scrollbarThumbHover: "linear-gradient(180deg, #34d399, #2dd4bf)",
  },
  ocean: {
    bg: "bg-[#020617]",
    surface: "bg-[#0f172a]",
    text: "text-[#dbeafe]",
    accent: "text-[#3b82f6]",
    muted: "bg-[#1e3a8a]/30",
    border: "border-[#1d4ed8]/30",
    scrollbarTrack: "#0f172a",
    scrollbarThumb: "linear-gradient(180deg, #3b82f6, #0ea5e9)",
    scrollbarThumbHover: "linear-gradient(180deg, #60a5fa, #38bdf8)",
  },
  sunset: {
    bg: "bg-[#1c0a00]",
    surface: "bg-[#2d1406]",
    text: "text-[#fed7aa]",
    accent: "text-[#fb923c]",
    muted: "bg-[#9a3412]/30",
    border: "border-[#c2410c]/30",
    scrollbarTrack: "#2d1406",
    scrollbarThumb: "linear-gradient(180deg, #fb923c, #f97316)",
    scrollbarThumbHover: "linear-gradient(180deg, #fdba74, #fb923c)",
  },
  forest: {
    bg: "bg-[#061a0f]",
    surface: "bg-[#0d2818]",
    text: "text-[#d1fae5]",
    accent: "text-[#22c55e]",
    muted: "bg-[#14532d]/30",
    border: "border-[#15803d]/30",
    scrollbarTrack: "#0d2818",
    scrollbarThumb: "linear-gradient(180deg, #22c55e, #16a34a)",
    scrollbarThumbHover: "linear-gradient(180deg, #4ade80, #22c55e)",
  },
  rose: {
    bg: "bg-[#1f0b14]",
    surface: "bg-[#2d1420]",
    text: "text-[#fce7f3]",
    accent: "text-[#f43f5e]",
    muted: "bg-[#881337]/30",
    border: "border-[#be123c]/30",
    scrollbarTrack: "#2d1420",
    scrollbarThumb: "linear-gradient(180deg, #f43f5e, #e11d48)",
    scrollbarThumbHover: "linear-gradient(180deg, #fb7185, #f43f5e)",
  },
};

export default function PortfolioInspired() {
  const [theme, setTheme] = useState<ThemeKey>("purple");
  const t = themes[theme];

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<HTMLDivElement>(null);
  const frameImageRef = useRef<HTMLImageElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Update scrollbar colors when theme changes
  useEffect(() => {
    document.documentElement.style.setProperty('--scrollbar-track', t.scrollbarTrack);
    document.documentElement.style.setProperty('--scrollbar-thumb', t.scrollbarThumb);
    document.documentElement.style.setProperty('--scrollbar-thumb-hover', t.scrollbarThumbHover);
  }, [theme, t]);

  useEffect(() => {
    const container = videoContainerRef.current;
    const trigger = scrollTriggerRef.current;

    if (!container || !trigger) return;

    let ctx = gsap.context(() => {
      gsap.to(container, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: `+=${(frames.length - 1) * 0.5}%`, // Distribute frames across scroll
          scrub: true,
          onUpdate: (self) => {
            // Calculate frame based on scroll progress (0 to 1)
            const progress = self.progress;
            const frameIndex = Math.min(
              Math.floor(progress * frames.length),
              frames.length - 1
            );
            setCurrentFrame(frameIndex);
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} transition-colors duration-500 relative`}>

      {/* --- FULL PAGE GRID & GLOW BACKGROUND (Behind everything) --- */}
      <div className="fixed inset-0 top-20 z-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: (() => {
              const colors = {
                purple: 'rgba(168, 85, 247, 0.15)',
                emerald: 'rgba(52, 211, 153, 0.15)',
                ocean: 'rgba(59, 130, 246, 0.15)',
                sunset: 'rgba(251, 146, 60, 0.15)',
                forest: 'rgba(34, 197, 94, 0.15)',
                rose: 'rgba(244, 63, 94, 0.15)',
              };
              const color = colors[theme];
              return `linear-gradient(0deg, ${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`;
            })(),
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Glow blob - top left */}
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{
            background: (() => {
              const gradients = {
                purple: 'radial-gradient(circle, rgba(192, 132, 252, 0.9), rgba(139, 92, 246, 0.3))',
                emerald: 'radial-gradient(circle, rgba(16, 185, 129, 0.7), rgba(5, 150, 105, 0.2))',
                ocean: 'radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(29, 78, 216, 0.3))',
                sunset: 'radial-gradient(circle, rgba(251, 146, 60, 0.8), rgba(194, 65, 12, 0.3))',
                forest: 'radial-gradient(circle, rgba(34, 197, 94, 0.7), rgba(21, 128, 61, 0.2))',
                rose: 'radial-gradient(circle, rgba(244, 63, 94, 0.8), rgba(190, 18, 60, 0.3))',
              };
              return gradients[theme];
            })(),
            filter: 'blur(80px)',
          }}
        />
        
        {/* Glow blob - top right */}
        <div 
          className="absolute -top-80 -right-40 w-80 h-80 rounded-full blur-3xl opacity-35"
          style={{
            background: (() => {
              const gradients = {
                purple: 'radial-gradient(circle, rgba(34, 211, 238, 0.7), rgba(8, 145, 178, 0.2))',
                emerald: 'radial-gradient(circle, rgba(20, 184, 166, 0.8), rgba(13, 148, 136, 0.2))',
                ocean: 'radial-gradient(circle, rgba(14, 165, 233, 0.7), rgba(3, 105, 161, 0.2))',
                sunset: 'radial-gradient(circle, rgba(249, 115, 22, 0.7), rgba(234, 88, 12, 0.2))',
                forest: 'radial-gradient(circle, rgba(22, 163, 74, 0.7), rgba(20, 83, 45, 0.2))',
                rose: 'radial-gradient(circle, rgba(225, 29, 72, 0.7), rgba(136, 19, 55, 0.2))',
              };
              return gradients[theme];
            })(),
            filter: 'blur(80px)',
          }}
        />
        
        {/* Glow blob - middle right */}
        <div 
          className="absolute top-1/3 -right-60 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: (() => {
              const gradients = {
                purple: 'radial-gradient(circle, rgba(168, 85, 247, 0.6), rgba(126, 34, 206, 0.15))',
                emerald: 'radial-gradient(circle, rgba(52, 211, 153, 0.6), rgba(16, 185, 129, 0.15))',
                ocean: 'radial-gradient(circle, rgba(96, 165, 250, 0.6), rgba(37, 99, 235, 0.15))',
                sunset: 'radial-gradient(circle, rgba(253, 186, 116, 0.6), rgba(251, 146, 60, 0.15))',
                forest: 'radial-gradient(circle, rgba(74, 222, 128, 0.6), rgba(34, 197, 94, 0.15))',
                rose: 'radial-gradient(circle, rgba(251, 113, 133, 0.6), rgba(244, 63, 94, 0.15))',
              };
              return gradients[theme];
            })(),
            filter: 'blur(80px)',
          }}
        />
        
        {/* Glow blob - bottom */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{
            background: (() => {
              const gradients = {
                purple: 'radial-gradient(circle, rgba(6, 182, 212, 0.5), rgba(8, 145, 178, 0.1))',
                emerald: 'radial-gradient(circle, rgba(45, 212, 191, 0.6), rgba(20, 184, 166, 0.1))',
                ocean: 'radial-gradient(circle, rgba(56, 189, 248, 0.5), rgba(14, 165, 233, 0.1))',
                sunset: 'radial-gradient(circle, rgba(252, 211, 77, 0.5), rgba(245, 158, 11, 0.1))',
                forest: 'radial-gradient(circle, rgba(110, 231, 183, 0.5), rgba(52, 211, 153, 0.1))',
                rose: 'radial-gradient(circle, rgba(252, 165, 165, 0.5), rgba(239, 68, 68, 0.1))',
              };
              return gradients[theme];
            })(),
            filter: 'blur(80px)',
          }}
        />

        {/* Glow blob - left side */}
        <div 
          className="absolute top-1/2 -left-32 w-72 h-72 rounded-full blur-3xl opacity-28"
          style={{
            background: (() => {
              const gradients = {
                purple: 'radial-gradient(circle, rgba(168, 85, 247, 0.5), rgba(126, 34, 206, 0.1))',
                emerald: 'radial-gradient(circle, rgba(16, 185, 129, 0.6), rgba(5, 150, 105, 0.15))',
                ocean: 'radial-gradient(circle, rgba(59, 130, 246, 0.5), rgba(29, 78, 216, 0.1))',
                sunset: 'radial-gradient(circle, rgba(251, 146, 60, 0.5), rgba(194, 65, 12, 0.1))',
                forest: 'radial-gradient(circle, rgba(34, 197, 94, 0.5), rgba(21, 128, 61, 0.1))',
                rose: 'radial-gradient(circle, rgba(244, 63, 94, 0.5), rgba(190, 18, 60, 0.1))',
              };
              return gradients[theme];
            })(),
            filter: 'blur(80px)',
          }}
        />

        {/* Glow blob - center */}
        <div 
          className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            background: (() => {
              const gradients = {
                purple: 'radial-gradient(circle, rgba(192, 132, 252, 0.6), rgba(139, 92, 246, 0.2))',
                emerald: 'radial-gradient(circle, rgba(20, 184, 166, 0.5), rgba(13, 148, 136, 0.15))',
                ocean: 'radial-gradient(circle, rgba(147, 197, 253, 0.5), rgba(59, 130, 246, 0.15))',
                sunset: 'radial-gradient(circle, rgba(254, 215, 170, 0.6), rgba(253, 186, 116, 0.2))',
                forest: 'radial-gradient(circle, rgba(134, 239, 172, 0.5), rgba(74, 222, 128, 0.15))',
                rose: 'radial-gradient(circle, rgba(253, 164, 175, 0.5), rgba(251, 113, 133, 0.15))',
              };
              return gradients[theme];
            })(),
            filter: 'blur(80px)',
          }}
        />

        {/* Glow blob - bottom right */}
        <div 
          className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-25"
          style={{
            background: (() => {
              const gradients = {
                purple: 'radial-gradient(circle, rgba(34, 211, 238, 0.5), rgba(8, 145, 178, 0.15))',
                emerald: 'radial-gradient(circle, rgba(45, 212, 191, 0.5), rgba(20, 184, 166, 0.15))',
                ocean: 'radial-gradient(circle, rgba(125, 211, 252, 0.5), rgba(56, 189, 248, 0.15))',
                sunset: 'radial-gradient(circle, rgba(254, 243, 199, 0.5), rgba(252, 211, 77, 0.15))',
                forest: 'radial-gradient(circle, rgba(167, 243, 208, 0.5), rgba(110, 231, 183, 0.15))',
                rose: 'radial-gradient(circle, rgba(254, 205, 211, 0.5), rgba(252, 165, 165, 0.15))',
              };
              return gradients[theme];
            })(),
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* 1. HEADER 
        - Height: h-20 (80px)
        - Z-Index: 50 (On top of everything)
        - Background: Solid (Not transparent)
      */}
      <header className={`fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-6 border-b ${t.border} ${t.bg} backdrop-blur-xl bg-opacity-90 transition-all duration-500`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-2xl font-bold tracking-tight ${t.accent} flex items-center gap-2`}
        >
          <Sparkles className="w-6 h-6" />
          Samay Dubey
        </motion.div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {['about', 'projects', 'contact'].map((id, idx) => (
              <motion.a 
                key={id} 
                href={`#${id}`} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:opacity-70 transition-all capitalize relative group"
              >
                {id}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${t.surface} group-hover:w-full transition-all duration-300`} />
              </motion.a>
            ))}
          </nav>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const themeOrder: ThemeKey[] = ['purple', 'emerald', 'ocean', 'sunset', 'forest', 'rose'];
              const currentIndex = themeOrder.indexOf(theme);
              const nextIndex = (currentIndex + 1) % themeOrder.length;
              setTheme(themeOrder[nextIndex]);
            }}
            className={`p-2 rounded-xl border ${t.border} ${t.surface} shadow-lg hover:shadow-2xl transition-all duration-300`}
          >
            <Palette size={18} className={t.accent} />
          </motion.button>
        </div>
      </header>

      {/* 2. VIDEO BACKGROUND LAYER
        - Position: Fixed
        - Top: top-20 (80px) -> STARTS EXACTLY BELOW HEADER
        - Height: calc(100vh - 80px) -> FILLS REMAINING SCREEN
        - Z-Index: 5 (Above grid, below content)
      */}
      <div 
        ref={videoContainerRef}
        className="fixed left-0 right-0 top-20 z-5 pointer-events-none overflow-hidden bg-black"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <img
          ref={frameImageRef}
          src={frames[currentFrame]}
          alt="Frame animation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 3. SCROLLABLE CONTENT LAYER 
        - Z-Index: 10 (Slides OVER the video and grid)
        - Background: Transparent initially, then Solid
      */}
      <div className="relative z-10 w-full">
        
        {/* A. INVISIBLE SPACER (Triggers the fade) */}
        {/* We add padding-top-20 so the content flow starts below the fixed header */}
        <section ref={scrollTriggerRef} className="relative w-full h-[200vh]">
          
          {/* STICKY TEXT */}
          {/* Sticky top-20 ensures it sticks right under the header */}
          <div className="sticky top-20 flex items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
            <div className="max-w-4xl text-center px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
              >
                <span className="text-sm font-medium text-white">👋 CSE Student & Developer</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.8 }} 
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6 text-white drop-shadow-2xl relative"
              >
                {/* Black shadow text */}
                <span className="absolute -left-2 top-2 text-black opacity-80 pointer-events-none -z-10">
                  Building clean <br/>
                  web experiences
                </span>
                {/* White main text */}
                Building clean <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 animate-gradient">
                  web experiences
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-md max-w-2xl mx-auto"
              >
                Full-stack developer passionate about algorithms, competitive programming & building scalable applications
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center justify-center gap-4"
              >
                <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  View Projects
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                  Contact Me
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* B. MAIN CONTENT (Transparent - shows grid background) */}
        <main className="relative transition-colors duration-500 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
          <div className="max-w-6xl mx-auto px-6 py-20">
            
            <section id="about" className="py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${t.accent} flex items-center gap-3`}>
                  <Code2 className="w-10 h-10" />
                  About Me
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
                  <div className={`p-8 rounded-3xl ${t.surface} border ${t.border} backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl`}>
                    <h3 className={`text-2xl font-bold mb-4 ${t.accent}`}>Who I Am</h3>
                    <p className="text-lg leading-relaxed opacity-90">
                      Computer Science student at IIIT Nagpur with a strong passion for competitive programming. Active on Codeforces (Max: 1507) and LeetCode (Max: 1721) with 600+ problems solved.
                    </p>
                  </div>
                  <div className={`p-8 rounded-3xl ${t.surface} border ${t.border} backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl`}>
                    <h3 className={`text-2xl font-bold mb-4 ${t.accent}`}>What I Do</h3>
                    <p className="text-lg leading-relaxed opacity-90">
                      Full-stack development with focus on backend systems. I build scalable web applications using Node.js, Express, and modern databases while maintaining clean code and strong algorithmic foundations.
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 flex flex-wrap gap-4 justify-center">
                  {['C++', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'REST APIs', 'Git'].map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className={`px-6 py-3 rounded-full ${t.muted} border ${t.border} font-medium backdrop-blur-sm shadow-lg cursor-default`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </section>

            <section id="projects" className="py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={`text-4xl md:text-5xl font-bold mb-10 ${t.accent}`}>Featured Projects</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      id: 1,
                      title: 'FindMate',
                      description: 'Roommate matchmaking platform with advanced filters for lifestyle, habits, and preferences. Built with Node.js, Express, MySQL & JWT authentication.',
                      link: 'https://github.com/sSamay4927/FindMate'
                    },
                    {
                      id: 2,
                      title: 'TrueWealth',
                      description: 'Fitness-focused website generating personalized diet plans based on BMI with exercise recommendations and diet shop.',
                      link: 'https://github.com/sSamay4927/TrueWealth'
                    }
                  ].map((project) => (
                    <motion.a
                      key={project.id} 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: project.id * 0.1, duration: 0.5 }}
                      whileHover={{ y: -10 }}
                      className={`group relative min-h-80 rounded-3xl ${t.surface} border ${t.border} overflow-hidden transition-all duration-500 shadow-xl hover:shadow-2xl cursor-pointer block`}
                    >
                      {/* Gradient overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: (() => {
                            const gradients = {
                              purple: 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
                              emerald: 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))',
                              ocean: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(14, 165, 233, 0.2))',
                              sunset: 'linear-gradient(to bottom right, rgba(251, 146, 60, 0.2), rgba(239, 68, 68, 0.2))',
                              forest: 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.2))',
                              rose: 'linear-gradient(to bottom right, rgba(244, 63, 94, 0.2), rgba(225, 29, 72, 0.2))',
                            };
                            return gradients[theme];
                          })(),
                        }}
                      />
                      
                      {/* Content */}
                      <div className="relative h-full flex flex-col items-start justify-center p-8">
                        <div className={`w-16 h-16 rounded-2xl ${t.muted} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Code2 className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-2xl mb-3">{project.title}</h3>
                        <p className="text-sm opacity-75 mb-6 text-left">{project.description}</p>
                        
                        <motion.div 
                          className={`flex items-center gap-2 ${t.accent} font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          whileHover={{ x: 5 }}
                        >
                          View on GitHub <ExternalLink className="w-4 h-4" />
                        </motion.div>
                      </div>
                      
                      {/* Animated border */}
                      <div 
                        className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-50 transition-all duration-500"
                        style={{
                          borderColor: (() => {
                            const colors = {
                              purple: '#a855f7',
                              emerald: '#10b981',
                              ocean: '#3b82f6',
                              sunset: '#fb923c',
                              forest: '#22c55e',
                              rose: '#f43f5e',
                            };
                            return colors[theme];
                          })(),
                        }}
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </section>
            
            <section id="contact" className="py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${t.accent}`}>Get in touch</h2>
                <p className="text-xl opacity-75 mb-12 max-w-2xl">Have a project in mind? Let's create something amazing together.</p>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
                  {/* Contact form */}
                  <div className={`p-8 rounded-3xl border ${t.border} ${t.surface} backdrop-blur-sm shadow-xl transition-all duration-500`}>
                    <form className="space-y-6">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          className={`w-full px-6 py-4 rounded-2xl ${t.bg} border ${t.border} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${t.text}`}
                          style={{
                            '--tw-ring-color': (() => {
                              const colors = {
                                purple: '#a855f7',
                                emerald: '#10b981',
                                ocean: '#3b82f6',
                                sunset: '#fb923c',
                                forest: '#22c55e',
                                rose: '#f43f5e',
                              };
                              return colors[theme];
                            })(),
                          } as React.CSSProperties}
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          className={`w-full px-6 py-4 rounded-2xl ${t.bg} border ${t.border} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${t.text}`}
                          style={{
                            '--tw-ring-color': (() => {
                              const colors = {
                                purple: '#a855f7',
                                emerald: '#10b981',
                                ocean: '#3b82f6',
                                sunset: '#fb923c',
                                forest: '#22c55e',
                                rose: '#f43f5e',
                              };
                              return colors[theme];
                            })(),
                          } as React.CSSProperties}
                        />
                      </div>
                      <div>
                        <textarea 
                          placeholder="Your Message" 
                          rows={5}
                          className={`w-full px-6 py-4 rounded-2xl ${t.bg} border ${t.border} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 resize-none ${t.text}`}
                          style={{
                            '--tw-ring-color': (() => {
                              const colors = {
                                purple: '#a855f7',
                                emerald: '#10b981',
                                ocean: '#3b82f6',
                                sunset: '#fb923c',
                                forest: '#22c55e',
                                rose: '#f43f5e',
                              };
                              return colors[theme];
                            })(),
                          } as React.CSSProperties}
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
                        style={{
                          background: (() => {
                            const gradients = {
                              purple: 'linear-gradient(to right, #a855f7, #ec4899)',
                              emerald: 'linear-gradient(to right, #10b981, #14b8a6)',
                              ocean: 'linear-gradient(to right, #3b82f6, #0ea5e9)',
                              sunset: 'linear-gradient(to right, #fb923c, #ef4444)',
                              forest: 'linear-gradient(to right, #22c55e, #16a34a)',
                              rose: 'linear-gradient(to right, #f43f5e, #e11d48)',
                            };
                            return gradients[theme];
                          })(),
                        }}
                      >
                        Send Message
                      </motion.button>
                    </form>
                  </div>
                  
                  {/* Contact info */}
                  <div className="space-y-6">
                    <motion.a
                      href="mailto:bt23cse210@iiitn.ac.in"
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`flex items-center gap-6 p-6 rounded-3xl ${t.surface} border ${t.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                    >
                      <div className={`w-14 h-14 rounded-2xl ${t.muted} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Mail className={`w-7 h-7 ${t.accent}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Email</h3>
                        <p className="opacity-75 text-sm">bt23cse210@iiitn.ac.in</p>
                      </div>
                    </motion.a>
                    
                    <motion.a
                      href="https://github.com/sSamay4927"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`flex items-center gap-6 p-6 rounded-3xl ${t.surface} border ${t.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                    >
                      <div className={`w-14 h-14 rounded-2xl ${t.muted} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Github className={`w-7 h-7 ${t.accent}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">GitHub</h3>
                        <p className="opacity-75">@sSamay4927</p>
                      </div>
                    </motion.a>
                    
                    <motion.a
                      href="https://www.linkedin.com/in/samay-dubey-356376352/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`flex items-center gap-6 p-6 rounded-3xl ${t.surface} border ${t.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                    >
                      <div className={`w-14 h-14 rounded-2xl ${t.muted} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Linkedin className={`w-7 h-7 ${t.accent}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">LinkedIn</h3>
                        <p className="opacity-75 text-sm">Samay Dubey</p>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </section>

          </div>
          
          <footer className={`py-16 border-t ${t.border}`}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className={`text-2xl font-bold ${t.accent} flex items-center gap-2`}>
                  <Sparkles className="w-6 h-6" />
                  Samay Dubey
                </div>
                
                <div className="flex items-center gap-6">
                  {[
                    { Icon: Github, href: 'https://github.com/sSamay4927' },
                    { Icon: Linkedin, href: 'https://www.linkedin.com/in/samay-dubey-356376352/' },
                    { Icon: Mail, href: 'mailto:bt23cse210@iiitn.ac.in' }
                  ].map(({ Icon, href }, idx) => (
                    <motion.a
                      key={idx}
                      href={href}
                      target={href.startsWith('mailto') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-full ${t.surface} border ${t.border} flex items-center justify-center hover:shadow-lg transition-all duration-300`}
                    >
                      <Icon className={`w-5 h-5 ${t.accent}`} />
                    </motion.a>
                  ))}
                </div>
                
                <div className="text-sm opacity-60">
                  © {new Date().getFullYear()} Samay Dubey. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

    </div>
  );
}