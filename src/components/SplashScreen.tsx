import { motion } from 'motion/react';
import { Car } from 'lucide-react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-brand-primary flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Background Rings */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [1, 2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-64 border border-brand-accent/30 rounded-full"
        />

        {/* Graphic */}
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10 relative z-10"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/logo.png" alt="Pass Easy Logo" className="w-56 h-56 md:w-72 md:h-72 object-contain" />
          </motion.div>
        </motion.div>

        {/* Nepali Text */}
        <div className="text-center relative z-10 px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-7xl md:text-9xl font-black text-white tracking-tight mb-4 select-none"
            style={{ 
              textShadow: '0 10px 30px rgba(0,0,0,0.3)',
              lineHeight: '1.1'
            }}
          >
            पास ईजी
          </motion.h1>
          
          <div className="relative h-1.5 w-48 bg-white/10 mx-auto rounded-full overflow-hidden">
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-1/2 bg-brand-accent shadow-[0_0_15px_rgba(249,115,22,0.8)]"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-white uppercase tracking-[0.4em] text-[10px] font-black mt-6"
          >
            Safe • Skilled • Certified
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
