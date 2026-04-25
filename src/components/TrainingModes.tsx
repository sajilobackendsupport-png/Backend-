import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Bike, Info, ShieldCheck, GraduationCap, Globe2, Award, CheckCircle2 } from 'lucide-react';
import ApplicationModal from './ApplicationModal';

export default function Services() {
  const services = [
    {
      title: 'Light Vehicle',
      description: 'Comprehensive car driving training for beginners and intermediate learners. Master parking, hill starts, and traffic rules.',
      icon: <Car className="w-8 h-8" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Motorbike',
      description: 'Learn to balance, shift gears, and navigate narrow paths safely. perfect for trial preparation.',
      icon: <Bike className="w-8 h-8" />,
      color: 'bg-orange-500'
    },
    {
      title: 'Scooter',
      description: 'Easy and efficient scooter training focusing on balance, braking, and traffic awareness for everyday commute.',
      icon: <Info className="w-8 h-8" />,
      color: 'bg-green-500'
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-accent font-bold tracking-widest uppercase text-sm"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-brand-primary mt-2"
          >
            Driving Services We Provide
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all"
            >
              <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-primary mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [vehicle, setVehicle] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{course: string, vehicle: string} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const courses = [
    {
      title: 'Abroad Preparation',
      subtitle: 'For Students & Professionals',
      description: 'Specialized training for those moving abroad. Focus on international driving rules, traffic signs, and safe driving habits.',
      icon: <Globe2 className="w-6 h-6 text-brand-accent" />,
      features: ['International Rules', 'Mock Tests', 'Traffic Sign Education']
    },
    {
      title: 'Basic Course',
      subtitle: 'Foundational Training',
      description: 'The perfect starting point for new drivers. Covers everything from vehicle components to basic road navigation.',
      icon: <GraduationCap className="w-6 h-6 text-brand-accent" />,
      features: ['Vehicle Basics', 'Clutch Control', 'Basic Maneuvers']
    },
    {
      title: 'Trial Guarantee',
      subtitle: 'Success Focused',
      description: 'Our most popular course. We focus strictly on the official licensing trial requirements until you are confident of success.',
      icon: <Award className="w-6 h-6 text-brand-accent" />,
      features: ['L-Section Practice', '8-Shape Expertise', 'Unlimited Practice Hours']
    }
  ];

  const vehicles = [
    { id: 'scooter', name: 'Scooter', icon: <Info size={20} /> },
    { id: 'bike', name: 'Motorbike', icon: <Bike size={20} /> },
    { id: 'car', name: 'Light Vehicle', icon: <Car size={20} /> },
  ];

  const handleEnroll = (index: number) => {
    setSelectedCourse(index);
    setVehicle(null);
  };

  const handleVehicleSelect = (v: string) => {
    setVehicle(v);
    setTimeout(() => {
      setModalData({ course: courses[selectedCourse!].title, vehicle: v });
      setIsModalOpen(true);
      setSelectedCourse(null);
      setVehicle(null);
    }, 500);
  };

  return (
    <section id="courses" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />
        
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-brand-accent font-bold tracking-widest uppercase text-sm">Specialized Programs</span>
              <h2 className="text-4xl md:text-6xl font-black mt-2">Tailored Courses</h2>
            </div>
            <p className="text-slate-400 max-w-md">
              Choose the program that best fits your goals. From basic learning to advanced trial success strategies.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] relative group hover:bg-white/10 transition-all duration-500 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {selectedCourse !== index ? (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="h-full flex flex-col"
                  >
                    <div className="bg-brand-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-8">
                      {course.icon}
                    </div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-1">{course.title}</h3>
                      <span className="text-brand-accent text-xs font-bold uppercase tracking-widest">{course.subtitle}</span>
                    </div>
                    <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                      {course.description}
                    </p>
                    <ul className="space-y-3 mb-10">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                          <ShieldCheck size={16} className="text-brand-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-auto">
                      <button 
                        onClick={() => handleEnroll(index)}
                        className="w-full py-4 rounded-2xl border border-white/20 text-sm font-bold hover:bg-brand-accent hover:border-brand-accent transition-all"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="vehicle-selection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <button 
                      onClick={() => setSelectedCourse(null)}
                      className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10"
                    >
                      Cancel
                    </button>
                    
                    <h4 className="text-xl font-bold mb-2">Choose Your Vehicle</h4>
                    <p className="text-slate-400 text-sm mb-8">Select which one you want to learn for {course.title}</p>
                    
                    <div className="grid grid-cols-1 w-full gap-3 relative z-20">
                      {vehicles.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => handleVehicleSelect(v.name)}
                          disabled={vehicle !== null}
                          className={`w-full group/btn p-4 rounded-2xl border flex items-center justify-between transition-all ${
                            vehicle === v.name 
                              ? 'bg-brand-accent border-brand-accent text-white' 
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-4 text-left">
                            <div className={`p-2 rounded-lg ${vehicle === v.name ? 'bg-white/20' : 'bg-brand-accent/10 text-brand-accent'}`}>
                              {v.icon}
                            </div>
                            <span className="font-bold">{v.name}</span>
                          </div>
                          {vehicle === v.name && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <CheckCircle2 size={20} />
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        course={modalData?.course || ''}
        vehicle={modalData?.vehicle || ''}
      />
    </section>
  );
}
