
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, 
  Mail, 
  Terminal, 
  Database, 
  Cloud, 
  Code, 
  Award, 
  GraduationCap, 
  ExternalLink,
  Youtube,
  Send,
  User,
  Cpu,
  History,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import ThreeScene from './components/ThreeScene';
import AIAssistant from './components/AIAssistant';
import { PERSONAL_INFO, EXPERIENCES, SKILL_GROUPS, CERTIFICATIONS } from './constants';

// Fixed PageWrapper props type to properly handle 'children' and avoid interference with the reserved 'key' prop.
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="w-full max-w-6xl mx-auto px-6 py-24 min-h-screen flex flex-col justify-center"
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Cpu },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Work', icon: History },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <ThreeScene page={currentPage} />

      {/* AI Assistant FAB and Chat */}
      <AIAssistant />

      {/* Modern Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white leading-none">R. Tripathi</span>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mt-1">SAP Developer</span>
            </div>
          </motion.div>
          
          <div className="hidden md:flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`relative px-6 py-2 text-sm font-medium transition-all rounded-full ${
                  currentPage === item.id ? 'text-white' : 'text-gray-400 hover:text-blue-300'
                }`}
              >
                {currentPage === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-blue-600 shadow-lg shadow-blue-500/40 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href={PERSONAL_INFO.linkedin} target="_blank" className="hidden sm:flex text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-current mb-1.5"></div>
              <div className="w-6 h-0.5 bg-current"></div>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <PageWrapper key="home">
              <div className="max-w-4xl">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 flex items-center gap-2 w-fit"
                >
                  <Sparkles size={12} className="animate-pulse" />
                  SYSTEM.INITIALIZE("SAP_EXCELLENCE")
                </motion.div>
                <h1 className="text-6xl md:text-9xl font-black text-white mb-6 leading-tight tracking-tighter">
                  Ravindra <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600">
                    Tripathi
                  </span>
                </h1>
                <p className="text-xl md:text-3xl text-gray-400 mb-10 font-light max-w-2xl leading-relaxed">
                  Crafting high-performance <span className="text-blue-300 font-medium">SAP S/4HANA</span> solutions and modular ABAP systems.
                </p>
                
                <div className="flex flex-wrap gap-6 items-center">
                  <button 
                    onClick={() => setCurrentPage('experience')}
                    className="group relative px-8 py-4 bg-white text-gray-950 rounded-full font-bold transition-all hover:pr-12"
                  >
                    View My Work
                    <ExternalLink className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="px-8 py-4 border border-white/20 hover:border-blue-500/50 hover:bg-blue-500/5 rounded-full font-bold transition-all"
                  >
                    Let's Talk
                  </button>
                </div>
              </div>
            </PageWrapper>
          )}

          {currentPage === 'about' && (
            <PageWrapper key="about">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-black text-white mb-4">The Developer</h2>
                    <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-xl text-gray-400 leading-relaxed font-light">
                    {PERSONAL_INFO.summary}
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                      <h4 className="text-blue-400 font-bold mb-1">Location</h4>
                      <p className="text-sm text-gray-500">{PERSONAL_INFO.location}</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                      <h4 className="text-blue-400 font-bold mb-1">Education</h4>
                      <p className="text-sm text-gray-500">Bachelor's Degree, Integral University</p>
                    </div>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-3xl backdrop-blur-md">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-blue-500" /> My Philosophy
                    </h4>
                    <p className="text-gray-400 text-sm italic">
                      "Clean code is not just a preference; in the SAP ecosystem, it is the bedrock of business continuity and scalability. I aim to turn complex requirements into elegant, high-performance logic."
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[3/4] bg-white/5 border border-white/10 rounded-[3rem] p-4 rotate-2 overflow-hidden shadow-2xl group transition-all hover:rotate-0">
                    <img src="https://picsum.photos/1200/1600?grayscale" alt="Ravindra" className="w-full h-full object-cover rounded-[2.5rem] opacity-50 grayscale contrast-125" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12">
                      <h3 className="text-2xl font-black text-white mb-2">Ravindra Kumar</h3>
                      <p className="text-blue-400 text-sm font-mono tracking-widest">@CODEABAP CREATOR</p>
                    </div>
                  </div>
                </div>
              </div>
            </PageWrapper>
          )}

          {currentPage === 'skills' && (
            <PageWrapper key="skills">
              <div className="mb-16">
                <h2 className="text-4xl font-black text-white mb-4 text-center">Tech Stack</h2>
                <p className="text-gray-400 text-center max-w-xl mx-auto">Mastering the bridge between traditional ABAP development and modern SAP S/4HANA cloud capabilities.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {SKILL_GROUPS.map((group, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl relative group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      {idx === 0 ? <Code size={80} /> : idx === 1 ? <Database size={80} /> : <Cloud size={80} />}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-8 relative z-10">{group.category}</h3>
                    <div className="flex flex-wrap gap-3 relative z-10">
                      {group.skills.map(skill => (
                        <span key={skill} className="px-4 py-2 bg-blue-500/5 border border-blue-500/10 text-xs font-mono text-blue-300 rounded-xl group-hover:border-blue-500/30 transition-all">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-20">
                <h3 className="text-xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
                  <Award className="text-blue-500" /> Recognitions
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div key={idx} className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-gray-400 hover:text-white hover:border-blue-500/20 transition-all flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <span className="text-sm font-medium">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </PageWrapper>
          )}

          {currentPage === 'experience' && (
            <PageWrapper key="experience">
              <div className="mb-20 text-center">
                <h2 className="text-4xl font-black text-white mb-4">Work History</h2>
                <div className="w-24 h-1 bg-blue-600 rounded-full mx-auto"></div>
              </div>
              <div className="space-y-12">
                {EXPERIENCES.map((exp, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col md:flex-row gap-8 p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/[0.07] transition-all"
                  >
                    <div className="md:w-1/3">
                      <span className="text-blue-500 font-mono text-sm mb-2 block">{exp.period}</span>
                      <h3 className="text-2xl font-black text-white mb-1">{exp.role}</h3>
                      <p className="text-lg text-blue-400 font-semibold mb-2">{exp.company}</p>
                      <div className="inline-block px-3 py-1 bg-gray-950 rounded-lg text-xs text-gray-500">
                        {exp.location}
                      </div>
                    </div>
                    <div className="md:w-2/3 border-l border-white/10 md:pl-10">
                      <ul className="space-y-4 text-gray-400 leading-relaxed">
                        {exp.description.map((point, i) => (
                          <li key={i} className="flex gap-4 items-start">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.8)]"></span>
                            <span className="text-sm md:text-base">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </PageWrapper>
          )}

          {currentPage === 'contact' && (
            <PageWrapper key="contact">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="space-y-12">
                  <div>
                    <h2 className="text-5xl font-black text-white mb-6">Let's connect.</h2>
                    <p className="text-xl text-gray-400 leading-relaxed">
                      Looking for an SAP expert or want to discuss a custom ABAP project? 
                      I'm currently open to new opportunities and collaborations.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-blue-600/10 transition-all group">
                      <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Mail />
                      </div>
                      <div>
                        <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-1">Email Me</h4>
                        <p className="text-white font-bold">{PERSONAL_INFO.email}</p>
                      </div>
                    </a>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-blue-600/10 transition-all group">
                      <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Linkedin />
                      </div>
                      <div>
                        <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-1">LinkedIn</h4>
                        <p className="text-white font-bold">Connect Professionally</p>
                      </div>
                    </a>
                    <a href="https://www.youtube.com/@CodeAbap" target="_blank" className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-red-600/10 transition-all group">
                      <div className="w-14 h-14 bg-red-600/20 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <Youtube />
                      </div>
                      <div>
                        <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-1">YouTube</h4>
                        <p className="text-white font-bold">@CodeAbap</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-2">Full Name</label>
                      <input type="text" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-2">Email Address</label>
                      <input type="email" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-2">Your Message</label>
                      <textarea rows={5} className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700 resize-none" placeholder="Tell me about your project..."></textarea>
                    </div>
                    <button className="group w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3">
                      SEND MESSAGE
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </div>
            </PageWrapper>
          )}
        </AnimatePresence>

        {/* Floating Page Indicator for Desktop */}
        <div className="fixed right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className="group relative flex items-center justify-end"
            >
              <span className={`absolute right-8 text-[10px] font-mono uppercase tracking-[0.2em] transition-all ${currentPage === item.id ? 'text-blue-400 opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:right-10 text-gray-500'}`}>
                {item.label}
              </span>
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${currentPage === item.id ? 'bg-blue-500 scale-150 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'bg-gray-800'}`}></div>
            </button>
          ))}
        </div>
      </main>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-gray-950/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 p-6"
          >
            <button 
              className="absolute top-8 right-8 text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-8 h-0.5 bg-current rotate-45 mb-[-2px]"></div>
              <div className="w-8 h-0.5 bg-current -rotate-45"></div>
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={`text-4xl font-black transition-all ${currentPage === item.id ? 'text-blue-500' : 'text-gray-500'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 py-12 border-t border-white/5 bg-gray-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs font-mono text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} SAP ARCHITECT // R. TRIPATHI
          </div>
          <div className="flex gap-8">
            <a href={PERSONAL_INFO.linkedin} className="text-gray-600 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-600 hover:text-white transition-colors"><Mail size={18} /></a>
            <a href="https://www.youtube.com/@CodeAbap" className="text-gray-600 hover:text-white transition-colors"><Youtube size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
