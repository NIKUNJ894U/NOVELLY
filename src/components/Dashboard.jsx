import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, UserCircle2, Clock3, Trash2, X } from 'lucide-react';

const Dashboard = ({ isOpen, onClose, user, locationState, onClearSaved, onLogout }) => {
  if (!isOpen) return null;

  const { coords, libraries = [], nearestLibrary, status, savedAt } = locationState || {};
  const savedTime = savedAt ? new Date(savedAt).toLocaleString() : 'Not saved yet';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative glass w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] border border-glass-border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 bg-glass p-3 rounded-full border border-glass-border hover:bg-glass-hover hover:border-accent transition-all z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-10">
              <div>
                <span className="text-accent uppercase tracking-[0.35em] text-xs font-bold">User Dashboard</span>
                <h2 className="text-4xl serif mt-4">Welcome, {user?.given_name || user?.name || 'Reader'}.</h2>
                <p className="text-text-secondary max-w-2xl mt-4">
                  Manage your account settings, saved locations, and view your recent activity.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClearSaved}
                  className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-5 py-3 text-sm font-semibold text-white hover:border-accent transition-all"
                >
                  <Trash2 className="w-4 h-4" /> Clear Cache
                </button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="glass rounded-[2rem] border border-glass-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <UserCircle2 className="w-5 h-5 text-accent" />
                  <span className="uppercase text-xs tracking-[0.3em] text-accent font-bold">Profile</span>
                </div>
                <p className="font-semibold text-xl truncate">{user?.name || 'Guest Reader'}</p>
                <p className="text-text-secondary text-sm mt-2 truncate">{user?.email || 'Not signed in'}</p>
              </div>

              <div className="glass rounded-[2rem] border border-glass-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="uppercase text-xs tracking-[0.3em] text-accent font-bold">Saved Location</span>
                </div>
                <p className="text-sm text-text-secondary mb-4">Status: <span className="text-white font-semibold">{status === 'ready' ? 'Live' : 'No Data'}</span></p>
                {coords ? (
                  <p className="text-sm">Active Coordinates: <span className="font-semibold">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span></p>
                ) : (
                  <p className="text-text-secondary text-sm">No saved coordinates.</p>
                )}
              </div>

              <div className="glass rounded-[2rem] border border-glass-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock3 className="w-5 h-5 text-accent" />
                  <span className="uppercase text-xs tracking-[0.3em] text-accent font-bold">Last Sync</span>
                </div>
                <p className="text-sm text-text-secondary">{savedTime}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="glass rounded-[2rem] border border-glass-border p-8">
                <h3 className="text-2xl serif mb-6">Nearest Library</h3>
                {nearestLibrary ? (
                  <div className="space-y-4">
                    <p className="font-bold text-xl text-primary">{nearestLibrary.name}</p>
                    <p className="text-text-secondary">{nearestLibrary.address}</p>
                    <div className="pt-4 flex items-center gap-2">
                      <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest">
                        {nearestLibrary.distance} KM AWAY
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-text-secondary italic">Use the "Nearby Libraries" tool to find your closest reading hub.</p>
                )}
              </div>

              <div className="glass rounded-[2rem] border border-glass-border p-8">
                <h3 className="text-2xl serif mb-6">Recent Searches</h3>
                <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                  {libraries.length > 0 ? libraries.slice(0, 3).map((library) => (
                    <div key={library.id} className="rounded-2xl border border-glass-border p-4 bg-black/20">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-sm">{library.name}</p>
                        <span className="text-accent text-xs font-bold">{library.distance} KM</span>
                      </div>
                    </div>
                  )) : (
                    <p className="text-text-secondary italic text-sm">No recent library searches found.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-glass-border flex justify-end">
               <button 
                onClick={onLogout}
                className="text-destructive hover:text-destructive/80 font-bold text-sm uppercase tracking-widest"
               >
                 Sign Out from Account
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Dashboard;
