import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Why Lost&Found is Different
          </h2>
          <p className="text-zinc-400 text-lg">
            We've reimagined the lost and found experience using cutting-edge technology to maximize recovery rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/10 backdrop-blur-md transition-colors group ${
                index === 0 ? 'md:col-span-2 bg-gradient-to-br from-zinc-900/50 to-indigo-950/30' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-electric group-hover:scale-110 transition-transform duration-300 group-hover:bg-electric group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;