import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="relative glass w-full max-w-xl p-12 rounded-[3rem] border border-glass-border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] text-center overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-accent/20 blur-[80px] rounded-full" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 bg-glass p-3 rounded-full border border-glass-border hover:bg-glass-hover hover:border-accent transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10">
            <h2 className="serif text-5xl mb-4">Elevate Your <br /><span className="gradient-text">Reading.</span></h2>
            <p className="text-text-secondary text-lg mb-12 px-4">Join the NOVELLY ecosystem to track rentals, earn rewards, and discover your next obsession.</p>

            <div className="space-y-6">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const profile = credentialResponse?.credential ? decodeJwt(credentialResponse.credential) : null;
                    if (profile) {
                      onLoginSuccess?.(profile);
                    }
                    onClose();
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  useOneTap
                  theme="filled_black"
                  shape="pill"
                  width="100%"
                />
              </div>
              
              <div className="flex items-center gap-4 text-text-secondary py-2">
                <div className="flex-1 h-px bg-glass-border"></div>
                <span className="text-xs uppercase tracking-widest font-bold">or use email</span>
                <div className="flex-1 h-px bg-glass-border"></div>
              </div>

              <button 
                onClick={() => {
                  onLoginSuccess?.({
                    name: "Guest User",
                    email: "guest@example.com",
                    picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
                    given_name: "Guest"
                  });
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-4 bg-primary/10 border border-primary/20 text-primary py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary/20 transition-all"
              >
                Continue as Guest
              </button>
            </div>

            <p className="mt-12 text-xs text-text-secondary leading-relaxed">
              By continuing, you become part of the NOVELLY community <br />
              and agree to our <span className="text-accent underline">Terms</span> and <span className="text-accent underline">Privacy Policy</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
