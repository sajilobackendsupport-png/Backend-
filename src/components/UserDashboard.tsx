import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { FileText, Calendar, Car, Clock, ChevronLeft, Loader2 } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function UserDashboard() {
  const [user, loading] = useAuthState(auth);
  const [applications, setApplications] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setFetching(false);
      return;
    }

    const fetchApplications = async () => {
      setFetching(true);
      setError(null);
      try {
        const q = query(
          collection(db, 'applications'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const appsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplications(appsData);
      } catch (err: any) {
        console.error("Error fetching applications:", err);
        setError(err.message || 'Failed to fetch applications.');
      } finally {
        setFetching(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-accent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-12 px-4 shadow-inner">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">User Dashboard</h1>
          <p className="text-slate-500 mb-8">Please sign in to view your applications.</p>
          <a href="#home" className="inline-flex items-center text-brand-accent font-bold hover:underline">
            <ChevronLeft size={20} className="mr-1" /> Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4 shadow-inner">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <a href="#home" className="inline-flex items-center text-brand-accent font-bold hover:underline mb-4">
              <ChevronLeft size={20} className="mr-1" /> Back to Home
            </a>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Dashboard</h1>
            <p className="text-slate-500 mt-2">Welcome back, {user.displayName || user.email}</p>
          </div>
        </div>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-600 mb-8">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              Error fetching data
            </h3>
            <p className="text-sm">{error}</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm border-dashed">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="text-slate-300 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Applications Found</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't submitted any driving school applications yet.</p>
            <a href="#courses" className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold inline-block hover:shadow-lg transition-all">
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {applications.map((app, idx) => (
              <motion.div 
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-accent"></div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{app.course}</h3>
                    <div className="flex items-center text-sm font-medium text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full w-fit">
                      {app.vehicle}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full whitespace-nowrap">
                    {app.createdAt ? new Date(app.createdAt.toDate ? app.createdAt.toDate() : app.createdAt).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Start Date</p>
                      <p className="font-medium text-slate-900">{app.startDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Time Slot</p>
                      <p className="font-medium text-slate-900">{app.timeSlot}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
