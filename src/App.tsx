import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services, { Courses } from './components/TrainingModes';
import Contact, { Footer } from './components/FooterAndContact';
import SplashScreen from './components/SplashScreen';
import UserDashboard from './components/UserDashboard';
import StudentsTracker from './components/StudentsTracker';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#home');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show splash for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-accent selection:text-white">
      <Toaster position="top-center" toastOptions={{ className: 'font-medium' }} />
      <AnimatePresence>
        {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            {currentRoute === '#dashboard' ? (
              <UserDashboard />
            ) : currentRoute === '#students' ? (
              <StudentsTracker />
            ) : (
              <>
                <Hero />
                <Services />
                <Courses />
                <Contact />
              </>
            )}
          </main>
          {currentRoute !== '#dashboard' && currentRoute !== '#students' && <Footer />}
        </>
      )}
    </div>
  );
}

