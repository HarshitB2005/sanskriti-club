import React from 'react';

function Navbar({ activeTab, setActiveTab, onOpenLogin, isLoggedIn }) {
  const navItems = ['Home', 'Domains', 'Events', 'Performances', 'Secretariat'];

  if (isLoggedIn) {
    navItems.push('Admin');
  }

  return (
    <nav className="w-full bg-[#1e1e1e]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => setActiveTab('Home')}
      >
        <div className="w-8 h-8 rounded-full bg-[#ccff00] text-black font-black flex items-center justify-center text-sm">
          S
        </div>
        <span className="font-extrabold tracking-wider text-lg text-white">
          SANSKRITI <span className="text-[#ccff00]">CLUB</span>
        </span>
      </div>

      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
              activeTab === item 
                ? 'text-[#ccff00] border-b-2 border-[#ccff00] pb-1' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}

        {!isLoggedIn && (
          <button
            onClick={onOpenLogin}
            className="bg-[#ccff00]/10 border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
          >
            Core Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;