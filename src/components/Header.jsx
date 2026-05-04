import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Heart, 
  LogOut, 
  User, 
  Settings, 
  Share2, 
  ChevronDown,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

export default function Header({ user, onAuthClick, onLogout, onDashboardToggle, onNearbyClick }) {
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleShare = () => {
    const url = window.location.origin;
    if (navigator.share) {
      navigator.share({
        title: 'NOVELLY',
        text: 'Check out NOVELLY - The premier book discovery platform for India!',
        url: url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline" style={{fontFamily: "'Merriweather', serif"}}>
              NOVELLY
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
            <motion.span whileHover={{ scale: 1.05 }} className="inline-block">Browse</motion.span>
          </Link>
          <Link href="/my-library" className="text-foreground hover:text-primary transition-colors font-medium">
            <motion.span whileHover={{ scale: 1.05 }} className="inline-block">My Library</motion.span>
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
            <motion.span whileHover={{ scale: 1.05 }} className="inline-block">About</motion.span>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNearbyClick}
            className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Nearby Libraries
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            className="text-foreground hover:text-primary hover:bg-muted"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
          
          {user ? (
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="text-foreground hover:text-primary hover:bg-muted border-primary/20 gap-2"
              >
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </Button>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-56 glass border border-glass-border rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 space-y-1">
                      <div className="px-4 py-3 border-b border-glass-border mb-1">
                        <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      
                      <button 
                        onClick={() => { setLocation('/my-library'); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-left"
                      >
                        <Heart className="w-4 h-4" /> Wishlist
                      </button>
                      
                      <button 
                        onClick={() => { onDashboardToggle(); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-left"
                      >
                        <Settings className="w-4 h-4" /> Settings
                      </button>
                      
                      <button 
                        onClick={handleShare}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-left"
                      >
                        <Share2 className="w-4 h-4" /> Share Platform
                      </button>
                      
                      <div className="border-t border-glass-border my-1" />
                      
                      <button 
                        onClick={() => { onLogout(); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Button 
              size="sm" 
              onClick={onAuthClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:flex"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
