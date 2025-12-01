"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, Code, Database, BarChart3, Brain, Terminal, ChevronRight } from 'lucide-react';

// --- DATA SECTION: DATA ANALYST BRANDING ---
const personalInfo = {
  name: "Sai Ruchit Kumar",
  role: "Data Analyst",
  location: "Jersey City, NJ",
  email: "ruchitkumarpotnuru70@gmail.com",
  bio: "I am a Data Analyst and Computer Science graduate specializing in Python, R, and Power BI. I bridge the gap between technical data engineering and strategic business decision-making. With a background in predictive modeling and a Master’s from NJIT, I turn raw complex datasets into clear, actionable insights.",
  socials: {
    linkedin: "https://linkedin.com/in/yourprofile", // Update this
    github: "https://github.com/yourusername"       // Update this
  }
};

const skills = [
  { 
    category: "Data Analysis & ML", 
    items: ["Python (Pandas, NumPy)", "R", "SQL", "Power BI", "Excel", "Tableau", "Scikit-learn"] 
  },
  { 
    category: "Development", 
    items: ["Java", "HTML/CSS", "JavaScript", "Django", "Git", "VS Code"] 
  },
  { 
    category: "Core Competencies", 
    items: ["Statistical Modeling", "Data Mining", "Predictive Analytics", "Database Design", "A/B Testing"] 
  }
];

const projects = [
  {
    title: "Credit Card Approval Analysis",
    desc: "A predictive model built to assess credit risk. I analyzed applicant financial demographics using R to predict approval likelihood, aiding financial institutions in risk management.",
    tags: ["R", "Logistic Regression", "Decision Trees", "FinTech"],
    icon: <BarChart3 size={24} />
  },
  {
    title: "Red Wine Quality Detection",
    desc: "Engineered a classification model to grade wine quality based on physicochemical properties (acidity, density). Achieved a 15% accuracy increase via Random Forest & SVM optimization.",
    tags: ["Python", "Machine Learning", "Data Science"],
    icon: <Database size={24} />
  },
  {
    title: "Stamp Detection (CNN)",
    desc: "Built a Computer Vision solution using Convolutional Neural Networks (CNN) to automate image classification and sorting processes for postal archives.",
    tags: ["Deep Learning", "Python", "Computer Vision"],
    icon: <Brain size={24} />
  },
  {
    title: "Secure Chat Application",
    desc: "While primarily a data analyst, I possess full-stack skills, demonstrated by this real-time Django messaging platform with user authentication.",
    tags: ["Django", "Python", "Web Sockets"],
    icon: <Terminal size={24} />
  }
];

const experience = [
  {
    company: "Corizo.co",
    role: "Data Science Intern",
    period: "Jul 2022 – Jul 2023",
    location: "Newark, NJ",
    description: "Spearheaded machine learning initiatives using Supervised and Unsupervised learning. Engineered predictive models to uncover patterns in complex datasets. Boosted model accuracy by 15% through hyperparameter tuning of Decision Trees and SVMs."
  }
];

// --- REUSABLE COMPONENTS ---

const Section = ({ children, title, id, className = "" }) => (
  <section id={id} className={`py-20 px-6 max-w-5xl mx-auto ${className}`}>
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-12"
    >
      <div className="h-1 w-12 bg-sky-500 rounded-full"></div>
      <h2 className="text-3xl font-bold text-slate-100">{title}</h2>
    </motion.div>
    {children}
  </section>
);

const Card = ({ title, desc, tags, icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-sky-500/50 transition-all shadow-lg hover:shadow-sky-500/10 group"
  >
    <div className="mb-4 text-sky-400 group-hover:text-sky-300 transition-colors bg-slate-800 w-12 h-12 flex items-center justify-center rounded-lg">{icon}</div>
    <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
    <p className="text-slate-400 mb-6 text-sm leading-relaxed">{desc}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag) => (
        <span key={tag} className="text-xs font-mono bg-sky-950 text-sky-200 px-2 py-1 rounded border border-sky-900/50">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

// --- MAIN PAGE COMPONENT ---

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* NAVIGATION (Simple) */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-sm z-50 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl text-slate-100">SRK<span className="text-sky-500">.</span></span>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-sky-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-sky-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-sky-300 bg-sky-950/50 border border-sky-900 rounded-full">
            Available for Role: Data Analyst / Data Scientist
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6 tracking-tight">
            I turn raw data <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
              into impact.
            </span>
          </h1>
          <p className="max-w-xl text-lg mb-10 text-slate-400 leading-relaxed">
            {personalInfo.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:ruchitkumarpotnuru70@gmail.com" className="bg-sky-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-sky-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20">
              <Mail size={20} /> Contact Me
            </a>
            <a href="/resume.pdf" className="bg-slate-900 text-slate-200 border border-slate-700 px-8 py-4 rounded-lg font-bold hover:border-sky-500 hover:text-sky-400 transition-all flex items-center justify-center gap-2">
              <FileText size={20} /> Download Resume
            </a>
          </div>
        </motion.div>
      </header>

      {/* SKILLS SECTION */}
      <Section title="Technical Proficiency" id="skills" className="bg-slate-900/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup, idx) => (
            <motion.div 
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-950 p-6 rounded-xl border border-slate-800"
            >
              <h3 className="text-lg font-bold text-sky-400 mb-4 flex items-center gap-2">
                {idx === 0 && <BarChart3 size={18}/>}
                {idx === 1 && <Code size={18}/>}
                {idx === 2 && <Brain size={18}/>}
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-slate-400">
                    <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE SECTION */}
      <Section title="Experience" id="about">
        <div className="space-y-12 border-l-2 border-slate-800 ml-3 md:ml-6 pl-8 md:pl-12 py-2">
          {experience.map((exp, idx) => (
            <div key={idx} className="relative">
              <span className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-sky-500 border-4 border-slate-950 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></span>
              <h3 className="text-2xl font-bold text-slate-100">{exp.role}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm font-mono text-sky-400 mb-4">
                <span>{exp.company}</span>
                <span className="hidden sm:inline">•</span>
                <span>{exp.period}</span>
                <span className="hidden sm:inline">•</span>
                <span>{exp.location}</span>
              </div>
              <p className="text-slate-400 max-w-3xl leading-relaxed">{exp.description}</p>
            </div>
          ))}
          
          {/* Education Block */}
          <div className="relative mt-16">
             <span className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-slate-700 border-4 border-slate-950"></span>
             <h3 className="text-2xl font-bold text-slate-100">Master's in Computer Science</h3>
             <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm font-mono text-slate-500 mb-4">
                <span>NJIT - Ying Wu College of Computing</span>
                <span className="hidden sm:inline">•</span>
                <span>GPA: 3.5/4.0</span>
                <span className="hidden sm:inline">•</span>
                <span>2023 - 2025</span>
              </div>
          </div>
          <div className="relative mt-8">
             <span className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-slate-700 border-4 border-slate-950"></span>
             <h3 className="text-2xl font-bold text-slate-100">Bachelor's in Computer Science</h3>
             <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm font-mono text-slate-500 mb-4">
                <span>Vellore Institute of Technology</span>
                <span className="hidden sm:inline">•</span>
                <span>CGPA: 8.0/10</span>
                <span className="hidden sm:inline">•</span>
                <span>2019 - 2023</span>
              </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS SECTION */}
      <Section title="Selected Projects" id="projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, index) => (
            <Card key={index} {...proj} />
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950 mt-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          <div className="flex gap-8 mb-8">
            <a href={personalInfo.socials.github} className="text-slate-500 hover:text-sky-400 transition-transform hover:-translate-y-1"><Github size={24} /></a>
            <a href={personalInfo.socials.linkedin} className="text-slate-500 hover:text-sky-400 transition-transform hover:-translate-y-1"><Linkedin size={24} /></a>
            <a href={`mailto:${personalInfo.email}`} className="text-slate-500 hover:text-sky-400 transition-transform hover:-translate-y-1"><Mail size={24} /></a>
          </div>
          <p className="text-slate-600 text-sm">
            Designed & Built by <span className="text-slate-400">{personalInfo.name}</span> using Next.js & Tailwind.
          </p>
        </div>
      </footer>
      
    </div>
  );
}