
import React, { useState, useEffect, useRef } from 'react';
import { SHOP_DETAILS } from '../constants';

const AICallingAgent: React.FC = () => {
  const [step, setStep] = useState<'idle' | 'calling' | 'connected' | 'done'>('idle');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const scriptStages = [
    { title: "Initiation", bengali: "নমস্কার! আমি দৃষ্টি আইকেয়ার থেকে Grace বলছি। আমি কি আপনার সাথে কথা বলছি?", english: "Namaskar! This is Grace from Drishtii Eyecare. Am I speaking with you?" },
    { title: "Symptom Check", bengali: "আপনার কি স্ক্রিন ব্যবহারের জন্য চোখে চাপ বা ঝাপসা দেখার সমস্যা হচ্ছে?", english: "Are you experiencing any eye strain or blurry vision due to screen use?" },
    { title: "Special Offer", bengali: "আমাদের বেথুয়াডহরিতে এখন ₹৯৯৯ এর বিশেষ কমপ্লিট প্যাকেজ অফার চলছে।", english: "We currently have a special ₹999 complete package offer in Bethuadahari." },
    { title: "Scheduling", bengali: "আমি কি আপনার জন্য কাল বিকেলের একটি স্লট বুক করে দেব?", english: "Should I book an afternoon slot for you tomorrow?" },
    { title: "Conclusion", bengali: "ধন্যবাদ! আমি অ্যাপয়েন্টমেন্টের বিস্তারিত আপনার হোয়াটসঅ্যাপে এখনই পাঠিয়ে দিচ্ছি।", english: "Thank you! I am sending the appointment details to your WhatsApp right now." }
  ];

  useEffect(() => {
    let interval: any;
    if (step === 'connected') {
      interval = setInterval(() => {
        setCurrentScriptIndex(prev => {
          if (prev < scriptStages.length - 1) return prev + 1;
          setStep('done');
          return prev;
        });
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [currentScriptIndex]);

  const initiateCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setStep('calling');
    setTimeout(() => setStep('connected'), 3000);
  };

  const handleWhatsAppHandoff = () => {
    const message = encodeURIComponent(`Hi Grace! 🤖 I just spoke with the AI Concierge on the website. I am ${userName || 'a guest'} and I am interested in the ₹999 grand slam offer for my number ${phoneNumber}. Please confirm my slot for Dr. Suman Talapatra!`);
    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="ai-voice" className="py-24 bg-[#050505] relative overflow-hidden scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="luxury-glass rounded-[48px] p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden group">
          
          {/* Animated Background Audio Waves */}
          {step === 'connected' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="flex gap-2">
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 bg-blue-500 rounded-full animate-wave"
                    style={{ 
                      height: '40px', 
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${0.5 + Math.random()}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-8">
                <span className={`w-2 h-2 rounded-full ${step === 'idle' ? 'bg-slate-500' : 'bg-green-500 animate-pulse'}`}></span>
                Grace AI Voice Concierge 2.5
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight">
                Request an <br />
                <span className="gold-gradient-text">AI Guidance Call</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
                Our "Grace" AI will call you instantly to discuss your symptoms, explain the ₹999 offer, and book your priority slot in Bengali or English.
              </p>

              {step === 'idle' && (
                <form onSubmit={initiateCall} className="space-y-4 animate-in fade-in duration-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-yellow-500 outline-none transition-all placeholder:text-slate-600 font-medium"
                    />
                    <input 
                      type="tel" 
                      placeholder="WhatsApp Number" 
                      required
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-yellow-500 outline-none transition-all placeholder:text-slate-600 font-medium"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-4 group active:scale-95"
                  >
                    <i className="fas fa-phone-alt group-hover:rotate-12 transition-transform"></i>
                    Initiate Grace AI Call
                  </button>
                </form>
              )}

              {(step === 'calling' || step === 'connected' || step === 'done') && (
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                       <div className={`w-14 h-14 rounded-full flex items-center justify-center ${step === 'connected' ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-blue-500 text-white animate-pulse'}`}>
                         <i className={`fas ${step === 'done' ? 'fa-check' : 'fa-phone-volume'}`}></i>
                       </div>
                       <div>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{step === 'calling' ? 'Ringing...' : step === 'done' ? 'Call Ended' : 'Live: AI Voice Stream'}</p>
                         <h4 className="text-white font-black uppercase italic tracking-wider">{phoneNumber}</h4>
                       </div>
                    </div>
                    {step === 'connected' && (
                      <div className="bg-red-500/20 text-red-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse border border-red-500/20">
                        Active Call
                      </div>
                    )}
                  </div>

                  <div ref={transcriptRef} className="min-h-[160px] max-h-[200px] overflow-y-auto pr-4 scroll-smooth no-scrollbar">
                    <p className="text-yellow-500 font-black uppercase tracking-[0.2em] text-[10px] mb-4 flex items-center gap-2">
                       <i className="fas fa-comment-dots"></i> Transcript: {scriptStages[currentScriptIndex].title}
                    </p>
                    <div className="space-y-6">
                      <p className="text-white text-xl font-bold italic leading-relaxed animate-in fade-in duration-500">
                        "{scriptStages[currentScriptIndex].bengali}"
                      </p>
                      <p className="text-slate-500 text-sm italic font-medium">
                        "{scriptStages[currentScriptIndex].english}"
                      </p>
                    </div>
                  </div>

                  {step === 'done' && (
                    <div className="mt-10 space-y-4">
                      <button 
                        onClick={handleWhatsAppHandoff}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-4"
                      >
                        <i className="fab fa-whatsapp text-xl"></i> Secure Appointment Details
                      </button>
                      <button 
                        onClick={() => { setStep('idle'); setCurrentScriptIndex(0); }}
                        className="w-full border border-white/10 text-slate-400 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors"
                      >
                        Restart Voice Consultation
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
               <div className="luxury-glass p-8 md:p-12 rounded-[48px] border border-white/5 bg-gradient-to-br from-blue-900/10 to-transparent">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-10">The Grace AI Protocol</h4>
                  <ul className="space-y-8">
                    {[
                      { i: '1', t: 'Voice Synthesis', d: 'Uses real-time neural Bengali/English voice to guide your selection.' },
                      { i: '2', t: 'Symptom Mapping', d: 'Grace identifies common dry-eye and refractive issues through conversational cues.' },
                      { i: '3', t: 'Direct Booking', d: 'Automatically syncs your preferred time with Dr. Suman Talapatra\'s schedule.' }
                    ].map(item => (
                      <li key={item.i} className="flex gap-6 group">
                        <span className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-white group-hover:border-blue-500 group-hover:text-blue-500 transition-all shrink-0">{item.i}</span>
                        <div>
                          <p className="text-white font-black uppercase italic tracking-tighter mb-2 text-lg">{item.t}</p>
                          <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-6 opacity-40">
                     <div className="flex -space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-black border-2 border-black">G</div>
                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-[10px] font-black border-2 border-black">D</div>
                     </div>
                     <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Trusted by Bethuadahari's Professionals</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2.5); }
        }
        .animate-wave {
          animation: wave ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default AICallingAgent;
