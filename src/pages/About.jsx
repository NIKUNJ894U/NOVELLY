import React from 'react';
import { BookOpen, MapPin, Users, Shield, Target, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl text-foreground leading-tight" style={{fontFamily: "'Merriweather', serif"}}>
              Elevating the <span className="text-primary">Reading Ecosystem</span> in India
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              BookVerse is India's premier book discovery and acquisition platform. We are on a mission to bridge the gap between digital discovery and physical reading by connecting millions of readers with nearby libraries and global retailers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story / Mission */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="serif text-5xl md:text-7xl font-bold mb-6">Our <span className="gradient-text">Story.</span></h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                In a world increasingly dominated by digital screens, we believe in the irreplaceable power of a physical book. NOVELLY was founded to make books more accessible, affordable, and community-driven for every reader in India.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold">Focused Discovery</h4>
                  <p className="text-sm text-muted-foreground">Tailored recommendations for the Indian audience.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold">Quality First</h4>
                  <p className="text-sm text-muted-foreground">Verified data from global book databases.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&q=80&w=800" 
                  alt="Library" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl border border-glass-border hidden md:block">
                <p className="text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground font-medium">Partner Libraries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-16 text-foreground" style={{fontFamily: "'Merriweather', serif"}}>Why Choose NOVELLY?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8 text-primary" />,
                title: "Nearby Library Integration",
                description: "Find and rent books from local libraries near you in real-time. Save money while supporting local communities."
              },
              {
                icon: <BookOpen className="w-8 h-8 text-primary" />,
                title: "Curated Discovery",
                description: "Browse 60+ hand-picked real titles with accurate data, genres, and ratings tailored to your reading preferences."
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Community Driven",
                description: "Join a growing community of readers. Track your library, manage wishlists, and share your favorite reads."
              }
            ].map((feature, i) => (
              <div key={i} className="glass p-8 rounded-[2.5rem] border border-glass-border hover:border-primary/30 transition-all text-center space-y-4">
                <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl text-foreground" style={{fontFamily: "'Merriweather', serif"}}>Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="flex gap-4 p-6 rounded-2xl bg-muted/20">
                <Shield className="w-10 h-10 text-primary shrink-0" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Transparency</h4>
                  <p className="text-muted-foreground text-sm">We provide clear, honest information about book availability and pricing across all platforms.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-2xl bg-muted/20">
                <Users className="w-10 h-10 text-primary shrink-0" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Accessibility</h4>
                  <p className="text-muted-foreground text-sm">Every reader in India deserves easy access to the world's best literature, regardless of their location.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Reused from Home) */}
      <footer className="bg-muted/50 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-lg text-foreground mb-3" style={{fontFamily: "'Merriweather', serif"}}>About NOVELLY</h4>
              <p className="text-sm">
                NOVELLY is a premium book rental and discovery platform designed for the modern reader.
              </p>
            </div>
            <div>
              <h4 className="text-lg text-foreground mb-3" style={{fontFamily: "'Merriweather', serif"}}>Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Browse Books</a></li>
                <li><a href="#" className="hover:text-primary transition">My Library</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 NOVELLY. Designed for the Indian Reading Community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
