import React from 'react';

const domainsList = [
  {
    title: 'Music & Band',
    tag: '#AcousticsAndRock',
    description: 'Vocalists, instrumentalists, and official university rock bands competing in inter-college battles.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600'
  },
  {
    title: 'Dance & Choreography',
    tag: '#RhythmAndBeats',
    description: 'Western hip-hop, classical fusion, and high-energy group dance performances.',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600'
  },
  {
    title: 'Fashion & Rampwalk',
    tag: '#CoutureAndVogue',
    description: 'Theatrical runway walks, themed couture presentations, and style showcases.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600'
  },
  {
    title: 'Theatre & Dramatics',
    tag: '#StageCraft',
    description: 'Nukkad Natak (street plays), stage dramas, and expressive mime performances.',
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600'
  }
];

function Domains() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#ccff00]">Cultural Domains</h2>
        <p className="text-gray-400 text-sm mt-1">Explore the core performing arts verticals of Sanskriti Club.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {domainsList.map((d, index) => (
          <div key={index} className="bg-[#1e1e1e] border border-white/10 rounded-xl overflow-hidden hover:border-[#ccff00]/50 transition group">
            <div className="h-44 overflow-hidden relative">
              <img src={d.image} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <span className="absolute bottom-2 left-2 bg-black/70 text-[#ccff00] text-[10px] font-bold px-2 py-1 rounded border border-[#ccff00]/30">
                {d.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-white mb-2">{d.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{d.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Domains;