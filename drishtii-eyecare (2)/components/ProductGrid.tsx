
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, SHOP_DETAILS } from '../constants';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTryOn = () => {
    if ((window as any).openTryOnWhatsApp) {
      (window as any).openTryOnWhatsApp(product.name);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-all duration-500 shadow-2xl flex flex-col shimmer-gold hover:scale-[1.02] cursor-pointer">
      {/* Luxury Category Badge */}
      <div className="absolute top-6 left-6 z-20">
        <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
          {product.category}
        </span>
      </div>

      {/* Wishlist Heart Icon */}
      <div className="absolute top-6 right-6 z-30">
        <button 
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-xl border ${
            isWishlisted 
            ? 'bg-red-500/20 border-red-500/50 text-red-500' 
            : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`}></i>
        </button>
      </div>

      {/* Bestseller Badge */}
      <div className="absolute top-[60px] left-6 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">
        <span className="bg-yellow-500 text-black text-[7px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-[0_5px_15px_rgba(234,179,8,0.4)]">
          <i className="fas fa-crown mr-1"></i> Bestseller
        </span>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 transition-transform duration-1000">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        
        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
           <button 
             onClick={(e) => { e.stopPropagation(); handleTryOn(); }}
             aria-label="Launch Virtual Try-On"
             className="bg-white text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:bg-yellow-500 transition-colors transform hover:scale-110 active:scale-95 duration-300"
           >
             <i className="fas fa-magic"></i>
           </button>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-black text-2xl text-white uppercase italic tracking-tighter font-display">{product.name}</h3>
            <p className="text-slate-500 text-[9px] mt-1 uppercase font-black tracking-widest">{product.shape} Geometry</p>
          </div>
          <div className="text-right">
             <span className="text-white font-black text-2xl font-display italic">₹{product.price}</span>
          </div>
        </div>
        
        <div className="mb-8">
          <motion.div 
            initial={false}
            animate={{ 
              height: isExpanded ? 'auto' : '48px',
              opacity: isExpanded ? 1 : 0.8
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.04, 0.62, 0.23, 0.98] 
            }}
            className="overflow-hidden"
          >
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {product.description} Crafted with precision engineering, these frames offer a weightless fit suitable for {product.sizes.join(' & ')} face profiles. 
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="block mt-4 pt-4 border-t border-white/5 space-y-3"
                  >
                    <span className="block font-black text-[9px] text-yellow-500 uppercase tracking-widest">Extended Specifications:</span>
                    <span className="block text-slate-300">
                      • Lens Tech: Ultra-HD Polycarbonate with UV400 Protection.<br/>
                      • Build: Impact-resistant {product.category} for extreme durability.<br/>
                      • Bridge Style: Comfort-curve ergonomic design.<br/>
                      • Professional Grade: Verified for all-day digital workspace usage.
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </p>
          </motion.div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            aria-expanded={isExpanded}
            className="text-yellow-500 text-[9px] font-black uppercase tracking-widest mt-2 hover:text-white transition-colors flex items-center gap-2 group"
          >
            {isExpanded ? 'Read Less' : 'Read More'} 
            <motion.i 
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="fas fa-chevron-down text-[7px]"
            ></motion.i>
          </button>
          
          <div className="flex gap-2 mt-6">
            {product.faceShapes.slice(0, 2).map(fs => (
              <span key={fs} className="text-[8px] font-black text-slate-500 border border-white/10 px-3 py-1 rounded-lg uppercase tracking-widest">{fs} Fit</span>
            ))}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); (window as any).openTryOnWhatsApp(product.name); }}
            className="bg-white text-black py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all transform active:scale-95"
          >
            Express Trial
          </button>
          <a
            href={`https://wa.me/${SHOP_DETAILS.whatsapp}?text=${encodeURIComponent(`Hi, I want to order ${product.name}`)}`}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest text-center hover:bg-white/10 transition-all transform active:scale-95"
          >
            Order Secure
          </a>
        </div>
      </div>
    </div>
  );
};

const ProductGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([499, 5000]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchCat && matchPrice;
    });
  }, [searchTerm, activeCategory, priceRange]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const val = parseInt(e.target.value);
    const newRange: [number, number] = [priceRange[0], priceRange[1]];
    newRange[index] = val;
    
    if (index === 0 && val > priceRange[1]) newRange[1] = val;
    if (index === 1 && val < priceRange[0]) newRange[0] = val;
    
    setPriceRange(newRange);
  };

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
           <h2 className="text-6xl font-black text-white mb-8 uppercase italic tracking-tighter font-display">
            Artisanal <span className="gold-gradient-text">Masterpieces</span>
           </h2>
           
           <div className="max-w-4xl mx-auto space-y-12">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search collection (e.g. Aviator, Round)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search collection"
                  className="w-full bg-white/5 border border-white/10 py-6 pl-14 pr-8 rounded-full text-white placeholder:text-slate-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all font-medium"
                />
                <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-yellow-500"></i>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-inner">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="text-left">
                    <h3 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-2 flex items-center gap-2">
                      <i className="fas fa-tags text-yellow-500"></i> Price Range Analysis
                    </h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Showing frames from ₹{priceRange[0]} — ₹{priceRange[1]}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-black">₹</span>
                       <input 
                        type="number" 
                        min="499" 
                        max="5000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        aria-label="Minimum price"
                        className="bg-black/40 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-xs font-black w-24 outline-none focus:border-yellow-500 transition-all"
                       />
                    </div>
                    <div className="h-[1px] w-4 bg-slate-700"></div>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-black">₹</span>
                       <input 
                        type="number" 
                        min="499" 
                        max="5000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        aria-label="Maximum price"
                        className="bg-black/40 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-xs font-black w-24 outline-none focus:border-yellow-500 transition-all"
                       />
                    </div>
                  </div>
                </div>

                <div className="px-4 relative h-10 flex items-center">
                   <div className="absolute left-0 right-0 h-1.5 bg-white/5 rounded-full"></div>
                   <div 
                     className="absolute h-1.5 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                     style={{ 
                       left: `${((priceRange[0] - 499) / (5000 - 499)) * 100}%`, 
                       right: `${100 - ((priceRange[1] - 499) / (5000 - 499)) * 100}%` 
                     }}
                   ></div>
                   
                   <input 
                     type="range" 
                     min="499" 
                     max="5000" 
                     value={priceRange[0]} 
                     onChange={(e) => handlePriceChange(e, 0)}
                     aria-label="Min price slider"
                     className="absolute w-full appearance-none bg-transparent pointer-events-none h-1 z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-yellow-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto"
                   />
                   <input 
                     type="range" 
                     min="499" 
                     max="5000" 
                     value={priceRange[1]} 
                     onChange={(e) => handlePriceChange(e, 1)}
                     aria-label="Max price slider"
                     className="absolute w-full appearance-none bg-transparent pointer-events-none h-1 z-20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-yellow-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto"
                   />
                </div>
              </div>
           </div>

           <div className="flex flex-wrap justify-center gap-4 mt-20">
              {['All', 'TR', 'Metal', 'Acetate', 'Premium', 'Sunglasses'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-8 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                    activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-slate-600 border-white/10 hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        <div className="mb-12 flex justify-between items-end border-b border-white/5 pb-6">
           <div>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Search Inventory</p>
              <h4 className="text-white font-black text-2xl uppercase italic tracking-tighter">
                {filteredProducts.length} <span className="text-slate-700">Masterpieces Found</span>
              </h4>
           </div>
           {searchTerm || activeCategory !== 'All' || priceRange[0] !== 499 || priceRange[1] !== 5000 ? (
             <button 
               onClick={() => {
                 setSearchTerm('');
                 setActiveCategory('All');
                 setPriceRange([499, 5000]);
               }}
               className="text-yellow-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
             >
               Clear All Filters
             </button>
           ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-32 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
               <i className="fas fa-search text-4xl text-slate-700 mb-6"></i>
               <h4 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">No Matches Found</h4>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Adjust your filters or try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
