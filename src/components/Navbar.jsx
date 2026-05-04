import React, { useState, useEffect } from 'react';
import { Search, Book, User, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ onSearch, onAuthClick, toggleTheme, theme, user, onLogout, onDashboardToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-accent p-2 rounded-lg">
            <Book className="text-white w-6 h-6" />
          </div>
          <span className="serif text-2xl font-bold tracking-tight">NOVELLY</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#" className="hover:text-accent">Discover</a>
          <a href="#" className="hover:text-accent">Libraries</a>
          <a href="#" className="hover:text-accent">Community</a>
          {user && (
            <button onClick={onDashboardToggle} className="hover:text-accent">Dashboard</button>
          )}
        </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full glass border border-glass-border hover:border-accent text-text-primary"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search books..." 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-glass-hover border border-glass-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent w-64 text-text-primary placeholder:text-text-secondary"
              />
            </div>
            {user ? (
              <div className="flex items-center gap-3 rounded-full border border-glass-border bg-glass px-3 py-2">
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-white">{user.given_name?.charAt(0) || user.name?.charAt(0) || 'U'}</div>
                )}
                <div className="hidden lg:block text-sm text-text-primary">
                  <p className="font-semibold">{user.given_name || user.name}</p>
                  <button onClick={onLogout} className="text-xs text-text-secondary hover:text-accent">Sign Out</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="bg-glass p-2 rounded-full border border-glass-border hover:border-accent transition-all"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[5.5rem] left-0 right-0 glass border-t border-glass-border p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 z-50">
          <a href="#" onClick={() => setMobileMenuOpen(false)}>Discover</a>
          <a href="#" onClick={() => setMobileMenuOpen(false)}>Libraries</a>
          <a href="#" onClick={() => setMobileMenuOpen(false)}>Community</a>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search books..." 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-glass border border-glass-border rounded-full py-2 pl-10 pr-4 text-sm w-full"
              />
            </div>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (user) {
                  onDashboardToggle();
                } else {
                  onAuthClick();
                }
              }}
              className="btn-primary justify-center w-full"
            >
              {user ? 'Dashboard' : 'Sign In'}
            </button>
            {user && (
              <button onClick={() => { setMobileMenuOpen(false); onLogout(); }} className="btn-secondary justify-center w-full">
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
