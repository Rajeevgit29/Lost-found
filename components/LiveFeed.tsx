import React, { useState, useRef, useLayoutEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MOCK_ITEMS } from '../constants';
import { Clock, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

// Inner card component handles the 3D tilt and hover effects
const ItemCard: React.FC<{ item: typeof MOCK_ITEMS[0]; index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Configuration
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring smoothing for fluid movement
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Transforms for tilt
  // Moving mouse up (negative Y) -> Rotate X positive (tilt up)
  // Moving mouse right (positive X) -> Rotate Y positive (tilt right)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]); 
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  // Parallax Shine Effect
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "120%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "120%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    // Convert to percentage -0.5 to 0.5
    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Pulse color based on status
  const pulseColor = item.status === 'found' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(244, 63, 94, 0.5)';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => alert(`Opening details for ${item.title}...`)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      className="group relative bg-charcoal/50 border border-white/5 rounded-2xl backdrop-blur-sm hover:border-electric/50 transition-colors cursor-pointer h-full w-full"
    >
      {/* Dynamic Shine Overlay */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay">
         <motion.div 
           style={{ 
             background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.3) 0%, transparent 50%)` 
           }}
           className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%]"
         />
      </div>

      {/* Image Container with Z-Translation for Parallax */}
      <div 
        className="aspect-[4/3] w-full overflow-hidden relative rounded-t-2xl"
        style={{ transform: "translateZ(20px)" }}
      >
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent opacity-60" />
        
        {/* Status Badge with Pulse Animation */}
        <motion.div 
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/10 z-20 shadow-lg ${
            item.status === 'found' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}
          animate={isHovered ? {
            scale: [1, 1.05, 1],
            boxShadow: [
              `0 0 0 0 ${pulseColor}`,
              `0 0 0 6px rgba(255,255,255,0)`,
              `0 0 0 0 rgba(255,255,255,0)`
            ]
          } : {
            scale: 1,
            boxShadow: "0 0 0 0 transparent"
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.status}
        </motion.div>
      </div>

      {/* Content with Z-Translation */}
      <div className="p-5 relative" style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-lg font-semibold text-white group-hover:text-electric transition-colors">
            {item.title}
          </h3>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <MapPin className="w-4 h-4 text-zinc-500" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Clock className="w-4 h-4 text-zinc-500" />
            <span>{item.timeAgo}</span>
          </div>
        </div>

        {/* Ambient Glow Effect */}
        <div className="absolute -inset-1 bg-electric/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
    </motion.div>
  );
};

const LiveFeed: React.FC<{ university?: string }> = ({ university }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<Flip.FlipState | null>(null);

  // Filter Logic
  const visibleItemIds = useMemo(() => {
    return MOCK_ITEMS.filter(item => {
      if (activeFilter === 'All') return true;
      return item.category.toLowerCase() === activeFilter.toLowerCase();
    }).map(item => item.id);
  }, [activeFilter]);

  // GSAP FLIP Handler
  const handleFilterChange = (newFilter: string) => {
    if (!containerRef.current) return;
    
    // 1. Record the state of the items BEFORE the update
    stateRef.current = Flip.getState(".item-card-wrapper");
    
    // 2. Update state (React will re-render and toggle display:none/block based on filter)
    setActiveFilter(newFilter);
  };

  useLayoutEffect(() => {
    // 3. After React updates the DOM, Apply the FLIP animation
    if (!stateRef.current || !containerRef.current) return;

    Flip.from(stateRef.current, {
      targets: ".item-card-wrapper",
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.05,
      absolute: true,
      onEnter: elements => {
        return gsap.fromTo(elements, 
          { opacity: 0, scale: 0.8 }, 
          { opacity: 1, scale: 1, duration: 0.4, delay: 0.1 }
        );
      },
      onLeave: elements => {
        return gsap.to(elements, 
          { opacity: 0, scale: 0.8, duration: 0.3 }
        );
      }
    });

    // Clean up
    stateRef.current = null;
  }, [activeFilter]);

  return (
    <section id="live-feed" className="py-32 relative bg-obsidian min-h-[800px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-rose-500 font-mono text-sm tracking-widest uppercase">
                Live Feed {university ? `• ${university}` : ''}
              </span>
            </motion.div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white">
              {university ? `Reported at ${university}` : 'Recently Reported'}
            </h2>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {['All', 'Electronics', 'Clothing', 'Keys', 'Books'].map((filter) => (
              <button 
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {MOCK_ITEMS.map((item, index) => {
             const isVisible = visibleItemIds.includes(item.id);
             return (
                <div 
                  key={item.id} 
                  className="item-card-wrapper"
                  style={{ display: isVisible ? 'block' : 'none' }}
                >
                   <ItemCard item={item} index={index} />
                </div>
             );
          })}
        </div>
        
        {visibleItemIds.length === 0 && (
           <div className="text-center py-20 text-zinc-500 absolute left-0 right-0">
             No items found in this category.
           </div>
        )}

        <div className="mt-16 flex justify-center relative z-10">
          <button 
            onClick={() => alert("Loading more items...")}
            className="px-8 py-3 rounded-full border border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            View All Activity
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveFeed;