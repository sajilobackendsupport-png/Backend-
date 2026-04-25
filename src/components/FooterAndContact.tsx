import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, Car } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-brand-accent font-bold tracking-widest uppercase text-sm">Find Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-primary mt-2 mb-8">
              Visit Our Training Center
            </h2>
            <p className="text-slate-600 mb-12 text-lg">
              We are conveniently located in Kathmandu. Drop by for a free consultation or to see our training facilities in person.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-slate-100 p-4 rounded-2xl text-brand-primary shadow-sm h-fit">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-primary mb-1">Our Location</h4>
                  <p className="text-slate-600">Bramhakhel, Thuko Dhik, Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-slate-100 p-4 rounded-2xl text-brand-primary shadow-sm h-fit">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-primary mb-1">Phone Number</h4>
                  <p className="text-slate-600">+977 9851411945</p>
                  <p className="text-slate-600">+977 9713611355</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-slate-100 p-4 rounded-2xl text-brand-primary shadow-sm h-fit">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-primary mb-1">Opening Hours</h4>
                  <p className="text-slate-600">Sunday - Friday: 6:00 AM - 6:00 PM</p>
                  <p className="text-slate-600">Saturday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-brand-primary p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form 
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
                const interest = (form.elements.namedItem('interest') as HTMLSelectElement).value;
                const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                
                const body = `Name: ${name}%0D%0APhone: ${phone}%0D%0AInterest: ${interest}%0D%0AMessage: ${message}`;
                window.location.href = `mailto:passeasymotordrivingschool@gmail.com?subject=New Website Message from ${name}&body=${body}`;
                form.reset();
              }}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="text" 
                    name="phone"
                    required
                    placeholder="+977" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interest</label>
                <select name="interest" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors appearance-none">
                  <option className="bg-brand-primary">Light Vehicle Course</option>
                  <option className="bg-brand-primary">Bike/Scooter Course</option>
                  <option className="bg-brand-primary">Abroad Prep Course</option>
                  <option className="bg-brand-primary">Trial Guarantee</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={4} 
                  placeholder="How can we help you?" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-accent text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand-accent/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Pass Easy Logo" className="h-16 w-auto object-contain" />
              <span className="text-2xl font-black tracking-tight">PASS EASY</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              Simplifying driving education with professional instructors and modern training methods in Kathmandu. Your success is our primary goal.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-brand-accent transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-brand-accent transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-brand-accent transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#home" className="hover:text-brand-accent transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-brand-accent transition-colors">Services</a></li>
              <li><a href="#courses" className="hover:text-brand-accent transition-colors">Courses</a></li>
              <li><a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© 2026 Pass Easy Driving School. All rights reserved.</p>
          <div className="flex items-center gap-2">
            Designed with <span className="text-red-500">❤</span> for Kathmandu Drivers
          </div>
        </div>
      </div>
    </footer>
  );
}
