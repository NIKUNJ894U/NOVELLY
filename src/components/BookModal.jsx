import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ExternalLink, Clock, Phone, Navigation, ShoppingBag } from 'lucide-react';
import { LIBRARIES } from '../data/mockData';
import { useLibrary } from '../contexts/LibraryContext';
import { toast } from 'sonner';

const BookModal = ({ book, onClose }) => {
  const { addToRentals, addToPurchases } = useLibrary();
  const [activeTab, setActiveTab] = useState('rent');

  const handlePurchase = (retailer) => {
    addToPurchases(book);
    toast.success(`Recording purchase from ${retailer}. Redirecting...`);
  };

  const handleRent = (libName) => {
    addToRentals(book, libName);
    toast.success(`Book reserved at ${libName}!`);
  };
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [localLibraries, setLocalLibraries] = useState(LIBRARIES);
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  const handleLocate = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocalLibraries([
          {
            id: 101,
            name: "Premium Local Library",
            distance: "0.4 km",
            address: "Just around the corner",
            hours: "9:00 AM - 9:00 PM",
            phone: "+91 99999 00000",
            coords: { lat: latitude + 0.001, lng: longitude + 0.001 }
          },
          ...LIBRARIES
        ]);
        setLocating(false);
      },
      () => {
        alert("Unable to retrieve your location.");
        setLocating(false);
      }
    );
  };

  if (!book) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          className="relative glass w-full max-w-6xl h-[85vh] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-glass-border"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-glass p-2 rounded-full border border-glass-border hover:bg-glass-hover"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Book Cover & Basic Info */}
          <div className="md:w-2/5 p-8 flex flex-col items-center text-center bg-gradient-to-b from-transparent to-black/20">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl mb-6">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <h2 className="serif text-3xl mb-2">{book.title}</h2>
            <p className="text-text-secondary mb-4">{book.author}</p>
            <div className="flex gap-4 text-sm font-medium">
              <div className="glass px-3 py-1 rounded-full border border-glass-border">
                {book.genre}
              </div>
              <div className="glass px-3 py-1 rounded-full border border-glass-border">
                ISBN: {book.isbn}
              </div>
            </div>
          </div>

          {/* Right: Acquisition Pathways */}
          <div className="md:w-3/5 p-8 md:border-l border-glass-border overflow-y-auto">
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setActiveTab('rent')}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'rent' ? 'bg-accent text-white shadow-lg' : 'bg-glass border border-glass-border'}`}
              >
                <MapPin className="w-5 h-5" /> Rent from Library
              </button>
              <button 
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'buy' ? 'bg-accent text-white shadow-lg' : 'bg-glass border border-glass-border'}`}
              >
                <ShoppingBag className="w-5 h-5" /> Buy Book
              </button>
            </div>

            {activeTab === 'rent' ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-base text-text-secondary uppercase tracking-[0.2em] font-black">Nearby Libraries (India)</p>
                  {!userLocation && (
                    <button 
                      onClick={handleLocate}
                      disabled={locating}
                      className="text-sm text-accent font-bold underline flex items-center gap-2 hover:text-accent-light px-4 py-2 rounded-lg hover:bg-accent/10 transition-all"
                    >
                      {locating ? 'Searching...' : 'Use Precise Geolocation'}
                    </button>
                  )}
                </div>

                {selectedLibrary && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden rounded-3xl border border-accent/30 mb-8"
                  >
                    <iframe 
                      width="100%" 
                      height="300" 
                      style={{ border: 0 }} 
                      loading="lazy" 
                      allowFullScreen 
                      src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(selectedLibrary.name + ' ' + selectedLibrary.address)}`}
                    ></iframe>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 gap-6">
                  {localLibraries.map((lib) => (
                    <div 
                      key={lib.id} 
                      onClick={() => setSelectedLibrary(lib)}
                      className={`glass p-6 rounded-[2rem] border transition-all cursor-pointer group ${selectedLibrary?.id === lib.id ? 'border-accent bg-accent/5 ring-4 ring-accent/10' : 'border-glass-border hover:border-accent/40'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-black text-2xl mb-1">{lib.name}</h4>
                          <p className="text-base text-text-secondary flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent" /> {lib.distance} • {lib.address}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="bg-accent/20 text-accent px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest block mb-1">
                            In Stock
                          </span>
                          <span className="text-accent font-bold">₹{book.rentPrice}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 text-sm text-text-secondary mb-6">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-accent" /> {lib.hours}
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-accent" /> {lib.phone}
                        </div>
                      </div>
                      <div className="flex gap-3">
                         <button 
                           onClick={() => handleRent(lib.name)}
                           className="flex-[2] btn-primary py-4 text-sm uppercase tracking-widest font-black flex items-center justify-center gap-2"
                         >
                            Navigate Now <Navigation className="w-4 h-4" />
                         </button>
                        <button className="flex-1 btn-secondary py-4 text-sm font-bold">
                          Call Us
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-text-secondary uppercase tracking-widest font-bold mb-4">Available Retailers</p>
                <a 
                  href={book.purchaseLink || `https://amazon.in/s?k=${encodeURIComponent(book.title)}`} 
                  target="_blank" 
                  rel="noopener" 
                  onClick={() => handlePurchase('Amazon India')}
                  className="flex items-center justify-between glass p-5 rounded-2xl border border-glass-border hover:border-accent/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-orange-400">Am</div>
                    <div>
                      <h4 className="font-bold">Amazon India</h4>
                      <p className="text-sm text-text-secondary">Free Delivery for Prime</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">₹{book.price}</p>
                    <ExternalLink className="w-4 h-4 text-text-secondary inline ml-2" />
                  </div>
                </a>
                <a 
                  href={`https://flipkart.com/search?q=${encodeURIComponent(book.title)}`} 
                  target="_blank" 
                  rel="noopener" 
                  onClick={() => handlePurchase('Flipkart')}
                  className="flex items-center justify-between glass p-5 rounded-2xl border border-glass-border hover:border-accent/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-blue-400">Fl</div>
                    <div>
                      <h4 className="font-bold">Flipkart</h4>
                      <p className="text-sm text-text-secondary">Next Day Delivery Available</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">₹{book.price - 10}</p>
                    <ExternalLink className="w-4 h-4 text-text-secondary inline ml-2" />
                  </div>
                </a>
                <p className="text-[10px] text-text-secondary text-center mt-6 uppercase tracking-widest opacity-60">
                  * Prices may differ on the original product
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookModal;
