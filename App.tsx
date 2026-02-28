
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Briefcase,
  BarChart3,
  Settings,
  Mail,
  Linkedin,
  ChevronRight,
  Zap,
  Cpu,
  MousePointer2,
  Copy,
  CheckCircle2,
  Moon,
  Sun,
  ExternalLink
} from 'lucide-react';
import {
  PERSONAL_INFO,
  CONTACT,
  SKILLS,
  EXPERIENCES,
  HARISHBACK_STATS,
  PROJECTS
} from './constants';

// --- Components ---

const InteractivePointCloud: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 100;
    const connectionDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(w: number, h: number) {
        if (mouse.current.active) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const force = (150 - distance) / 150;
            const directionX = dx / distance;
            const directionY = dy / distance;
            this.x -= directionX * force * 5;
            this.y -= directionY * force * 5;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
        ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.5)' : 'rgba(79, 70, 229, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      // Fix for high DPI displays
      const dpr = window.devicePixelRatio || 1;
      // Logical width and height
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      // Actual pixel width and height
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      ctx.scale(dpr, dpr);

      particles = Array.from({ length: particleCount }, () => new Particle(window.innerWidth, window.innerHeight));
    };

    const animate = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((p, i) => {
        p.update(window.innerWidth, window.innerHeight);
        p.draw(ctx, isDark);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.strokeStyle = isDark
              ? `rgba(99, 102, 241, ${1 - dist / connectionDistance})`
              : `rgba(79, 70, 229, ${0.4 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    const handleResize = () => init();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50 dark:opacity-30"
    />
  );
};

const Navbar = ({ isDark, setIsDark }: { isDark: boolean, setIsDark: (v: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    // Cast to any to bypass TypeScript error for experimental View Transitions API
    const doc = document as any;
    if (!doc.startViewTransition) {
      setIsDark(!isDark);
      return;
    }
    doc.startViewTransition(() => {
      setIsDark(!isDark);
    });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`rounded-2xl border border-white/20 dark:border-slate-800/50 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 p-3 md:px-8 flex items-center justify-between transition-all ${scrolled ? 'shadow-lg shadow-indigo-500/5' : ''
          }`}>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform">
              H
            </div>
            <span className="font-bold text-slate-900 dark:text-white hidden sm:block">
              {PERSONAL_INFO.name}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
              <a href="#about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">About</a>
              <a href="#stats" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Impact</a>
              <a href="#projects" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-bold text-brand-600 dark:text-brand-400">Connect</a>
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HarishbackBoard = () => {
  return (
    <section id="stats" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-4">The Harishback '24</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Career highlights through <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-violet-500">proven statistics.</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {HARISHBACK_STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${stat.color} p-6 md:p-10 rounded-3xl text-white relative group overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform duration-500">
                <BarChart3 size={120} />
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold tracking-wider opacity-80 mb-2 uppercase">{stat.label}</p>
                <h4 className="text-4xl md:text-6xl font-black mb-1">{stat.value}</h4>
                <div className="flex items-center gap-1 mt-4 text-xs font-bold bg-black/10 w-fit px-3 py-1 rounded-full">
                  <CheckCircle2 size={12} /> VERIFIED ACHIEVEMENT
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-full"
    >
      <motion.div variants={item} className="md:col-span-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-8 flex flex-col justify-between border border-indigo-100 dark:border-indigo-800/30">
        <div className="bg-white dark:bg-slate-900 w-12 h-12 rounded-xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
          <Cpu size={24} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Amazon Media Expert</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Navigating complex DSP ecosystems and high-impact policy frameworks to ensure brand safety and maximum performance.</p>
        </div>
      </motion.div>
      <motion.div variants={item} className="bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl p-8 flex flex-col justify-between border border-emerald-100 dark:border-emerald-800/30">
        <div className="bg-white dark:bg-slate-900 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
          <Settings size={24} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Lean Six Sigma</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Green Belt certified precision in operations.</p>
        </div>
      </motion.div>
      <motion.div variants={item} className="bg-slate-900 rounded-3xl p-6 xl:p-8 flex flex-col justify-between text-white md:row-start-2 overflow-hidden">
        <div className="flex gap-2 mb-4">
          <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-slate-700" />
          <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-slate-800" />
          <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-slate-600" />
        </div>
        <div>
          <h4 className="text-lg lg:text-xl font-bold mb-2 hyphens-auto">Consultative Leader</h4>
          <p className="text-slate-400 text-xs lg:text-sm">Managed 22+ specialists at Amazon.</p>
        </div>
      </motion.div>
      <motion.div variants={item} className="md:col-span-2 bg-white dark:bg-slate-800/50 rounded-3xl p-8 flex items-center gap-8 border border-slate-200 dark:border-slate-700/50 md:row-start-2">
        <div className="hidden lg:block w-32 h-32 bg-slate-100 dark:bg-slate-700 rounded-2xl shrink-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
          <div className="p-4 space-y-2">
            <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded" />
            <div className="w-2/3 h-2 bg-slate-300 dark:bg-slate-600 rounded" />
            <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded" />
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Brand Strategy Partner</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Trusted by L'Oreal, Samsung, and Lenovo for multi-million dollar campaign architecture.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="px-4 py-1.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase rounded-full border border-brand-100 dark:border-brand-800/50">
          {project.category}
        </span>
        <div className="text-indigo-500">
          <Zap size={20} />
        </div>
      </div>
      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{project.title}</h4>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{project.description}</p>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Key Result</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-black text-brand-600 dark:text-brand-400">{project.metric}</span>
          <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-brand-500 selection:text-white`}>
      <InteractivePointCloud />
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="about" className="pt-40 pb-24 md:pt-56 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 rounded-full text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-8 border border-brand-100 dark:border-brand-800/30">
                  <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
                  Currently at {PERSONAL_INFO.company}
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter">
                  Architecting <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-violet-600 animate-gradient">
                    Ad Success.
                  </span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-12">
                  {PERSONAL_INFO.summary}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    Start Strategy <ChevronRight size={18} />
                  </a>
                  <a
                    href="#stats"
                    className="px-10 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold hover:border-brand-600 dark:hover:border-brand-400 transition-all hover:scale-105 active:scale-95"
                  >
                    View Metrics
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5 h-[400px] md:h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="h-full w-full"
              >
                <BentoGrid />
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Stats Section */}
        <HarishbackBoard />

        {/* Experience & Skills Split */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-12 flex items-center gap-4">
                Precision Stack
              </h3>
              <div className="space-y-12">
                {SKILLS.map((group, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">{group.category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {group.items.map((skill, sIdx) => (
                        <motion.div
                          key={sIdx}
                          whileHover={{ scale: 1.05 }}
                          className="px-5 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2 group cursor-default"
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                          {skill.name}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-12">Journey</h3>
              <div className="space-y-8 relative">
                <div className="absolute left-0 top-0 w-px h-full bg-slate-200 dark:bg-slate-800" />
                {EXPERIENCES.map((exp, idx) => (
                  <div key={exp.id} className="pl-10 relative">
                    <div className="absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full bg-brand-600 border-4 border-slate-50 dark:border-slate-900" />
                    <p className="text-xs font-bold text-brand-600 dark:text-brand-400 mb-2">{exp.period}</p>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{exp.role}</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">{exp.company}</p>
                    <ul className="space-y-3">
                      {exp.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex gap-3">
                          <span className="text-brand-500 shrink-0 mt-1.5"><ChevronRight size={14} /></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h3 className="text-sm font-bold tracking-widest text-brand-600 dark:text-brand-400 uppercase mb-4">Strategic Outputs</h3>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">Recent Direct Impact</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">Specific case studies reflecting operational transformation and brand growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROJECTS.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-12 md:p-20 rounded-[40px] bg-slate-900 overflow-hidden text-center border border-white/10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-600/20 via-transparent to-violet-600/10" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to grow your brand ecosystem?</h2>
                <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
                  Currently open to leadership opportunities in Ad Strategy and Global Operations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={copyEmail}
                    className="w-full sm:w-auto px-8 py-5 bg-white text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 group"
                  >
                    {copied ? <CheckCircle2 className="text-emerald-500" /> : <Mail size={20} />}
                    {copied ? 'Email Copied!' : 'Copy Email Address'}
                  </button>
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-5 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-700 transition-all hover:scale-105 active:scale-95"
                  >
                    <Linkedin size={20} /> LinkedIn Profile <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 dark:bg-slate-100 rounded flex items-center justify-center text-white dark:text-slate-900 font-black">H</div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-white leading-tight">{PERSONAL_INFO.name}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">Growth Architect</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Campaign & Growth Portfolio.</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] font-medium italic">
                Built with precision by <a href="https://www.linkedin.com/in/harshanp/" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">Harshan P</a>
                <span className="mx-1 opacity-30">|</span>
                <a href="mailto:harish.san080@gmail.com" className="hover:underline">harish.san080@gmail.com</a>
              </p>
            </div>

            <div className="flex gap-6 text-slate-400 dark:text-slate-500 text-sm">
              <a href="#about" className="hover:text-brand-600 transition-colors">About</a>
              <a href="#projects" className="hover:text-brand-600 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-brand-600 transition-colors font-bold text-brand-600">Hire</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
