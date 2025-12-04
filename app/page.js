"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Database, Medal, MapPin, Briefcase, GraduationCap, Mail, X } from 'lucide-react';
import Link from 'next/link';

// --- RICH DATA FROM RESUME ---
const DATA = {
  name: "Sai Ruchit Kumar Potnuru",
  role: "Data Scientist & Full Stack Developer",
  email: "ruchitpotnuru@gmail.com",
  socials: {
    linkedin: "https://linkedin.com/in/sai-ruchit-kumar",
    github: "https://github.com/ruchitkumar"
  },
  projects: [
    {
      id: "01",
      title: "Credit Card Approval AI",
      category: "FinTech & Machine Learning",
      desc: "Predicting credit risk using Logistic Regression & Decision Trees.",
      // EXPANDED INFO FOR MODAL
      fullDesc: "This project addresses the critical challenge of financial risk assessment. I analyzed a large-scale financial dataset to identify key variables that influence credit card approvals. The core of the work involved advanced data cleaning and feature engineering—specifically handling missing values and outliers to ensure the dataset was robust. I then trained Logistic Regression and Decision Tree models to predict approval likelihood with high precision, directly aiding institutional decision-making.",
      impact: "Identified key risk factors and improved approval prediction accuracy, reducing potential default rates for financial institutions.",
      stack: ["Python", "Logistic Regression", "Pandas", "Scikit-Learn", "Feature Engineering"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "02",
      title: "Stamp Detection System",
      category: "Computer Vision (CNN)",
      desc: "Automated archival sorting using Deep Learning.",
      fullDesc: "Manual sorting of postal stamps is time-consuming and error-prone. I designed a computer vision model using Convolutional Neural Networks (CNN) to automate this process. The system takes raw images of envelopes, detects the stamp region, and classifies it for archival purposes. This involved training deep learning models on image datasets to recognize complex patterns and textures specific to philately.",
      impact: "Streamlined archival processes for high-volume logistics by replacing manual sorting with automated high-accuracy image classification.",
      stack: ["Python", "Deep Learning", "CNN", "TensorFlow", "Keras"],
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: "03",
      title: "Secure Chat Application",
      category: "Full Stack Engineering",
      desc: "Real-time messaging platform with user authentication.",
      fullDesc: "I developed a responsive, real-time chat application to facilitate seamless communication. The project focused heavily on backend architecture using Django to ensure low latency and secure data handling. I implemented WebSockets for instant message delivery and built a robust user authentication system to ensure privacy and persistent message history storage.",
      impact: "Delivered a secure, low-latency messaging environment that enhances user interaction efficiency.",
      stack: ["Django", "Python", "WebSockets", "HTML/CSS", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
      url: "/chat-demo"
    },
    {
      id: "04",
      title: "Red Wine Quality Analysis",
      category: "Data Science",
      desc: "Optimized quality control by 15% using Random Forest.",
      fullDesc: "In this study, I engineered a classification model to grade wine quality based on complex physicochemical properties such as acidity, density, and pH levels. I experimented with various Supervised Learning algorithms, ultimately finding that Random Forest and SVM provided the best results. I also used libraries like Matplotlib and Seaborn to visualize data trends and present technical findings to stakeholders.",
      impact: "Achieved a 15% increase in prediction accuracy, enabling data-driven decisions in quality control operations.",
      stack: ["Python", "Random Forest", "SVM", "Matplotlib", "Seaborn"],
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop"
    }
  ],
  skills: [
    "Python", "SQL", "AWS (Amplify/S3)", "PostgreSQL", "Google Maps API", "Power BI", "Tableau", "Machine Learning", "Git"
  ]
};

// --- COMPONENTS ---

// 1. PROJECT MODAL (The Slide-Up Sheet)
const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-x-0 bottom-0 z-[200] h-[85vh] bg-white rounded-t-[2rem] md:rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden border-t border-gray-200"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100 bg-white">
        <div>
           <span className="text-xs font-mono text-blue-600 uppercase tracking-widest">{project.category}</span>
           <h2 className="text-2xl md:text-4xl font-bold text-black mt-2 tracking-tight leading-tight">{project.title}</h2>
        </div>
        <button onClick={onClose} className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-gray-50/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
          
          {/* Left: Image & Tech Stack */}
          <div className="space-y-8">
             <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 relative group">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
                {project.url && (
                  <div className="mt-8">
                    <Link href={project.url} className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl">
                      View Live Demo <ArrowUpRight size={18} />
                    </Link>
                  </div>
                )}
             </div>
          </div>

          {/* Right: Detailed Description */}
          <div className="space-y-10">
             <div>
               <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">The Context & Solution</h4>
               <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                 {project.fullDesc}
               </p>
             </div>
             
             <div>
               <h4 className="text-xs font-mono text-green-600 uppercase tracking-widest mb-4">The Impact</h4>
               <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                 <p className="text-xl text-black font-medium italic">"{project.impact}"</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

// 2. HERO SECTION
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
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-black mb-8 leading-[1.1]">
          Sai Ruchit<br/><span className="text-gray-400">Kumar Potnuru.</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-8 md:items-end">
          <p className="text-lg md:text-2xl text-gray-600 max-w-xl leading-relaxed">
            Data Scientist & Full Stack Developer. I build data-driven applications and visualize insights using Python, SQL, and AWS.
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

// 3. STICKY PROJECT CARD
const Card = ({ i, title, desc, image, progress, range, targetScale, category, onClick, project }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]); 
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(10vh + ${i * 25}px)` }} 
        className="flex flex-col relative -top-[10%] h-[500px] w-[90vw] md:w-[1000px] rounded-[30px] p-0 origin-top overflow-hidden shadow-2xl bg-white border border-gray-200"
      >
        <div className="flex h-full flex-col md:flex-row">
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
              Read Full Case Study <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18}/>
            </div>
          </div>
          <div className="relative w-full md:w-[55%] h-1/2 md:h-full overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <img src={image} alt="project" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 4. ABOUT SECTION
const About = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-20 bg-white relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <div>
           <span className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-4 block">( WHO I AM )</span>
           <h2 className="text-3xl md:text-5xl font-bold text-black mb-8 leading-tight">Bridging technical engineering and strategic vision.</h2>
           <p className="text-lg text-gray-600 mb-12 leading-relaxed">
             I am a Master's graduate in Computer Science with a strong proficiency in Data Analysis and Full Stack Development. 
             I specialize in cleaning complex datasets, implementing analytics, and building microservices that drive organizational decision-making.
           </p>
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
              
              {/* NEW JOB */}
              <div className="border-l-2 border-blue-500 pl-6 pb-8 relative">
                 <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                 <h4 className="text-xl font-bold text-black">Full Stack Developer</h4>
                 <p className="text-blue-600 text-sm mb-2 font-medium">Saayam For All (Non-profit) • Sep 2025 - Present</p>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Building Python microservices and PostgreSQL schemas. 
                   Visualized volunteer locations by integrating the Google Maps API for leadership analytics.
                 </p>
              </div>

              {/* OLD JOB */}
              <div className="border-l-2 border-gray-200 pl-6 pb-2 relative">
                 <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                 <h4 className="text-xl font-bold text-black">Data Science Intern</h4>
                 <p className="text-gray-500 text-sm mb-2">Corizo.co • Jul 2022 - Jul 2023</p>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Developed predictive models using Random Forest & SVM, achieving a 15% increase in accuracy.
                 </p>
              </div>
           </div>

           <div>
              <h3 className="text-sm font-bold text-black uppercase mb-6 flex items-center gap-2"><GraduationCap size={16}/> Education</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-gray-200 pl-6">
                   <h4 className="text-xl font-bold text-black">M.S. Computer Science</h4>
                   <p className="text-gray-500 text-sm">NJIT • 3.5 GPA • 2023 - 2025</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-6">
                   <h4 className="text-xl font-bold text-black">B.Sc. Computer Science</h4>
                   <p className="text-gray-500 text-sm">VIT • 3.4 GPA • 2019 - 2023</p>
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