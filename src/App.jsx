import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LibraryProvider } from "./contexts/LibraryContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import MyLibrary from "./pages/MyLibrary";
import About from "./pages/About";
import AuthModal from './components/AuthModal';
import LocationMap from './components/LocationMap';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { X } from "lucide-react";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [locationState, setLocationState] = useState(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [, setLocation] = useLocation();

  const [locationPath] = useLocation();

  // Close map on navigation
  useEffect(() => {
    setShowMap(false);
  }, [locationPath]);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('novelly_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('novelly_user', JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('novelly_user');
    setIsDashboardOpen(false);
  };

  const handleLocationUpdate = (state) => {
    setLocationState(state);
  };

  const handleToggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  const handleToggleMap = () => {
    setShowMap(!showMap);
    // Scroll to top to see the map if opening
    if (!showMap) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider switchable={true}>
      <LibraryProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            
            <Header 
              user={user} 
              onAuthClick={() => setIsAuthOpen(true)} 
              onLogout={handleLogout} 
              onNearbyClick={handleToggleMap}
              onDashboardToggle={handleToggleDashboard}
            />

            {showMap && (
              <div className="container mx-auto px-4 py-8 animate-in slide-in-from-top-4 duration-500">
                <div className="glass rounded-[2.5rem] border border-glass-border overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-glass-border flex justify-between items-center bg-muted/30">
                    <div>
                      <h2 className="text-2xl font-bold serif">Nearby Libraries</h2>
                      <p className="text-sm text-text-secondary">Discover reading hubs around your current location</p>
                    </div>
                    <button onClick={handleToggleMap} className="text-text-secondary hover:text-foreground">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="h-[500px]">
                    <LocationMap onLocationUpdate={handleLocationUpdate} />
                  </div>
                </div>
              </div>
            )}

            <main className="transition-all duration-200">
              <Switch>
                <Route path="/">
                  <Home 
                    user={user} 
                    onAuthClick={() => setIsAuthOpen(true)} 
                    onLogout={handleLogout}
                    onDashboardToggle={handleToggleDashboard}
                    locationState={locationState}
                    onNearbyClick={handleToggleMap}
                  />
                </Route>
                <Route path="/book/:id">
                  {(params) => (
                    <BookDetail 
                      id={params.id} 
                      user={user} 
                      onAuthClick={() => setIsAuthOpen(true)}
                      onLogout={handleLogout}
                      onDashboardToggle={handleToggleDashboard}
                      onNearbyClick={handleToggleMap}
                    />
                  )}
                </Route>
                <Route path="/my-library">
                  <MyLibrary 
                    user={user} 
                    onAuthClick={() => setIsAuthOpen(true)} 
                    onLogout={handleLogout}
                    onDashboardToggle={handleToggleDashboard}
                    onNearbyClick={handleToggleMap}
                  />
                </Route>
                <Route path="/about">
                  <About 
                    user={user} 
                    onAuthClick={() => setIsAuthOpen(true)} 
                    onLogout={handleLogout}
                    onDashboardToggle={handleToggleDashboard}
                    onNearbyClick={handleToggleMap}
                  />
                </Route>
              </Switch>
            </main>

            <AuthModal 
              isOpen={isAuthOpen} 
              onClose={() => setIsAuthOpen(false)} 
              onLoginSuccess={handleLogin}
            />

            <Dashboard 
              isOpen={isDashboardOpen} 
              onClose={() => setIsDashboardOpen(false)}
              user={user}
              onLogout={handleLogout}
              locationState={locationState}
            />
            
            <Toaster position="bottom-right" />
          </div>
        </TooltipProvider>
      </LibraryProvider>
    </ThemeProvider>
  );
}

export default App;
