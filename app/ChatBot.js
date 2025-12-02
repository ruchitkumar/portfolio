"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm Sai's AI Assistant. Ask me about his Skills, Projects, or Resume!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('skill') || lower.includes('stack')) return "Sai is an expert in Data Analysis using Python, SQL, Power BI, and R.";
    if (lower.includes('resume') || lower.includes('cv')) return "You can see Sai's experience in the 'About' section or contact him for the PDF!";
    if (lower.includes('contact') || lower.includes('email')) return "You can email Sai at ruchitpotnuru@gmail.com.";
    if (lower.includes('project')) return "Sai has great projects in FinTech and Product Analytics. Scroll up to the Gallery to click them!";
    if (lower.includes('hello') || lower.includes('hi')) return "Hello! How can I help you today?";
    return "That's a good question! You should email Sai directly at ruchitpotnuru@gmail.com to ask.";
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-black text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans"
          >
            {/* Light Header */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-sm text-black">Sai's Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-gray-200 rounded-full p-1 text-black">
                <X size={18} />
              </button>
            </div>

            {/* Light Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'bot' && <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1"><Bot size={14} className="text-white"/></div>}
                  <div className={`max-w-[80%] p-3 text-sm rounded-xl shadow-sm border ${msg.role === 'user' ? 'bg-black text-white rounded-br-none border-black' : 'bg-gray-100 text-gray-800 rounded-bl-none border-gray-100'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1"><Bot size={14} className="text-white"/></div>
                  <div className="bg-gray-100 p-3 rounded-xl rounded-bl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Light Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills..."
                className="flex-1 bg-white text-black text-sm px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button type="submit" className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}