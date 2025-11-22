import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="relative group px-12 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden cursor-pointer"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-electric scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full origin-center z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
    </motion.button>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="relative py-32 bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Aurora Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-electric/30 to-transparent blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-3/4 h-[400px] bg-gradient-to-t from-purple-600/30 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
          Lost Something?<br />Let's find it.
        </h2>
        <p className="text-zinc-400 text-xl mb-12">
          Join the community trusted by over 12,000 students.
        </p>
        
        <MagneticButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Get Started — It's Free
        </MagneticButton>
      </div>

      <div className="absolute bottom-8 left-0 w-full text-center">
        <p className="text-zinc-600 text-sm font-mono">
          © 2024 Lost&Found. Designed for the future.
        </p>
      </div>
    </footer>
  );
};

export default Footer;