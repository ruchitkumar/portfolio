"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Database, Medal, MapPin, Briefcase, GraduationCap, Mail, X } from 'lucide-react';
import Link from 'next/link';

// --- DATA ---
const DATA = {
  name: "Sai Ruchit Kumar",
  role: "Data Analyst",
  email: "ruchitpotnuru@gmail.com",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  projects: [
    {
      id: 1,
      title: "Credit Card Approval AI",
      category: "FinTech Analysis",
      desc: "Predicting credit risk using Logistic Regression & Decision Trees.",
      fullDesc: "Built a predictive machine learning model to analyze applicant financial and demographic data. The goal was to assist financial institutions in assessing credit risk with higher precision.",
      impact: "Identified key risk factors to enhance loan approval efficiency.",
      stack: ["R Language", "Logistic Regression", "Decision Trees"],
      color: "#F3F4F6", 
      // ✅ RESTORED: The Financial Graph Image you liked
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Red Wine Quality",
      category: "Product Analytics",
      desc: "Optimized quality control by 15% using Random Forest algorithms.",
      fullDesc: "Engineered a classification model to grade wine quality based on complex physicochemical properties like acidity and density. I utilized both Supervised and Unsupervised learning techniques.",
      impact: "Achieved a 15% increase in prediction accuracy by optimizing Random Forest and SVM algorithms.",
      stack: ["Python", "Scikit-Learn", "SVM", "Random Forest"],
      color: "#E5E7EB", 
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Stamp Detection CNN",
      category: "Computer Vision",
      desc: "Automated archival sorting using Deep Learning.",
      fullDesc: "Designed a computer vision solution to automate the recognition of postal stamps. This system replaces manual sorting, streamlining archival processes for high-volume logistics.",
      impact: "Implemented Convolutional Neural Networks (CNN) to achieve high-accuracy image classification.",
      stack: ["Python", "Deep Learning", "CNN", "TensorFlow"],
      color: "#D1D5DB", 
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Chat Application",
      category: "Full Stack Eng.",
      desc: "Real-time secure messaging platform with user authentication.",
      fullDesc: "Developed a responsive, real-time chat application. Focused on seamless communication flows, low latency, and robust user authentication mechanisms.",
      impact: "Delivered a secure messaging environment with persistent message history and real-time updates.",
      stack: ["Django", "Python", "WebSockets", "HTML/CSS"],
      color: "#9CA3AF", 
      // ✅ NEW IMAGE: Clean Messaging / Chat Concept
      image: "https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?q=80&w=2670&auto=format&fit=crop"
    }
  ],
  skills: ["Python", "SQL", "Power BI", "R Language", "Tableau", "Machine Learning", "Excel"]
};

// --- COMPONENTS ---

// 1. DETAIL MODAL
const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-x-0 bottom-0 z-[200] h-[85vh] bg-white rounded-t-[2rem] shadow-2xl flex flex-col overflow-hidden border-t border-gray-200"
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
        <div>
           <span className="text-xs font-mono text-blue-600 uppercase tracking-widest">{project.category}</span>
           <h2 className="text-2xl font-bold text-black mt-1 leading-tight">{project.title}</h2>
        </div>
        <button onClick={onClose} className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
        <div className="max-w-4xl mx-auto space-y-8">
           <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
           </div>
           
           <div className="grid md:grid-cols-2 gap-8">
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
             <div>
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">The Challenge</h4>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{project.fullDesc}</p>
                
                <h4 className="text-xs font-mono text-green-600 uppercase tracking-widest mb-4">The Impact</h4>
                <div className="border-l-4 border-green-500 pl-6 py-1">
                  <p className="text-lg text-black font-medium italic">"{project.impact}"</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

// 2. STICKY CARD (The Stacking Animation)
const Card = ({ i, title, desc, image, color, progress, range, targetScale, category, onClick, project }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]); // Parallax image inside card
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(10vh + ${i * 25}px)` }} 
        className="flex flex-col relative -top-[10%] h-[500px] w-[90vw] md:w-[1000px] rounded-[30px] p-0 origin-top overflow-hidden shadow-2xl bg-white border border-gray-200"
      >
        <div className="flex h-full flex-col md:flex-row">
          
          {/* Text Section */}
          <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-between h-1/2 md:h-full bg-white z-10">
            <div>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono uppercase text-gray-500 mb-4 inline-block">{category}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">{title}</h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">{desc}</p>
            </div>
            
            <div 
              onClick={() => onClick(project)}
              className="flex items-center gap-2 text-black font-bold cursor-pointer hover:underline group mt-4 md:mt-0"
            >
              See Case Study <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18}/>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative w-full md:w-[55%] h-1/2 md:h-full overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <img 
                src={image} 
                alt="project" 
                className="object-cover w-full h-full" 
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          </div>
        
        </div>
      </motion.div>
    </div>
  );
};

// --- SECTIONS ---

const Hero = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center px-6 md:px-20 bg-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl pt-20"
      >
        <span className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-6 block">Portfolio 2025</span>
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-black mb-8 leading-[0.9]">
          Sai Ruchit<br/><span className="text-gray-300">Kumar.</span>
        </h1>
        <div className="flex flex-wrap gap-4">
           <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 flex items-center gap-2"><MapPin size={14}/> Jersey City, NJ</span>
           <span className="px-4 py-2 bg-green-50 rounded-full text-sm font-medium text-green-700 flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Available</span>
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-20 bg-white relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <div>
           <span className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4 block">( WHO I AM )</span>
           <h2 className="text-3xl md:text-5xl font-bold text-black mb-8 leading-tight">Bridging technical engineering and strategic vision.</h2>
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

// --- MAIN PAGE ---
export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

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

      {/* STICKY PROJECTS CONTAINER */}
      <div ref={container} className="relative mt-[10vh] mb-[10vh]">
        {DATA.projects.map((project, i) => {
          const targetScale = 1 - ( (DATA.projects.length - i) * 0.05 );
          return ( 
            <Card 
              key={i} 
              i={i} 
              {...project}
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              onClick={setSelectedProject}
            />
          );
        })}
      </div>

      <About />

      <div className="h-[60vh] bg-black text-white flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8">Ready to collaborate?</h2>
        <Link href="/contact" className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2">
           <Mail size={20}/> Start a Conversation
        </Link>
        <footer className="mt-20 text-xs font-mono text-gray-500"><span>SAI RUCHIT KUMAR © 2025</span></footer>
      </div>
    </div>
  );
}