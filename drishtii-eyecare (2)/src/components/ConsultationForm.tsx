
import React, { useState } from 'react';
import { SHOP_DETAILS } from '../constants';

const ConsultationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    faceShape: '',
    budget: '',
    screenTime: '',
    brands: '',
    note: ''
  });

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.faceShape || !formData.budget || !formData.screenTime || !formData.brands) {
      alert('Please fill all required fields to generate your custom style report!');
      return;
    }
    
    const message = encodeURIComponent(
      `💎 *DRISHTII STYLE & BUDGET ANALYSIS* 💎\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone || 'N/A'}\n` +
      `*Face Shape:* ${formData.faceShape}\n` +
      `*Budget Range:* ${formData.budget}\n` +
      `*Screen Time:* ${formData.screenTime}\n` +
      `*Interest:* ${formData.brands}\n` +
      `*Clinical Note:* ${formData.note || 'None'}\n\n` +
      `I want to claim the ₹999 Grand Slam Offer based on this profile! Please suggest frames for Bethuadahari pickup.`
    );

    window.open(`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="consultation" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[45%] h-[45%] bg-yellow-500 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[45%] h-[45%] bg-orange-600 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-lg shadow-yellow-500/10">
              👓 FREE STYLE CONSULTATION
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">
              Perfect Frames <br />
              <span className="gold-gradient-text">Start Here</span>
            </h2>
            <h3 className="text-2xl font-bold text-slate-400 mb-8 uppercase tracking-widest italic">
              Face Shape + Budget Analysis
            </h3>
            <p className="text-xl text-slate-500 font-light leading-relaxed mb-12 max-w-xl">
              Tell us your face shape, budget & screen time. Get personalized Ray-Ban/Vogue recommendations + lens upgrade options in minutes.
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="luxury-glass p-8 md:p-12 rounded-[48px] shadow-2xl relative group border border-white/10 hover:border-yellow-500/30 transition-all duration-700">
              <form onSubmit={handleSendToWhatsApp} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Name *</label>
                    <input 
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-700 font-medium"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Phone Number</label>
                    <input 
                      type="tel"
                      placeholder="9876543210"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-700 font-medium"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Your Face Shape *</label>
                  <select 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all appearance-none font-medium"
                    value={formData.faceShape}
                    onChange={e => setFormData({...formData, faceShape: e.target.value})}
                  >
                    <option value="" className="bg-[#050505]">Oval / Round / Square / Heart?</option>
                    <option value="Oval" className="bg-[#050505]">Oval (Versatile)</option>
                    <option value="Round" className="bg-[#050505]">Round (Square/Rect best)</option>
                    <option value="Square" className="bg-[#050505]">Square (Round best)</option>
                    <option value="Heart" className="bg-[#050505]">Heart (Bottom heavy best)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Budget Range *</label>
                    <select 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all appearance-none font-medium"
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                    >
                      <option value="" className="bg-[#050505]">₹2K / ₹4K / ₹6K+?</option>
                      <option value="₹999 Bundle" className="bg-[#050505]">₹999 (Offer Bundle)</option>
                      <option value="₹2000-3000" className="bg-[#050505]">₹2K-3K (Premium)</option>
                      <option value="₹4000-6000" className="bg-[#050505]">₹4K-6K (Designer)</option>
                      <option value="₹10000+" className="bg-[#050505]">₹10K+ (Luxury)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Screen Exposure *</label>
                    <select 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all appearance-none font-medium"
                      value={formData.screenTime}
                      onChange={e => setFormData({...formData, screenTime: e.target.value})}
                    >
                      <option value="" className="bg-[#050505]">2hr / 6hr / 10hr+?</option>
                      <option value="Minimal" className="bg-[#050505]">2-4 hours</option>
                      <option value="Moderate" className="bg-[#050505]">5-8 hours (Blue-Cut)</option>
                      <option value="Heavy" className="bg-[#050505]">10+ hours (Professional)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Preferred Frames/Vibe *</label>
                  <select 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all appearance-none font-medium"
                    value={formData.brands}
                    onChange={e => setFormData({...formData, brands: e.target.value})}
                  >
                    <option value="" className="bg-[#050505]">Select your style...</option>
                    <option value="Minimalist Metal" className="bg-[#050505]">Minimalist Metal (Pro)</option>
                    <option value="Bold Acetate" className="bg-[#050505]">Bold Acetate (Fashion)</option>
                    <option value="Classic Ray-Ban Style" className="bg-[#050505]">Classic Aviator/Wayfarer</option>
                    <option value="Vogue Influencer Round" className="bg-[#050505]">Vogue Round (Influencer)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Power / Notes</label>
                  <textarea 
                    placeholder="E.g. I have -2.5 power and need blue-cut lenses..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all h-24 placeholder:text-slate-700 font-medium"
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black py-6 rounded-3xl font-black text-lg uppercase tracking-widest shadow-[0_15px_40px_rgba(255,165,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-4"
                >
                  <i className="fab fa-whatsapp text-2xl"></i>
                  Generate Style Report
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
