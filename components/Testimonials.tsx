import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';

const MarqueeCard: React.FC<{ testimonial: typeof TESTIMONIALS[0] }> = ({ testimonial }) => (
  <div className="group relative w-[400px] p-8 rounded-3xl bg-[#0A0A0F] border border-white/5 hover:border-electric/30 transition-colors mx-4 shrink-0 overflow-hidden">
    {/* Hover Gradient Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    {/* Content */}
    <div className="relative z-10">
      <div className="flex gap-1 mb-4 text-yellow-500">
        {[...Array(5)].map((_, i) => (
           <Star 
             key={i} 
             className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-500' : 'fill-transparent text-zinc-700'}`} 
           />
        ))}
      </div>

      <div className="relative mb-6">
         <Quote className="absolute -top-2 -left-2 w-8 h-8 text-electric/20 -z-10 rotate-180" />
         <p className="text-lg text-zinc-300 leading-relaxed italic">"{testimonial.text}"</p>
      </div>
      
      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
        <div className="relative">
           <img 
             src={testimonial.avatar} 
             alt={testimonial.name} 
             className="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-electric/50 transition-colors" 
           />
           <div className="absolute inset-0 rounded-full bg-electric/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div>
          <div className="text-white font-bold tracking-wide group-hover:text-electric transition-colors">{testimonial.name}</div>
          <div className="text-sm text-zinc-500 font-medium">{testimonial.role}</div>
        </div>
      </div>
    </div>
  </div>
);

const MarqueeRow: React.FC<{ items: typeof TESTIMONIALS; direction: 'left' | 'right'; speed?: number }> = ({ items, direction, speed = 40 }) => {
  return (
    <div className="relative flex w-full overflow-hidden py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: direction === 'left' ? '-50%' : '0%' }}
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        whileHover={{ animationPlayState: "paused" }} // Note: Framer motion handle hover pause differently, using CSS for simplicity below
        style={{ width: 'max-content' }}
      >
         {/* Render items multiple times to ensure seamless looping on large screens */}
         {[...items, ...items, ...items].map((t, i) => (
           <MarqueeCard key={`${t.id}-${i}`} testimonial={t} />
         ))}
      </motion.div>
      
      {/* CSS-based pause on hover hack since Framer Motion loop is hard to pause externally without complex state */}
      <style>{`
        .relative:hover > div {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

const Testimonials: React.FC = () => {
  // Split testimonials into two groups for variety
  const firstRow = TESTIMONIALS.slice(0, 3);
  const secondRow = TESTIMONIALS.slice(3, 6);

  return (
    <section id="community" className="py-32 bg-obsidian overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-electric/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by the Community
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            See how Lost&Found is changing campus life, one returned item at a time.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        <MarqueeRow items={TESTIMONIALS} direction="left" speed={50} />
        <MarqueeRow items={[...TESTIMONIALS].reverse()} direction="right" speed={50} />
      </div>
      
      {/* Fade Masks */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-obsidian to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-obsidian to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default Testimonials;