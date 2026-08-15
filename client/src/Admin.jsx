import React, { useState } from 'react';

export default function Admin({
  members,
  setMembers,
  events,
  setEvents,
  portfolio,
  setPortfolio
}) {
  const [activeTab, setActiveTab] = useState('members');
  const [uploading, setUploading] = useState(false);

  // Form States
  const [memberForm, setMemberForm] = useState({
    name: '',
    role: '',
    domain: 'Band & Music Wing',
    image: '',
    instagram: '',
    linkedin: ''
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    category: 'Upcoming',
    summaryReport: ''
  });

  const [portfolioForm, setPortfolioForm] = useState({
    studentName: '',
    performanceType: 'Band',
    videoUrl: '',
    tag: '',
    description: ''
  });

  // Helper function to handle local file uploads to the backend API
  const handleFileUpload = async (event, callbackSetUrl) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('media', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        callbackSetUrl(data.url);
      } else {
        alert('File upload failed. Please verify backend setup.');
      }
    } catch (err) {
      console.error('File upload error:', err);
      alert('Upload server connection error.');
    } finally {
      setUploading(false);
    }
  };

  // Handlers for adding items
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.role) return;
    const newMember = {
      _id: Date.now().toString(),
      ...memberForm,
      image: memberForm.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    };
    setMembers([newMember, ...members]);
    setMemberForm({ name: '', role: '', domain: 'Band & Music Wing', image: '', instagram: '', linkedin: '' });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) return;
    const newEvent = {
      _id: Date.now().toString(),
      ...eventForm
    };
    setEvents([newEvent, ...events]);
    setEventForm({ title: '', date: '', category: 'Upcoming', summaryReport: '' });
  };

  const handleAddPortfolio = (e) => {
    e.preventDefault();
    if (!portfolioForm.studentName || !portfolioForm.videoUrl) return;
    const newPortfolio = {
      _id: Date.now().toString(),
      ...portfolioForm
    };
    setPortfolio([newPortfolio, ...portfolio]);
    setPortfolioForm({ studentName: '', performanceType: 'Band', videoUrl: '', tag: '', description: '' });
  };

  // Handlers for deleting items
  const handleDeleteMember = (id) => setMembers(members.filter(m => m._id !== id));
  const handleDeleteEvent = (id) => setEvents(events.filter(e => e._id !== id));
  const handleDeletePortfolio = (id) => setPortfolio(portfolio.filter(p => p._id !== id));

  return (
    <div className="space-y-8 bg-[#0f1117] p-6 sm:p-8 rounded-2xl border border-white/10">
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[#ccff00] font-mono text-xs font-bold uppercase tracking-widest">MANAGEMENT PORTAL</span>
          <h2 className="text-3xl font-black uppercase text-white mt-1">CORE SECRETARIAT CMS</h2>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex bg-[#14161c] border border-white/10 p-1 rounded-xl">
          {[
            { id: 'members', label: 'Members' },
            { id: 'events', label: 'Events' },
            { id: 'portfolio', label: 'Showcases' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
                activeTab === tab.id ? 'bg-[#ccff00] text-black shadow-[0_0_10px_#ccff00]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* MANAGING MEMBERS */}
      {activeTab === 'members' && (
        <div className="space-y-8">
          <form onSubmit={handleAddMember} className="xstar-card p-6 rounded-xl space-y-4 border border-white/10">
            <h3 className="text-lg font-bold text-white uppercase">Add Secretariat Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={memberForm.name}
                onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                required
              />
              <input
                type="text"
                placeholder="Role (e.g. President, Music Lead)"
                value={memberForm.role}
                onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                required
              />
              <select
                value={memberForm.domain}
                onChange={(e) => setMemberForm({ ...memberForm, domain: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              >
                <option value="Secretariat Core">Secretariat Core</option>
                <option value="Band & Music Wing">Band & Music Wing</option>
                <option value="Dance Club">Dance Club</option>
                <option value="Fashion & Rampwalk">Fashion & Rampwalk</option>
                <option value="Media & Anchoring">Media & Anchoring</option>
              </select>

              {/* Local Photo File Upload Option */}
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Photo Image URL"
                  value={memberForm.image}
                  onChange={(e) => setMemberForm({ ...memberForm, image: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                />
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">OR Upload File:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (url) => setMemberForm({ ...memberForm, image: url }))}
                    className="text-[10px] text-gray-300 file:bg-[#ccff00] file:text-black file:border-0 file:rounded-md file:px-2 file:py-1 file:font-bold cursor-pointer"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Instagram URL"
                value={memberForm.instagram}
                onChange={(e) => setMemberForm({ ...memberForm, instagram: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              />
              <input
                type="text"
                placeholder="LinkedIn URL"
                value={memberForm.linkedin}
                onChange={(e) => setMemberForm({ ...memberForm, linkedin: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#ccff00] text-black font-extrabold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-white transition cursor-pointer disabled:opacity-50"
            >
              {uploading ? 'UPLOADING...' : 'ADD MEMBER'}
            </button>
          </form>

          {/* Member Roster List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-400 uppercase">Existing Members ({members.length})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {members.map((m) => (
                <div key={m._id} className="flex items-center justify-between p-4 rounded-xl bg-[#14161c] border border-white/10">
                  <div className="flex items-center gap-3">
                    <img src={m.image} alt={m.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-bold text-white">{m.name}</p>
                      <p className="text-xs text-[#ccff00] font-mono">{m.role} • {m.domain}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMember(m._id)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold uppercase px-3 py-1.5 rounded bg-red-500/10 border border-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MANAGING EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-8">
          <form onSubmit={handleAddEvent} className="xstar-card p-6 rounded-xl space-y-4 border border-white/10">
            <h3 className="text-lg font-bold text-white uppercase">Add Cultural Event</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Event Title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                required
              />
              <input
                type="text"
                placeholder="Date (e.g. Oct 24, 2026)"
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                required
              />
              <select
                value={eventForm.category}
                onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Past">Past</option>
              </select>
            </div>
            <textarea
              placeholder="Summary report or event description..."
              value={eventForm.summaryReport}
              onChange={(e) => setEventForm({ ...eventForm, summaryReport: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00] h-24"
            ></textarea>
            <button
              type="submit"
              className="bg-[#ccff00] text-black font-extrabold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-white transition cursor-pointer"
            >
              ADD EVENT
            </button>
          </form>

          {/* Events List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-400 uppercase">Existing Events ({events.length})</h4>
            <div className="space-y-3">
              {events.map((evt) => (
                <div key={evt._id} className="flex items-center justify-between p-4 rounded-xl bg-[#14161c] border border-white/10">
                  <div>
                    <span className="text-[10px] font-mono text-[#ccff00] uppercase">{evt.category} • {evt.date}</span>
                    <p className="text-sm font-bold text-white">{evt.title}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(evt._id)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold uppercase px-3 py-1.5 rounded bg-red-500/10 border border-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MANAGING PORTFOLIO/SHOWCASES */}
      {activeTab === 'portfolio' && (
        <div className="space-y-8">
          <form onSubmit={handleAddPortfolio} className="xstar-card p-6 rounded-xl space-y-4 border border-white/10">
            <h3 className="text-lg font-bold text-white uppercase">Add Showcase Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title / Performer Name"
                value={portfolioForm.studentName}
                onChange={(e) => setPortfolioForm({ ...portfolioForm, studentName: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                required
              />
              <input
                type="text"
                placeholder="Tag (e.g. #BandPerformances)"
                value={portfolioForm.tag}
                onChange={(e) => setPortfolioForm({ ...portfolioForm, tag: e.target.value })}
                className="bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
              />

              {/* Local Video File Upload Option */}
              <div className="space-y-1 md:col-span-2">
                <input
                  type="text"
                  placeholder="Video URL (Embed or Direct Video Link)"
                  value={portfolioForm.videoUrl}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, videoUrl: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                  required
                />
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">OR Upload Local Video File:</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, (url) => setPortfolioForm({ ...portfolioForm, videoUrl: url }))}
                    className="text-[10px] text-gray-300 file:bg-[#ccff00] file:text-black file:border-0 file:rounded-md file:px-2 file:py-1 file:font-bold cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <textarea
              placeholder="Short description of the showcase..."
              value={portfolioForm.description}
              onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#ccff00] h-20"
            ></textarea>

            <button
              type="submit"
              disabled={uploading}
              className="bg-[#ccff00] text-black font-extrabold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-white transition cursor-pointer disabled:opacity-50"
            >
              {uploading ? 'UPLOADING...' : 'ADD SHOWCASE'}
            </button>
          </form>

          {/* Portfolio Showcase List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-400 uppercase">Existing Showcases ({portfolio.length})</h4>
            <div className="space-y-3">
              {portfolio.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 rounded-xl bg-[#14161c] border border-white/10">
                  <div>
                    <span className="text-[10px] font-mono text-[#ccff00] font-bold">{item.tag || item.performanceType}</span>
                    <p className="text-sm font-bold text-white">{item.studentName}</p>
                  </div>
                  <button
                    onClick={() => handleDeletePortfolio(item._id)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold uppercase px-3 py-1.5 rounded bg-red-500/10 border border-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}