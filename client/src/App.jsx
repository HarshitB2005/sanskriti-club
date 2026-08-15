import React, { useState } from 'react';
import Admin from './Admin';

// Default initial data fallbacks in case dynamic database fetch is empty
const DEFAULT_MEMBERS = [
  { _id: '1', name: 'Aarav Sharma', role: 'President', domain: 'Secretariat Core', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { _id: '2', name: 'Ananya Verma', role: 'Vice President', domain: 'Secretariat Core', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { _id: '3', name: 'Rohan Gupta', role: 'Music Lead', domain: 'Band & Music', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
  { _id: '4', name: 'Ishita Kapoor', role: 'Dance Lead', domain: 'Dance Club', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' }
];

const DEFAULT_EVENTS = [
  { _id: '1', title: 'Lamhe 2026 - Annual Cultural Fest', date: 'Oct 24, 2026', category: 'Upcoming', summaryReport: 'The flagship annual fest of IMS Unison University bringing together music, fashion, and dance performance stages across 3 days.' },
  { _id: '2', title: 'Sanskritik Sandhya 2025', date: 'Nov 12, 2025', category: 'Past', summaryReport: 'A grand evening dedicated to classical vocal performances, dynamic street dance showcases, and live acoustics.' }
];

const DEFAULT_PORTFOLIO = [
  { _id: '1', studentName: 'Sanskriti Rock Symphony', performanceType: 'Band', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', tag: '#BandPerformances', description: 'Live fusion band performance at the main university campus amphitheater.' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [members, setMembers] = useState(DEFAULT_MEMBERS);
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [portfolio, setPortfolio] = useState(DEFAULT_PORTFOLIO);
  const [eventFilter, setEventFilter] = useState('All');

  // Authentication State Variables
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Defined navigation items in proper Title Case
  const navTabs = ['Home', 'Domains', 'Events', 'Performances', 'Secretariat'];

  // Domain wings with featured category showcase photos
  const domainWings = [
    { 
      id: '01', 
      title: 'Band & Music Wing', 
      tag: 'Acoustics & Vocals', 
      desc: 'Vocalists, instrumentalists, solo artists, and official university band performances.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80'
    },
    { 
      id: '02', 
      title: 'Dance Club', 
      tag: 'Choreography & Beats', 
      desc: 'Hip-hop, classical, contemporary, and group dance showcase teams.',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80'
    },
    { 
      id: '03', 
      title: 'Fashion & Rampwalk', 
      tag: 'Runway & Styling', 
      desc: 'Theatrical fashion design, runway walk choreography, and theme styling.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    },
    { 
      id: '04', 
      title: 'Media & Anchoring', 
      tag: 'Stage Hosting & PR', 
      desc: 'Official event anchors, stage hosts, social media managers, and digital content creators.',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const filteredEvents = eventFilter === 'All' 
    ? events 
    : events.filter(e => e.category.toLowerCase() === eventFilter.toLowerCase());

  // Authentication Handlers
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'sanskriti2026') {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setPasscode('');
      setLoginError('');
      setActiveTab('Admin');
    } else {
      setLoginError('Invalid Secretariat Passcode');
    }
  };

  const handleCoreLoginClick = () => {
    if (isAuthenticated) {
      if (activeTab === 'Admin') {
        setActiveTab('Home');
      } else {
        setActiveTab('Admin');
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('Home');
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white relative font-sans selection:bg-[#ccff00] selection:text-black overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="orb-glow-yellow top-10 left-5"></div>
      <div className="orb-glow-cyan top-1/2 right-5"></div>

      {/* Xstar Style Neon Arrow Accent (Bottom Left) */}
      <div className="hidden lg:block fixed bottom-12 left-8 w-36 h-36 border-b-2 border-l-2 border-[#ccff00]/40 -rotate-45 pointer-events-none z-0">
        <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#ccff00] shadow-[0_0_10px_#ccff00]"></div>
      </div>

      {/* Floating Mini Dark Cube Accent (Left Side) */}
      <div className="hidden lg:block fixed top-1/3 left-10 w-16 h-16 bg-gradient-to-br from-gray-700/40 to-black/90 rounded-lg -rotate-12 border border-white/10 shadow-2xl pointer-events-none z-0 animate-pulse"></div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#07080a]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('Home')}>
          <div className="w-10 h-10 rounded-xl bg-[#ccff00] text-black font-black flex items-center justify-center text-xl shadow-[0_0_15px_rgba(204,255,0,0.4)]">
            S
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white block leading-none">
              SANSKRITI <span className="text-[#ccff00]">CLUB</span>
            </span>
            <span className="text-[9px] text-gray-400 tracking-widest uppercase font-bold">IMS Unison University</span>
          </div>
        </div>

        {/* Title Case Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3 bg-[#14161c]/80 border border-white/10 p-1.5 rounded-full backdrop-blur-md">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 text-xs font-extrabold rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Authentication Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCoreLoginClick}
            className="bg-[#ccff00] text-black font-extrabold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition cursor-pointer"
          >
            {isAuthenticated ? (activeTab === 'Admin' ? 'VIEW SITE' : 'CMS PANEL') : 'CORE LOGIN'}
          </button>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500/20 text-red-400 border border-red-500/40 font-bold px-3 py-2.5 rounded-lg text-xs uppercase hover:bg-red-500 hover:text-white transition cursor-pointer"
            >
              LOGOUT
            </button>
          )}
        </div>
      </header>

      {/* Mobile Navigation Strip */}
      <div className="lg:hidden flex overflow-x-auto bg-[#14161c] border-b border-white/10 px-4 py-3 gap-2 scrollbar-none">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                isActive ? 'bg-[#ccff00] text-black' : 'text-gray-300 bg-white/5'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* CORE LOGIN AUTHENTICATION MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="xstar-card p-8 rounded-2xl max-w-md w-full border border-[#ccff00]/30 shadow-[0_0_40px_rgba(204,255,0,0.2)] relative">
            <button 
              onClick={() => { setShowLoginModal(false); setLoginError(''); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#ccff00] text-black font-black flex items-center justify-center text-base">
                S
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-white">SECRETARIAT AUTHENTICATION</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Core Team Portal Access</p>
              </div>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">
                  Secretariat Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter access code..."
                  required
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccff00] transition font-mono"
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-400 font-semibold">{loginError}</p>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="w-full bg-[#ccff00] text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-white transition shadow-[0_0_15px_rgba(204,255,0,0.4)] cursor-pointer"
                >
                  VERIFY & ACCESS
                </button>
              </div>

              <p className="text-[10px] text-gray-500 text-center pt-2">
                Default Access Key: <span className="font-mono text-[#ccff00]">sanskriti2026</span>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* MAIN CONTENT CONTAINERS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 relative z-10">

        {/* SECTION: HOME */}
        {activeTab === 'Home' && (
          <div className="space-y-24">
            {/* Hero Banner */}
            <div className="grid lg:grid-cols-12 gap-12 items-center pt-8 pb-12">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-mono font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
                  IMS UNISON UNIVERSITY, DEHRADUN
                </div>
                
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight text-white">
                  NEXT GENERATION <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#00f0ff] to-white">
                    CULTURAL SECRETARIAT
                  </span>
                </h1>
                
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
                  Culture, passion, and stage excellence. Explore official cultural fests, past event archives, talent showcases, and the Secretariat team roster.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab('Events')}
                    className="bg-[#ccff00] text-black font-extrabold px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(204,255,0,0.4)] transition cursor-pointer"
                  >
                    EXPLORE EVENTS ↗
                  </button>
                  <button
                    onClick={() => setActiveTab('Performances')}
                    className="xstar-card px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold text-white hover:text-[#ccff00] transition cursor-pointer"
                  >
                    WATCH SHOWCASES
                  </button>
                </div>
              </div>

              {/* Hero Showcase Frame */}
              <div className="lg:col-span-5">
                <div className="xstar-card p-4 rounded-2xl relative group">
                  <div className="aspect-video-container overflow-hidden rounded-xl border border-white/10 bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Sanskriti Official Teaser"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-4 flex items-center justify-between px-2">
                    <div>
                      <p className="text-xs font-bold text-white">Sanskriti Flagship Teaser</p>
                      <p className="text-[10px] text-gray-400">IMS Unison University Auditorium</p>
                    </div>
                    <span className="text-xs font-mono text-[#ccff00] font-bold">2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Active Domains', val: '04 Wings' },
                { label: 'Annual Fests', val: '10+ Events' },
                { label: 'Performers Managed', val: '250+ Talent' },
                { label: 'Campus Reach', val: '1k+ Audience' }
              ].map((m, idx) => (
                <div key={idx} className="xstar-card p-6 rounded-xl text-center">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#ccff00] mb-1 font-mono">{m.val}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: DOMAINS WITH SHOWCASE IMAGES */}
        {activeTab === 'Domains' && (
          <div className="space-y-10">
            <div>
              <p className="text-[#ccff00] font-mono text-xs font-bold uppercase tracking-widest">WHAT WE OFFER</p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">CULTURAL DOMAIN WINGS</h2>
              <p className="text-gray-400 text-xs mt-2">Core creative categories empowering student expression at IMS Unison University.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {domainWings.map((wing) => (
                <div key={wing.id} className="xstar-card rounded-2xl overflow-hidden group border border-white/10 transition duration-300">
                  {/* Category Image Header */}
                  <div className="h-48 w-full overflow-hidden relative">
                    <img 
                      src={wing.image} 
                      alt={wing.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/40 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[#ccff00] font-mono font-extrabold text-lg drop-shadow">{wing.id} //</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-black/60 border border-white/20 text-gray-200 backdrop-blur-md">
                        {wing.tag}
                      </span>
                    </div>
                  </div>

                  {/* Category Content Body */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#ccff00] transition">{wing.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{wing.desc}</p>
                    <button 
                      onClick={() => setActiveTab('Secretariat')}
                      className="pt-2 text-xs font-bold text-[#ccff00] uppercase tracking-wider flex items-center gap-2 hover:translate-x-1 transition cursor-pointer"
                    >
                      View Domain Team ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: EVENTS & REPORTS */}
        {activeTab === 'Events' && (
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-[#ccff00] font-mono text-xs font-bold uppercase tracking-widest">CHRONICLES & CALENDAR</p>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">EVENTS & REPORTS</h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex bg-[#14161c] border border-white/10 p-1 rounded-xl">
                {['All', 'Upcoming', 'Past'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setEventFilter(cat)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
                      eventFilter === cat ? 'bg-[#ccff00] text-black shadow-[0_0_10px_#ccff00]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredEvents.map((evt) => (
                <div key={evt._id} className="xstar-card p-6 sm:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full ${
                      evt.category === 'Upcoming' ? 'bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/40' : 'bg-white/10 text-gray-300'
                    }`}>
                      {evt.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400">{evt.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{evt.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{evt.summaryReport}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: VIDEO PORTFOLIO */}
        {activeTab === 'Performances' && (
          <div className="space-y-10">
            <div>
              <p className="text-[#ccff00] font-mono text-xs font-bold uppercase tracking-widest">SHOWCASE GALLERY</p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">PERFORMANCE VIDEOS</h2>
              <p className="text-gray-400 text-xs mt-2">Curated video recordings of student performances across wings.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {portfolio.map((item) => (
                <div key={item._id} className="xstar-card p-4 rounded-2xl space-y-4">
                  <div className="aspect-video-container overflow-hidden rounded-xl border border-white/10">
                    <iframe
                      src={item.videoUrl}
                      title={item.studentName}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{item.studentName}</h3>
                      <span className="text-[10px] font-mono text-[#ccff00] font-bold bg-[#ccff00]/10 px-2.5 py-1 rounded border border-[#ccff00]/30">
                        {item.tag || `#${item.performanceType}`}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: SECRETARIAT TEAM */}
        {activeTab === 'Secretariat' && (
          <div className="space-y-10">
            <div>
              <p className="text-[#ccff00] font-mono text-xs font-bold uppercase tracking-widest">OUR EXPERTS</p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">MEET THE SECRETARIAT</h2>
              <p className="text-gray-400 text-xs mt-2">The student leaders driving cultural excellence at IMS Unison University.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((m) => (
                <div key={m._id} className="xstar-card rounded-2xl overflow-hidden group">
                  <div className="h-72 overflow-hidden relative bg-black/40">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                    />
                    
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                      <a 
                        href={m.instagram || "https://instagram.com"} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-10 h-10 rounded-full bg-[#ccff00] text-black font-extrabold flex items-center justify-center text-xs hover:scale-110 shadow-[0_0_15px_#ccff00] transition"
                        title="Instagram"
                      >
                        IG
                      </a>
                      <a 
                        href={m.linkedin || "https://linkedin.com"} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-10 h-10 rounded-full bg-[#ccff00] text-black font-extrabold flex items-center justify-center text-xs hover:scale-110 shadow-[0_0_15px_#ccff00] transition"
                        title="LinkedIn"
                      >
                        IN
                      </a>
                    </div>
                  </div>

                  <div className="p-5 border-t border-white/10 bg-[#14161c]">
                    <span className="text-[10px] font-mono text-[#ccff00] font-bold uppercase tracking-wider block">
                      {m.role}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{m.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{m.domain}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: ADMIN CMS PORTAL */}
        {activeTab === 'Admin' && isAuthenticated && (
          <div className="pt-4">
            <Admin
              members={members}
              setMembers={setMembers}
              events={events}
              setEvents={setEvents}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
            />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 mt-20 py-10 bg-[#07080a]/90 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#ccff00] text-black font-bold flex items-center justify-center text-[10px]">S</div>
            <span className="font-bold text-white">SANSKRITI CULTURAL CLUB</span>
          </div>
          <p>© 2026 Sanskriti Secretariat • IMS Unison University, Dehradun</p>
        </div>
      </footer>
    </div>
  );
}