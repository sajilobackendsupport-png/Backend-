import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calendar, Clock, UserIcon, Phone, CheckCircle2, LogIn } from 'lucide-react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { signIn, handleFirestoreError, OperationType } from '../lib/firestore_utils';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: string;
  vehicle: string;
}

export default function ApplicationModal({ isOpen, onClose, course, vehicle }: ApplicationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u && u.displayName) {
        setFullName(u.displayName);
      }
    });
    return () => unsub();
  }, []);

  const handleSignIn = async () => {
    try {
      setError(null);
      await signIn();
    } catch (e: any) {
      setError("Failed to sign in");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      const appRef = doc(collection(db, 'applications'));
      const appData = {
        userId: user.uid,
        fullName,
        phoneNumber,
        course,
        vehicle,
        startDate,
        timeSlot,
        createdAt: serverTimestamp()
      };
      
      // 1. Submit to Firebase (Existing)
      await setDoc(appRef, appData).catch(err => {
        handleFirestoreError(err, OperationType.CREATE, `applications/${appRef.id}`);
      });
      
      // 2. Submit to Google Sheets (if webhook is configured)
      const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors', // Use no-cors to avoid CORS errors from Google Apps Script
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.uid,
              fullName,
              phoneNumber,
              course,
              vehicle,
              startDate,
              timeSlot,
              dateSubmitted: new Date().toISOString()
            })
          });
        } catch (sheetError) {
          console.error("Failed to submit to Google Sheets:", sheetError);
        }
      }
      
      // 3. Send Email Notification
      const body = `New Application%0D%0A%0D%0AName: ${fullName}%0D%0APhone: ${phoneNumber}%0D%0ACourse: ${course}%0D%0AVehicle: ${vehicle}%0D%0AStart Date: ${startDate}%0D%0ATime Slot: ${timeSlot}`;
      window.location.href = `mailto:passeasymotordrivingschool@gmail.com?subject=New Application from ${fullName}&body=${body}`;
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        // reset fields
        setStartDate('');
        setTimeSlot('');
        setPhoneNumber('');
      }, 3000);
    } catch (err: any) {
      if (err.message.includes('Firestore Error')) {
        setError("Missing or insufficient permissions.");
      } else {
        setError(err.message || 'An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-brand-primary/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="bg-brand-primary p-6 relative shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors bg-white/10 rounded-full p-2"
                >
                  <X size={20} />
                </button>
                <span className="text-brand-accent font-bold tracking-widest uppercase text-xs">Enrollment Form</span>
                <h3 className="text-2xl font-black text-white mt-1">Start Your Journey</h3>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-2xl font-bold text-brand-primary mb-2">Application Received!</h4>
                    <p className="text-slate-600">
                      We'll contact you soon to confirm your {course} for {vehicle}.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Pre-filled info */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-4 mb-6">
                      <div className="bg-brand-accent/20 text-brand-accent p-2 rounded-xl">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-brand-primary">{course}</div>
                        <div className="text-xs text-slate-500 font-medium">Selected Vehicle: {vehicle}</div>
                      </div>
                    </div>
                    
                    {error && (
                      <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                        {error}
                      </div>
                    )}

                    {!user ? (
                      <div className="py-6 text-center">
                        <p className="text-slate-600 mb-6">Please sign in to submit your application.</p>
                        <button
                          type="button"
                          onClick={handleSignIn}
                          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                        >
                          <LogIn size={18} />
                          Sign in with Google
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <UserIcon size={18} />
                          </div>
                          <input
                            required
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-brand-primary placeholder:text-slate-400 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                          />
                        </div>

                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Phone size={18} />
                          </div>
                          <input
                            required
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-brand-primary placeholder:text-slate-400 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                              <Calendar size={18} />
                            </div>
                            <select 
                              required 
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-brand-primary outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all appearance-none cursor-pointer"
                            >
                              <option value="">Start Date</option>
                              <option value="immediate">Immediately</option>
                              <option value="next_week">Next Week</option>
                              <option value="next_month">Next Month</option>
                            </select>
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                              <Clock size={18} />
                            </div>
                            <select 
                              required 
                              value={timeSlot}
                              onChange={(e) => setTimeSlot(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-brand-primary outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all appearance-none cursor-pointer"
                            >
                              <option value="">Time Slot</option>
                              <option value="morning">Morning (6AM - 10AM)</option>
                              <option value="day">Day (10AM - 3PM)</option>
                              <option value="evening">Evening (3PM - 6PM)</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full mt-6 bg-brand-accent text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 hover:bg-brand-accent/90 active:scale-[0.98] transition-all disabled:opacity-70"
                        >
                          {loading ? 'Submitting...' : 'Submit Application'}
                          {!loading && <Send size={18} />}
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4">
                          By submitting, you agree to our terms of training.
                        </p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
