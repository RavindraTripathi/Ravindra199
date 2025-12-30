
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MessageSquare, X, Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_GROUPS, CERTIFICATIONS } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: `Hi! I'm Ravindra's AI Assistant. I can tell you about his SAP expertise, work history at HCLTech and Merkle, or his YouTube channel @CodeAbap. How can I help?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Fixed: Always use the process.env.API_KEY directly as per SDK requirements.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        You are the professional AI Assistant for Ravindra Kumar Tripathi, an SAP Software Developer.
        Your goal is to represent him accurately and professionally.
        
        RAVINDRA'S PROFILE:
        - Title: ${PERSONAL_INFO.title}
        - Current Role: ${EXPERIENCES[0].role} at ${EXPERIENCES[0].company}
        - Expertise: ABAP, S/4HANA, RICEF, CDS Views, OData, SQL.
        - Summary: ${PERSONAL_INFO.summary}
        - YouTube Channel: @CodeAbap (educational content for SAP developers).
        
        DETAILED EXPERIENCE:
        ${EXPERIENCES.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description.join(', ')}`).join('\n')}
        
        SKILLS:
        ${SKILL_GROUPS.map(g => `- ${g.category}: ${g.skills.join(', ')}`).join('\n')}
        
        GUIDELINES:
        - Be professional, concise, and helpful.
        - If asked about contact info, provide his email: ${PERSONAL_INFO.email} or LinkedIn: ${PERSONAL_INFO.linkedin}.
        - If you don't know an answer about his personal life, steer the conversation back to his professional SAP expertise.
        - Use Markdown for formatting if necessary.
      `;

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseStream = await chat.sendMessageStream({ message: userMessage });
      
      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);
      
      for await (const chunk of responseStream) {
        // chunk.text is a property, not a method. Correctly extracting generated text.
        const chunkText = (chunk as GenerateContentResponse).text || "";
        fullText += chunkText;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, text: fullText }];
        });
      }

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error. Please try again or contact Ravindra directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Summarize SAP experience",
    "Tell me about @CodeAbap",
    "What are his top skills?",
    "How to contact him?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-blue-600/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">SAP Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white/5 border border-white/10 text-gray-300 rounded-bl-none'
                  }`}>
                    {m.text || <div className="flex gap-1 py-1"><div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div><div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-75"></div><div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-150"></div></div>}
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length-1].role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-none">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-6 pb-2 flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="px-3 py-1 bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/30 rounded-full text-[10px] text-gray-400 hover:text-blue-300 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-12 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-600"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 shadow-blue-500/40'
        }`}
      >
        {isOpen ? <X className="text-white" /> : <Bot className="text-white w-8 h-8" />}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-20 pointer-events-none"></div>
        )}
      </motion.button>
    </div>
  );
};

export default AIAssistant;
