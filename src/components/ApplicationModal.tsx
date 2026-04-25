import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calendar, Clock, User, Phone, CheckCircle2 } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: string;
  vehicle: string;
}

export default function ApplicationModal({ isOpen, onClose, course, vehicle }: ApplicationModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
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

                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <User size={18} />
                        </div>
                        <input
                          required
                          type="text"
                          placeholder="Full Name"
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
                          className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-brand-primary placeholder:text-slate-400 outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Calendar size={18} />
                          </div>
                          <select required className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-brand-primary outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all appearance-none cursor-pointer">
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
                          <select required className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-brand-primary outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all appearance-none cursor-pointer">
                            <option value="">Time Slot</option>
                            <option value="morning">Morning (6AM - 10AM)</option>
                            <option value="day">Day (10AM - 3PM)</option>
                            <option value="evening">Evening (3PM - 6PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 bg-brand-accent text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 hover:bg-brand-accent/90 active:scale-[0.98] transition-all"
                    >
                      Submit Application
                      <Send size={18} />
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4">
                      By submitting, you agree to our terms of training.
                    </p>
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
