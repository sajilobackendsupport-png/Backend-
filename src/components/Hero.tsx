import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-primary">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-accent/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/20 text-brand-accent rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
              </span>
              Booking Open for New Batch
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Master the Road with <span className="text-brand-accent italic">Confidence.</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
              Professional driving school in Bramhakhel, Kathmandu. We provide expert training for Light Vehicles, Bikes, and Scooters with a guaranteed trial success rate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#courses"
                className="bg-brand-accent text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-brand-accent/20"
              >
                View Courses
                <ArrowRight size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
              >
                Learn More
              </motion.a>
            </div>
            
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Experienced Instructors' },
                { label: 'Guaranteed Trial Success' },
                { label: 'Flexible Timing' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 size={18} className="text-brand-accent" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-slate-800 rounded-3xl p-4 shadow-2xl border border-white/10 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop" 
                alt="Driving Practice" 
                className="w-full h-auto rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-brand-primary/40 group-hover:bg-transparent transition-all duration-700" />
            </div>
            
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl z-20 max-w-[200px]"
            >
              <div className="text-sm font-bold text-brand-primary mb-1">Located at</div>
              <div className="text-lg font-black text-brand-primary leading-tight">
                Bramhakhel, Thuko Dhik, KTM
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-12 -right-8 bg-brand-accent p-6 rounded-2xl shadow-2xl z-20"
            >
              <div className="text-white text-center">
                <div className="text-3xl font-black">99%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Trial Success Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
