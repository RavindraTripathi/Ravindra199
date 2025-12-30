
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = "" }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-20 px-6 max-w-6xl mx-auto ${className}`}
    >
      {title && (
        <div className="mb-12 flex items-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-blue-600 to-transparent opacity-30"></div>
        </div>
      )}
      {children}
    </motion.section>
  );
};

export default Section;
