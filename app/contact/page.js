"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin, Github, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [status, setStatus] = useState(null); // null | "submitting" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // 1. Capture the form data
    const formData = new FormData(e.target);

    try {
      // 2. Send to YOUR Formspree ID (xkgdbbzo)
      const response = await fetch("https://formspree.io/f/xkgdbbzo", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      // 3. Handle the result
      if (response.ok) {
        setStatus("success");
        e.target.reset(); // Clear the form
      } else {
        const data = await response.json();
        // If there's an error from Formspree, show it
        if (Object.hasOwn(data, 'errors')) {
          setErrorMessage(data.errors.map(error => error.message).join(", "));
        } else {
          setErrorMessage("Oops! There was a problem submitting your form.");
        }
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Network error. Please verify you are connected to the internet.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-black transition-colors uppercase">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24 md:py-20">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          
          {/* Info Section */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-black">Let's <br/>Connect.</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-md">
              I am open to full-time opportunities. Whether you have a question about my research or a job opening, I'd love to hear from you.
            </p>
            <div className="space-y-6">
              <a href="mailto:ruchitpotnuru@gmail.com" className="flex items-center gap-4 text-lg font-mono text-gray-600 hover:text-blue-600 transition-colors group">
                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors"><Mail size={20} /></div>
                ruchitpotnuru@gmail.com
              </a>
              <a href="https://linkedin.com" target="_blank" className="flex items-center gap-4 text-lg font-mono text-gray-600 hover:text-blue-600 transition-colors group">
                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors"><Linkedin size={20} /></div>
                LinkedIn Profile
              </a>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-gray-50 border border-gray-100 p-8 md:p-12 rounded-3xl relative">
            
            {status === "success" ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-3xl">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"><CheckCircle size={32} /></div>
                 <h3 className="text-2xl font-bold text-black mb-2">Message Sent!</h3>
                 <p className="text-gray-500">I have received your message and will reply to <strong>ruchitpotnuru@gmail.com</strong> shortly.</p>
                 <button onClick={() => setStatus(null)} className="mt-6 text-sm text-blue-600 hover:text-blue-500">Send another</button>
               </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Name</label>
                <input type="text" name="name" required placeholder="Recruiter Name" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Email</label>
                <input type="email" name="email" required placeholder="email@company.com" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Message</label>
                <textarea rows="4" name="message" required placeholder="Hi Sai..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors resize-none"></textarea>
              </div>
              
              {/* Error Message Bar */}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                  <AlertCircle size={16} /> {errorMessage}
                </div>
              )}

              <button type="submit" disabled={status === "submitting"} className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50">
                {status === "submitting" ? <><Loader2 className="animate-spin" size={16} /> Sending...</> : <>Send Message <Send size={16} /></>}
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}