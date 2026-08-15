import React, { useState } from 'react';

function Portfolio({ items = [] }) {
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.performanceType === filter);

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#ccff00]">Student Showcases</h2>
          <p className="text-gray-400 text-sm mt-1">Watch video highlights of performances across university events.</p>
        </div>

        <div className="flex gap-2">
          {['All', 'Band', 'Dance', 'Rampwalk'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md border transition cursor-pointer ${
                filter === cat
                  ? 'bg-[#ccff00] text-black border-[#ccff00]'
                  : 'bg-[#1e1e1e] text-gray-400 border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div key={item._id || item.id || index} className="bg-[#1e1e1e] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-full h-44 bg-black rounded-lg overflow-hidden mb-4 border border-white/5">
                <iframe
                  className="w-full h-full"
                  src={item.videoUrl}
                  title={item.studentName}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <span className="text-[10px] font-bold text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded uppercase">
                {item.tag || `#${item.performanceType}`}
              </span>
              <h4 className="font-bold text-lg text-white mt-2">{item.studentName}</h4>
              <p className="text-xs text-gray-400 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;