import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Trash2, Clock, User as UserIcon, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

interface Student {
  id: string;
  name: string;
  timeSlot: string;
  durationMinutes: number;
  timeRemainingSeconds: number;
  isActive: boolean;
}

export default function StudentsTracker() {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('practice_students');
    const lastTick = localStorage.getItem('practice_last_tick');
    let loadedStudents: Student[] = saved ? JSON.parse(saved) : [];
    
    if (lastTick && loadedStudents.length > 0) {
      const elapsed = Math.floor((Date.now() - parseInt(lastTick, 10)) / 1000);
      if (elapsed > 0) {
        loadedStudents = loadedStudents.map(student => {
          if (student.isActive) {
            const newTime = Math.max(0, student.timeRemainingSeconds - elapsed);
            if (newTime === 0 && student.timeRemainingSeconds > 0) {
              // Note: Cannot show toast perfectly here since it's on component mount, 
              // but we make sure the time is updated.
            }
            return { ...student, timeRemainingSeconds: newTime, isActive: newTime > 0 };
          }
          return student;
        });
      }
    }
    return loadedStudents;
  });

  const [newName, setNewName] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('08:00 AM');
  const [newDuration, setNewDuration] = useState('30');

  useEffect(() => {
    localStorage.setItem('practice_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStudents(currentStudents => {
        let hasFinished = false;
        
        const nextStudents = currentStudents.map(student => {
          if (student.isActive && student.timeRemainingSeconds > 0) {
            const nextTime = student.timeRemainingSeconds - 1;
            if (nextTime === 0) {
              toast(`Time's up for ${student.name}!`, { icon: '⏰', duration: 5000 });
              return { ...student, timeRemainingSeconds: nextTime, isActive: false };
            }
            return { ...student, timeRemainingSeconds: nextTime };
          } else if (student.isActive && student.timeRemainingSeconds <= 0) {
            return { ...student, isActive: false };
          }
          return student;
        });
        
        return nextStudents;
      });
      localStorage.setItem('practice_last_tick', Date.now().toString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newStudent: Student = {
      id: Date.now().toString(),
      name: newName,
      timeSlot: newTimeSlot,
      durationMinutes: parseInt(newDuration, 10),
      timeRemainingSeconds: parseInt(newDuration, 10) * 60,
      isActive: false
    };

    setStudents([...students, newStudent]);
    setNewName('');
  };

  const removeStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const toggleTimer = (id: string) => {
    localStorage.setItem('practice_last_tick', Date.now().toString());
    setStudents(students.map(s => {
      if (s.id === id) {
        if (s.timeRemainingSeconds > 0) {
          return { ...s, isActive: !s.isActive };
        }
      }
      return s;
    }));
  };

  const resetTimer = (id: string) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        return { ...s, timeRemainingSeconds: s.durationMinutes * 60, isActive: false };
      }
      return s;
    }));
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 shadow-inner">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <a href="#home" className="inline-flex items-center text-brand-accent font-bold hover:underline mb-4">
              <ChevronLeft size={20} className="mr-1" /> Back to Home
            </a>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Student Timers</h1>
            <p className="text-slate-500 mt-1">Manage practical driving sessions and countdowns.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-8">
          <form onSubmit={addStudent} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Student Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <UserIcon size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="E.g. John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-48 relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Time Slot</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Clock size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={newTimeSlot}
                  onChange={e => setNewTimeSlot(e.target.value)}
                  placeholder="E.g. 10:00 AM"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                />
              </div>
            </div>

            <div className="w-full sm:w-40 relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Duration (Min)</label>
              <input
                type="number"
                min="1"
                required
                value={newDuration}
                onChange={e => setNewDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
              />
            </div>

            <button type="submit" className="w-full sm:w-auto bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <Plus size={18} /> Add
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {students.map((student) => {
              const isWarning = student.timeRemainingSeconds <= 300 && student.timeRemainingSeconds > 0; // less than 5 min
              const isFinished = student.timeRemainingSeconds === 0;
              
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-white rounded-3xl p-6 border shadow-sm transition-colors ${isFinished ? 'border-red-200 bg-red-50/30' : isWarning ? 'border-orange-200' : 'border-slate-100'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{student.name}</h3>
                      <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1">
                        <Clock size={14} /> {student.timeSlot} • {student.durationMinutes} min
                      </p>
                    </div>
                    <button 
                      onClick={() => removeStudent(student.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-2 -mr-2 -mt-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className={`text-5xl font-black text-center my-8 font-mono tracking-tight ${isFinished ? 'text-red-500' : isWarning ? 'text-orange-500' : 'text-slate-800'}`}>
                    {formatTime(student.timeRemainingSeconds)}
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => toggleTimer(student.id)}
                      disabled={isFinished}
                      className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl transition-all ${
                        student.isActive 
                          ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                          : isFinished 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-md'
                      }`}
                    >
                      {student.isActive ? (
                        <><Pause size={18} /> Pause</>
                      ) : (
                        <><Play size={18} /> Start</>
                      )}
                    </button>
                    
                    <button
                      onClick={() => resetTimer(student.id)}
                      className="flex items-center justify-center font-bold p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                      title="Reset Timer"
                    >
                      <RotateCcw size={18} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {students.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">No active student timers.</p>
              <p className="text-sm mt-1">Add a student above to start tracking their session.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
