import React from 'react';
import { TESTIMONIALS } from '../constants';

const MarqueeCard: React.FC<{ testimonial: typeof TESTIMONIALS[0] }> = ({ testimonial }) => (
  <div className="w-[350px] p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm mx-4 shrink-0">
    <p className="text-lg text-zinc-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
    <div className="flex items-center gap-3">
      <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
      <div>
        <div className="text-white font-medium">{testimonial.name}</div>
        <div className="text-sm text-zinc-500">{testimonial.role}</div>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section id="community" className="py-32 bg-obsidian overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl font-bold text-white">Loved by Students</h2>
      </div>

      <div className="relative flex w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {TESTIMONIALS.map((t) => <MarqueeCard key={t.id} testimonial={t} />)}
          {TESTIMONIALS.map((t) => <MarqueeCard key={`${t.id}-duplicate`} testimonial={t} />)}
          {TESTIMONIALS.map((t) => <MarqueeCard key={`${t.id}-duplicate-2`} testimonial={t} />)}
        </div>
        
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-obsidian to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-obsidian to-transparent z-10" />
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;