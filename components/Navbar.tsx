import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronRight, User as UserIcon, LogOut, GraduationCap, Sparkles } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onOpenProfile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSignIn, onSignOut, onOpenProfile }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for Active Section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );

    const sections = ['live-feed', 'about', 'community'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else if (id === 'map') {
      alert("Interactive 3D Map feature is currently in beta. Please check back later.");
    }
    setMobileOpen(false);
  };

  const handleSearchClick = () => {
    const searchInput = document.getElementById('hero-search-input');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInput.focus();
    } else {
      alert("Search interface initializing...");
    }
  };

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    
    // Move text away from cursor (magnetic repulsion)
    setLogoPosition({ x: x * -0.3, y: y * -0.3 });
  };

  const handleLogoMouseLeave = () => {
    setLogoPosition({ x: 0, y: 0 });
  };

  const navItems = [
    { name: 'Live Feed', id: 'live-feed' },
    { name: 'Map', id: 'map' },
    { name: 'Features', id: 'about' },
    { name: 'Community', id: 'community' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-obsidian/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl shadow-black/50' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group relative z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseMove={handleLogoMouseMove}
          onMouseLeave={handleLogoMouseLeave}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] border border-white/10 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
            <Search className="w-5 h-5 stroke-[2.5] relative z-10" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_white] animate-pulse z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <motion.span 
            animate={{ x: logoPosition.x, y: logoPosition.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="font-display font-bold text-xl tracking-tight text-white inline-block"
          >
            Lost&Found
          </motion.span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              className={`relative px-5 py-2 text-sm font-medium transition-colors z-10 ${
                activeSection === item.id || hoveredNav === item.id ? 'text-white' : 'text-zinc-400'
              }`}
            >
              {/* Fluid Background Pill */}
              {(activeSection === item.id || hoveredNav === item.id) && (
                <motion.span
                  layoutId="nav-pill"
                  className={`absolute inset-0 rounded-full -z-10 ${
                    activeSection === item.id ? 'bg-white/10' : 'bg-white/5'
                  }`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {item.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={handleSearchClick}
            className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
          >
            <Search className="w-4 h-4" />
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {/* University Badge */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
                <GraduationCap className="w-3.5 h-3.5 text-electric" />
                {user.university}
              </div>

              {/* User Profile Trigger */}
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="text-right hidden lg:block">
                  <div className="text-sm font-medium text-white">{user.name}</div>
                </div>
                <button 
                  onClick={onOpenProfile}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10 flex items-center justify-center text-white hover:ring-2 hover:ring-electric/50 transition-all group relative overflow-hidden"
                  title="View Profile"
                >
                  <span className="font-bold text-xs group-hover:hidden transition-all duration-300">
                    {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </span>
                  <UserIcon className="w-4 h-4 hidden group-hover:block text-electric absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300" />
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={onSignIn}
              className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-[1px] bg-gradient-to-r from-electric to-purple-500 rounded-full opacity-30 blur-sm group-hover:opacity-50 transition-opacity -z-10" />
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 top-0 z-40 bg-black/60 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: -300 }}
              animate={{ y: 0 }}
              exit={{ y: -400 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-[#09090B] border-b border-white/10 pt-24 pb-10 px-6 shadow-2xl rounded-b-[3rem]"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-2">
                {user && (
                  <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-lg">
                       {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-white">{user.name}</div>
                      <div className="text-xs text-zinc-400 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        {user.university}
                      </div>
                    </div>
                  </div>
                )}

                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 active:scale-98 transition-all group"
                  >
                    <span className="text-2xl font-display font-medium text-zinc-200 group-hover:text-white">
                      {item.name}
                    </span>
                    <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-electric transition-colors" />
                  </motion.a>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="h-px bg-white/10 my-4" 
                />
                
                {user ? (
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => { onSignOut(); setMobileOpen(false); }}
                    className="w-full py-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </motion.button>
                ) : (
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => { onSignIn(); setMobileOpen(false); }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-electric to-indigo-600 text-white font-bold text-lg shadow-lg shadow-electric/20 active:scale-95 transition-transform"
                  >
                    Sign In / Register
                  </motion.button>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;