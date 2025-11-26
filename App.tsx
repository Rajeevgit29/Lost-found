import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, Camera, Loader2, Upload, Trash2, ChevronDown, Building, Mail, Lock, User, LogOut } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroScene from './components/HeroScene';
import LiveFeed from './components/LiveFeed';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { User as UserType } from './types';

const UNIVERSITIES = [
  "Stanford University",
  "MIT",
  "UC Berkeley",
  "Harvard University",
  "UCLA",
  "University of Washington",
  "Other"
];

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center"
    >
      <div className="relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
          className="h-1 bg-white rounded-full overflow-hidden"
        >
          <div className="h-full w-full bg-electric animate-pulse" />
        </motion.div>
        <div className="mt-4 text-zinc-500 font-mono text-xs tracking-widest text-center">
          INITIALIZING
        </div>
      </div>
    </motion.div>
  );
};

const UserProfileModal: React.FC<{ user: UserType; onClose: () => void; onSignOut: () => void }> = ({ user, onClose, onSignOut }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#18181B] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
      >
        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h2 className="text-xl font-display font-bold text-white">My Profile</h2>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 flex flex-col items-center">
           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border-4 border-obsidian shadow-xl flex items-center justify-center text-3xl font-bold text-white mb-6">
              {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
           </div>
           
           <div className="w-full space-y-4">
              <div className="space-y-1">
                 <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Full Name</label>
                 <div className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white flex items-center gap-3">
                    <User className="w-5 h-5 text-zinc-500" />
                    {user.name}
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
                 <div className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white flex items-center gap-3">
                    <Mail className="w-5 h-5 text-zinc-500" />
                    {user.email}
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">University</label>
                 <div className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white flex items-center gap-3">
                    <Building className="w-5 h-5 text-zinc-500" />
                    {user.university}
                 </div>
              </div>
           </div>

           <button 
             onClick={() => { onSignOut(); onClose(); }}
             className="w-full mt-8 py-3.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
           >
             <LogOut className="w-4 h-4" />
             Sign Out
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SignInModal: React.FC<{ onClose: () => void; onSignIn: (user: UserType) => void }> = ({ onClose, onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState(UNIVERSITIES[0]);
  const [customUniversity, setCustomUniversity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Determine final university string
    const finalUniversity = university === 'Other' ? customUniversity : university;

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSignIn({
        name: "Student User",
        email,
        university: finalUniversity || "Unknown University"
      });
      onClose();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-[#18181B] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
      >
         {/* Header */}
         <div className="p-8 text-center border-b border-white/5 bg-white/5">
            <h2 className="text-2xl font-display font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-zinc-400 text-sm">Sign in to manage your reports and alerts</p>
            
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
         </div>

         <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="space-y-2">
               <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">University</label>
               <div className="relative">
                 <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                 <select 
                   value={university}
                   onChange={(e) => setUniversity(e.target.value)}
                   className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-10 py-3.5 text-white outline-none focus:border-electric focus:ring-1 focus:ring-electric/50 transition-all appearance-none cursor-pointer"
                 >
                    {UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
               </div>
               
               {university === 'Other' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2"
                  >
                     <input 
                       type="text" 
                       value={customUniversity}
                       onChange={(e) => setCustomUniversity(e.target.value)}
                       placeholder="Enter your university name"
                       className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-electric focus:ring-1 focus:ring-electric/50 transition-all placeholder:text-zinc-600"
                       required={university === 'Other'}
                     />
                  </motion.div>
               )}
            </div>

            <div className="space-y-2">
               <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Email</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="student@university.edu"
                   className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white outline-none focus:border-electric focus:ring-1 focus:ring-electric/50 transition-all placeholder:text-zinc-600"
                   required
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider ml-1">Password</label>
               <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="••••••••"
                   className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white outline-none focus:border-electric focus:ring-1 focus:ring-electric/50 transition-all placeholder:text-zinc-600"
                   required
                 />
               </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl bg-gradient-to-r from-electric to-indigo-600 text-white font-bold text-lg shadow-lg shadow-electric/20 flex items-center justify-center gap-2 transition-all ${
                  isSubmitting ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
              </button>
            </div>
            
            <div className="text-center">
               <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Forgot Password?</a>
            </div>
         </form>
      </motion.div>
    </motion.div>
  );
};

const ReportModal: React.FC<{ type: 'lost' | 'found'; onClose: () => void }> = ({ type, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      } else {
        alert("Please upload an image file.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      alert(type === 'lost' 
        ? "Report submitted! Our AI is scanning for matches. We'll notify you immediately if found." 
        : "Thank you! We've notified potential owners. Please drop the item at the nearest Student Center."
      );
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-xl font-display font-semibold text-white flex items-center gap-2">
            {type === 'lost' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Report Lost Item
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Report Found Item
              </>
            )}
          </h2>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">What is it?</label>
            <input 
              type="text" 
              placeholder={type === 'lost' ? "e.g. MacBook Pro 14\" Space Grey" : "e.g. Blue Hydroflask"}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-electric focus:ring-1 focus:ring-electric/50 transition-all placeholder:text-zinc-600" 
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 ml-1">Category</label>
              <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-electric focus:ring-1 focus:ring-electric/50 transition-all appearance-none cursor-pointer">
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Keys</option>
                <option>Books</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 ml-1">Location</label>
              <input 
                type="text" 
                placeholder="e.g. Library"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-electric focus:ring-1 focus:ring-electric/50 transition-all placeholder:text-zinc-600" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium text-zinc-400 ml-1">Photo (Optional)</label>
             <div 
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-zinc-500 transition-all cursor-pointer group relative overflow-hidden ${
                    dragActive ? 'border-electric bg-electric/5' : 'border-white/10 hover:bg-white/5 hover:border-electric/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
             >
                <input 
                    ref={inputRef}
                    type="file" 
                    className="hidden" 
                    onChange={handleChange}
                    accept="image/*"
                />
                
                {selectedFile ? (
                    <div className="flex flex-col items-center z-10 w-full">
                        <div className="w-full h-32 rounded-lg bg-black/50 mb-3 overflow-hidden relative border border-white/10 group-hover:border-white/20 transition-colors">
                            <img 
                                src={URL.createObjectURL(selectedFile)} 
                                alt="Preview" 
                                className="w-full h-full object-contain"
                                onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                            />
                        </div>
                        <div className="flex items-center justify-between w-full px-2">
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-medium text-white truncate max-w-[200px]">{selectedFile.name}</span>
                                <span className="text-xs text-zinc-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                            <button 
                                onClick={removeFile}
                                className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                title="Remove file"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                            dragActive ? 'scale-110 bg-electric/20 text-electric' : 'bg-white/5 group-hover:scale-110 group-hover:bg-electric/20 group-hover:text-electric'
                        }`}>
                            {dragActive ? <Upload className="w-6 h-6 animate-bounce" /> : <Camera className="w-6 h-6" />}
                        </div>
                        <span className={`text-sm font-medium ${dragActive ? 'text-electric' : 'group-hover:text-zinc-300'}`}>
                            {dragActive ? "Drop to upload" : "Drag & drop or click to upload"}
                        </span>
                    </>
                )}
             </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-2 transition-all ${
              type === 'lost' 
                ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]' 
                : 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
            } ${isSubmitting ? 'opacity-80 cursor-wait' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              type === 'lost' ? 'Submit Report' : 'Notify Owner'
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  
  // Auth State
  const [user, setUser] = useState<UserType | null>(null);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);

  // Modal State
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost');
  
  const placeholders = ["MacBook Pro", "Keys", "Student ID", "Blue Wallet", "AirPods", "Hydroflask"];

  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentWord = placeholders[currentIdx];
      
      if (isDeleting) {
        setPlaceholderText(currentWord.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setPlaceholderText(currentWord.substring(0, charIdx + 1));
        charIdx++;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, 2000); // Wait before deleting
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % placeholders.length;
        timeoutId = setTimeout(type, 500);
      } else {
        const speed = isDeleting ? 50 : 100;
        timeoutId = setTimeout(type, speed);
      }
    };

    const initialTimeout = setTimeout(type, 500);
    return () => clearTimeout(timeoutId || initialTimeout);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    alert(`Searching database for: ${inputValue}`);
  };

  const scrollToLiveFeed = () => {
    const el = document.getElementById('live-feed');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const openReportModal = (type: 'lost' | 'found') => {
    setReportType(type);
    setReportModalOpen(true);
  };

  const handleSignIn = (userData: UserType) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setTimeout(() => setLoading(false), 500)} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {reportModalOpen && (
          <ReportModal type={reportType} onClose={() => setReportModalOpen(false)} />
        )}
        {signInModalOpen && (
          <SignInModal onClose={() => setSignInModalOpen(false)} onSignIn={handleSignIn} />
        )}
        {user && userProfileModalOpen && (
          <UserProfileModal 
            user={user} 
            onClose={() => setUserProfileModalOpen(false)} 
            onSignOut={handleSignOut} 
          />
        )}
      </AnimatePresence>

      <div className={`min-h-screen bg-obsidian text-white selection:bg-electric selection:text-white ${loading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar 
          user={user}
          onSignIn={() => setSignInModalOpen(true)}
          onSignOut={handleSignOut}
          onOpenProfile={() => setUserProfileModalOpen(true)}
        />
        
        {/* Hero Section */}
        <main className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <HeroScene />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={!loading ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-zinc-300 tracking-wide">
                {user ? `Welcome back, ${user.name}` : 'The New Standard for Campus Recovery'}
              </span>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                NEVER LOSE<br />WHAT MATTERS
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                The smartest way to find what you've lost on campus. Powered by community intelligence and AI visual matching.
              </p>

              {/* Search Bar */}
              <motion.form 
                onSubmit={handleSearch} 
                className="max-w-xl mx-auto relative z-20"
                animate={{ scale: isFocused ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-electric to-purple-600 rounded-full blur-xl"
                  animate={{ 
                    opacity: isFocused ? 0.5 : 0.2,
                    scale: isFocused ? 1.1 : 0.95
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className={`relative flex items-center bg-zinc-900/80 backdrop-blur-xl border transition-all duration-300 rounded-full p-2 shadow-2xl ${isFocused ? 'border-electric/50 ring-1 ring-electric/20' : 'border-white/10'}`}>
                  <div className={`pl-4 transition-colors duration-300 ${isFocused ? 'text-electric' : 'text-zinc-500'}`}>
                     <Search className={`w-5 h-5 transition-all duration-300 ${isFocused ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : ''}`} />
                  </div>
                  
                  <input
                    id="hero-search-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={`Search "${placeholderText}"...`}
                    className="pl-3 flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500/70 text-lg h-12 w-full font-medium"
                  />
                  
                  <button 
                    type="submit"
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isFocused 
                        ? 'bg-electric text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] rotate-0' 
                        : 'bg-white text-black -rotate-0 hover:scale-105'
                    }`}
                  >
                    {isFocused ? <ArrowRight className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                  </button>
                </div>
              </motion.form>
              
              <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <button 
                  onClick={() => openReportModal('lost')}
                  className="group px-8 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-zinc-300 hover:text-white font-medium transition-all hover:scale-105 hover:border-white/20 min-w-[180px]"
                >
                  I Lost Something
                </button>
                
                <button 
                  onClick={() => openReportModal('found')}
                  className="group px-8 py-3.5 rounded-full bg-white text-black font-bold transition-all hover:scale-105 hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 min-w-[180px]"
                >
                  I Found Something
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-500 cursor-pointer"
            onClick={scrollToLiveFeed}
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
          </motion.div>
        </main>

        <LiveFeed university={user?.university} />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

export default App;