import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Menu, X, Phone, LogIn, LogOut, User } from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { signIn } from '../lib/firestore_utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (e: any) {
      if (e.message?.includes('auth/unauthorized-domain')) {
        alert(`Sign in failed: This domain (${window.location.hostname}) is not authorized in Firebase. Please add this domain in Firebase Console -> Authentication -> Settings -> Authorized domains.`);
      } else {
        alert(`Sign in error: ${e.message}`);
      }
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Courses', href: '#courses' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-morphism py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Pass Easy Logo" className="h-12 w-auto object-contain" />
            <span className={`font-bold text-xl tracking-tight hidden sm:block ${scrolled ? 'text-brand-primary' : 'text-white'}`}>
              PASS EASY
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-accent ${
                  scrolled ? 'text-slate-600' : 'text-white/90'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className={`text-sm font-medium ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-red-500 ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand-accent ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
              >
                <LogIn size={16} />
                Sign In
              </button>
            )}

            <a
              href="tel:+9779851411945"
              className="bg-brand-accent text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-brand-accent/90 transition-all shadow-md"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? 'text-brand-primary' : 'text-white'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-brand-accent hover:bg-slate-50 rounded-md"
                >
                  {link.name}
                </a>
              ))}
              
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-4 text-base font-medium text-red-500 hover:bg-red-50 rounded-md"
                >
                  <LogOut size={18} />
                  Sign Out ({user.displayName || user.email})
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleSignIn();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-4 text-base font-medium text-slate-700 hover:text-brand-accent hover:bg-slate-50 rounded-md"
                >
                  <LogIn size={18} />
                  Sign In
                </button>
              )}

              <div className="pt-4 px-3">
                <a
                  href="tel:+9779851411945"
                  className="w-full bg-brand-accent text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone size={18} />
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
