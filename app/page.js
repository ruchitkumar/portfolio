"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Database, Medal, MapPin, Briefcase, GraduationCap, Mail, X, Menu } from 'lucide-react';
import Link from 'next/link';

// --- DATA ---
const DATA = {
  name: "Sai Ruchit Kumar",
  role: "Data Analyst & Strategist",
  email: "ruchitpotnuru@gmail.com",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  projects: [
    {
      id: "01",
      title: "Credit Card Approval AI",
      category: "FinTech Analysis",
      desc: "Predicting credit risk using Logistic Regression & Decision Trees.",
      fullDesc: "Built a predictive machine learning model to analyze applicant financial and demographic data. The goal was to assist financial institutions in assessing credit risk with higher precision.",
      impact: "Identified key risk factors to enhance loan approval efficiency.",
      stack: ["R Language", "Logistic Regression", "Decision Trees"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "02",
      title: "Red Wine Quality",
      category: "Product Analytics",
      desc: "Optimized quality control by 15% using Random Forest algorithms.",
      fullDesc: "Engineered a classification model to grade wine quality based on complex physicochemical properties like acidity and density. I utilized both Supervised and Unsupervised learning techniques.",
      impact: "Achieved a 15% increase in prediction accuracy by optimizing Random Forest and SVM algorithms.",
      stack: ["Python", "Scikit-Learn", "SVM", "Random Forest"],
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "03",
      title: "Stamp Detection CNN",
      category: "Computer Vision",
      desc: "Automated archival sorting using Deep Learning.",
      fullDesc: "Designed a computer vision solution to automate the recognition of postal stamps. This system replaces manual sorting, streamlining archival processes for high-volume logistics.",
      impact: "Implemented Convolutional Neural Networks (CNN) to achieve high-accuracy image classification.",
      stack: ["Python", "Deep Learning", "CNN", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "04",
      title: "Chat Application",
      category: "Full Stack Eng.",
      desc: "Real-time secure messaging platform with user authentication.",
      fullDesc: "Developed a responsive, real-time chat application. Focused on seamless communication flows, low latency, and robust user authentication mechanisms.",
      impact: "Delivered a secure messaging environment with persistent message history and real-time updates.",
      stack: ["Django", "Python", "WebSockets", "HTML/CSS"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop"
    }
  ],
  skills: ["Python", "SQL", "Power BI", "R Language", "Tableau", "Machine Learning", "Excel"]
};

// --- COMPONENTS ---

const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-x-0 bottom-0 z-[200] h-[85vh] bg-white rounded-t-[2rem] md:rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden border-t border-gray-200"
    >
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100 bg-white">
        <div>
           <span className="text-xs font-mono text-blue-600 uppercase tracking-widest">{project.category}</span>
           <h2 className="text-2xl md:text-4xl font-bold text-black mt-2 tracking-tight leading-tight">{project.title}</h2>
        </div>
        <button onClick={onClose} className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-gray-50/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
          <div className="space-y-8">
             <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
             </div>
             <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
             </div>
          </div>
          <div className="space-y-10">
             <div>
               <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">The Challenge</h4>
               <p className="text-lg md:text-xl text-gray-700 leading-relaxed">{project.fullDesc}</p>
             </div>
             <div>
               <h4 className="text-xs font-mono text-green-600 uppercase tracking-widest mb-4">The Impact</h4>
               <div className="border-l-4 border-green-500 pl-6 py-1">
                 <p className="text-xl md:text-2xl text-black font-medium italic">"{project.impact}"</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center px-6 md:px-20 bg-white relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl"
      >
        <div className="flex items-center gap-3 mb-6">
           <div className="w-12 h-[1px] bg-black"></div>
           <span className="text-sm font-bold tracking-widest uppercase text-gray-500">Portfolio 2025</span>
        </div>
        <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-black mb-8 leading-[0.9]">
          Sai Ruchit<br/><span className="text-gray-300">Kumar.</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-8 md:items-end">
          <p className="text-lg md:text-2xl text-gray-600 max-w-xl leading-relaxed">
            Data Analyst & Strategist. I transform complex datasets into clear, actionable business intelligence.
          </p>
          <div className="flex flex-wrap gap-4">
             <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 flex items-center gap-2"><MapPin size={14}/> Jersey City, NJ</span>
             <span className="px-4 py-2 bg-green-50 rounded-full text-sm font-medium text-green-700 flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Available</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Gallery = ({ onProjectClick }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <section className="py-20 px-6 bg-[#F5F5F4]">
        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-8">( SELECTED WORKS )</h3>
        <div className="space-y-8">
          {DATA.projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => onProjectClick(project)}
              className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-lg"
            >
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                 <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-mono uppercase mb-2 inline-block">{project.category}</span>
                 <h3 className="text-2xl font-bold tracking-tight mb-2">{project.title}</h3>
                 <div className="flex items-center gap-1 text-xs text-gray-300">Tap for details <ArrowUpRight size={12}/></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#F5F5F4]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16 px-20">
          {DATA.projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => onProjectClick(project)}
              className="group relative h-[60vh] w-[60vw] flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
            >
              <div className="absolute inset-0">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-12 text-white">
                 <div className="flex justify-between items-end">
                    <div>
                       <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-mono uppercase mb-4 inline-block">{project.category}</span>
                       <h3 className="text-5xl font-bold tracking-tight mb-4">{project.title}</h3>
                       <p className="text-gray-300 max-w-lg text-lg line-clamp-2">{project.desc}</p>
                    </div>
                    <div className="h-14 w-14 bg-white text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><ArrowUpRight size={24}/></div>
                 </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div>
           <span className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4 block">( WHO I AM )</span>
           <h2 className="text-3xl md:text-6xl font-bold text-black mb-8 leading-tight">Bridging technical engineering and strategic vision.</h2>
           <p className="text-lg text-gray-600 mb-12 leading-relaxed">I am a Data Analyst with a Master's from NJIT. I don't just run numbers; I build systems that make data understandable, actionable, and profitable.</p>
           <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg"><Medal size={20}/></div>
                 <h3 className="font-bold text-lg text-gray-900">Leadership & Discipline</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">As a former <strong>Taekwondo Junior Team Coach</strong>, I mentored athletes for national competitions. This instilled a deep sense of discipline and the ability to lead diverse teams under pressure.</p>
           </div>
        </div>
        <div className="space-y-12">
           <div>
              <h3 className="text-sm font-bold text-black uppercase mb-6 flex items-center gap-2"><Briefcase size={16}/> Experience</h3>
              <div className="border-l-2 border-gray-200 pl-6 pb-2">
                 <h4 className="text-xl font-bold text-black">Data Science Intern</h4>
                 <p className="text-gray-500 text-sm mb-2">Corizo.co • 2022-2023</p>
                 <p className="text-gray-600">Spearheaded ML initiatives using Random Forest & SVM, boosting quality prediction accuracy by 15%.</p>
              </div>
           </div>
           <div>
              <h3 className="text-sm font-bold text-black uppercase mb-6 flex items-center gap-2"><GraduationCap size={16}/> Education</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-gray-200 pl-6">
                   <h4 className="text-xl font-bold text-black">M.S. Computer Science</h4>
                   <p className="text-gray-500 text-sm">NJIT • 3.5 GPA • 2025</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-6">
                   <h4 className="text-xl font-bold text-black">B.Tech Computer Science</h4>
                   <p className="text-gray-500 text-sm">VIT • 8.0 CGPA • 2023</p>
                </div>
              </div>
           </div>
           <div>
              <h3 className="text-sm font-bold text-black uppercase mb-6 flex items-center gap-2"><Database size={16}/> Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                 {DATA.skills.map(skill => <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm font-medium border border-gray-200">{skill}</span>)}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default function LightModePortfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <div className="bg-white text-black font-sans selection:bg-black selection:text-white">
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]" />
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          </>
        )}
      </AnimatePresence>
      <Hero />
      <Gallery onProjectClick={setSelectedProject} />
      <About />
      <div className="h-[50vh] bg-black text-white flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8">Ready to collaborate?</h2>
        <Link href="/contact" className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2">
           <Mail size={20}/> Start a Conversation
        </Link>
        <footer className="mt-20 text-xs font-mono text-gray-500"><span>SAI RUCHIT KUMAR © 2025</span></footer>
      </div>
    </div>
  );
}