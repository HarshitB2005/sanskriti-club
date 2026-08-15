import React, { useState, useEffect } from 'react';

// Dynamic API URL based on environment (Vercel vs Localhost)
const API_BASE = 'https://sanskriti-club.onrender.com';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('members');
    
    // Members Form State
    const [members, setMembers] = useState([]);
    const [memberForm, setMemberForm] = useState({ name: '', role: '', category: 'Secretariat Core', image: '', instagram: '', linkedin: '' });
    
    // Events Form State
    const [events, setEvents] = useState([]);
    const [eventForm, setEventForm] = useState({ title: '', date: '', location: '', description: '', image: '', registerLink: '', category: 'Upcoming' });

    // Showcases Form State
    const [showcases, setShowcases] = useState([]);
    const [showcaseForm, setShowcaseForm] = useState({ title: '', category: 'Dance', mediaType: 'image', mediaUrl: '', description: '' });

    // Status States
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resMembers = await fetch(`${API_BASE}/api/members`);
            if (resMembers.ok) setMembers(await resMembers.json());

            const resEvents = await fetch(`${API_BASE}/api/events`);
            if (resEvents.ok) setEvents(await resEvents.json());

            const resShowcases = await fetch(`${API_BASE}/api/showcases`);
            if (resShowcases.ok) setShowcases(await resShowcases.json());
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    // Generic Cloudinary File Upload Handler
    const handleFileUpload = async (e, setUrlCallback) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch(`${API_BASE}/api/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setUrlCallback(data.url);
                setMessage('File uploaded successfully!');
            } else {
                alert(data.error || 'File upload failed.');
            }
        } catch (err) {
            console.error('Upload Error:', err);
            alert('Upload server connection error.');
        } finally {
            setUploading(false);
        }
    };

    // Submit Handlers
    const handleMemberSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/api/members`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberForm)
            });
            if (res.ok) {
                setMessage('Member added successfully!');
                setMemberForm({ name: '', role: '', category: 'Secretariat Core', image: '', instagram: '', linkedin: '' });
                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/api/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventForm)
            });
            if (res.ok) {
                setMessage('Event added successfully!');
                setEventForm({ title: '', date: '', location: '', description: '', image: '', registerLink: '', category: 'Upcoming' });
                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleShowcaseSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/api/showcases`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(showcaseForm)
            });
            if (res.ok) {
                setMessage('Showcase item added!');
                setShowcaseForm({ title: '', category: 'Dance', mediaType: 'image', mediaUrl: '', description: '' });
                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Delete Handlers
    const handleDelete = async (endpoint, id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            const res = await fetch(`${API_BASE}/api/${endpoint}/${id}`, { method: 'DELETE' });
            if (res.ok) fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-lime-400 mb-8 text-center uppercase tracking-wider">
                    Core Secretariat CMS
                </h1>

                {message && (
                    <div className="bg-lime-500/20 border border-lime-500 text-lime-400 p-4 rounded-lg mb-6 text-center">
                        {message}
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    {['members', 'events', 'showcases'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setMessage(''); }}
                            className={`px-6 py-2 rounded-full capitalize font-bold transition-all ${
                                activeTab === tab ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/30' : 'bg-neutral-900 text-neutral-400 hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* MEMBERS TAB */}
                {activeTab === 'members' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <form onSubmit={handleMemberSubmit} className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 space-y-4">
                            <h2 className="text-xl font-bold text-lime-400">ADD SECRETARIAT MEMBER</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                value={memberForm.name}
                                onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Role (e.g. Vice President)"
                                value={memberForm.role}
                                onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white"
                                required
                            />
                            <select
                                value={memberForm.category}
                                onChange={(e) => setMemberForm({ ...memberForm, category: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white"
                            >
                                <option value="Secretariat Core">Secretariat Core</option>
                                <option value="Dance Wing">Dance Wing</option>
                                <option value="Music Wing">Music Wing</option>
                                <option value="Theatre Wing">Theatre Wing</option>
                                <option value="Arts Wing">Arts Wing</option>
                            </select>

                            <div className="space-y-2">
                                <label className="text-xs text-neutral-400 block">Upload Image to Cloudinary</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, (url) => setMemberForm({ ...memberForm, image: url }))}
                                    className="w-full bg-black border border-neutral-800 p-2 rounded-lg text-xs"
                                />
                                {memberForm.image && <p className="text-xs text-lime-400 truncate">Uploaded: {memberForm.image}</p>}
                            </div>

                            <input
                                type="text"
                                placeholder="Instagram URL"
                                value={memberForm.instagram}
                                onChange={(e) => setMemberForm({ ...memberForm, instagram: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white"
                            />
                            <input
                                type="text"
                                placeholder="LinkedIn URL"
                                value={memberForm.linkedin}
                                onChange={(e) => setMemberForm({ ...memberForm, linkedin: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white"
                            />

                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-lime-400 text-black font-bold p-3 rounded-lg hover:bg-lime-500 disabled:opacity-50"
                            >
                                {uploading ? 'Uploading Image...' : 'Save Member'}
                            </button>
                        </form>

                        {/* List */}
                        <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800">
                            <h2 className="text-xl font-bold text-neutral-400 mb-4">EXISTING MEMBERS ({members.length})</h2>
                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {members.map((m) => (
                                    <div key={m._id} className="flex justify-between items-center bg-black p-3 rounded-lg border border-neutral-800">
                                        <div className="flex items-center gap-3">
                                            {m.image && <img src={m.image} alt={m.name} className="w-10 h-10 rounded-full object-cover" />}
                                            <div>
                                                <p className="font-bold text-sm">{m.name}</p>
                                                <p className="text-xs text-neutral-500">{m.role} • {m.category}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete('members', m._id)} className="text-red-500 hover:text-red-400 text-sm">Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* EVENTS TAB */}
                {activeTab === 'events' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <form onSubmit={handleEventSubmit} className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 space-y-4">
                            <h2 className="text-xl font-bold text-lime-400">ADD EVENT</h2>
                            <input
                                type="text"
                                placeholder="Event Title"
                                value={eventForm.title}
                                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white"
                                required
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    placeholder="Date (e.g. Oct 24, 2026)"
                                    value={eventForm.date}
                                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                                    className="bg-black border border-neutral-800 p-3 rounded-lg text-white"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={eventForm.location}
                                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                                    className="bg-black border border-neutral-800 p-3 rounded-lg text-white"
                                    required
                                />
                            </div>
                            <textarea
                                placeholder="Event Description"
                                value={eventForm.description}
                                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white h-24"
                                required
                            />

                            <div className="space-y-2">
                                <label className="text-xs text-neutral-400 block">Upload Event Poster to Cloudinary</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, (url) => setEventForm({ ...eventForm, image: url }))}
                                    className="w-full bg-black border border-neutral-800 p-2 rounded-lg text-xs"
                                />
                                {eventForm.image && <p className="text-xs text-lime-400 truncate">Uploaded: {eventForm.image}</p>}
                            </div>

                            <input
                                type="text"
                                placeholder="Registration Link"
                                value={eventForm.registerLink}
                                onChange={(e) => setEventForm({ ...eventForm, registerLink: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white"
                            />
                            <select
                                value={eventForm.category}
                                onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white"
                            >
                                <option value="Upcoming">Upcoming</option>
                                <option value="Past">Past</option>
                            </select>

                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-lime-400 text-black font-bold p-3 rounded-lg hover:bg-lime-500 disabled:opacity-50"
                            >
                                {uploading ? 'Uploading Poster...' : 'Save Event'}
                            </button>
                        </form>

                        {/* List */}
                        <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800">
                            <h2 className="text-xl font-bold text-neutral-400 mb-4">EXISTING EVENTS ({events.length})</h2>
                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {events.map((ev) => (
                                    <div key={ev._id} className="flex justify-between items-center bg-black p-3 rounded-lg border border-neutral-800">
                                        <div className="flex items-center gap-3">
                                            {ev.image && <img src={ev.image} alt={ev.title} className="w-10 h-10 rounded object-cover" />}
                                            <div>
                                                <p className="font-bold text-sm">{ev.title}</p>
                                                <p className="text-xs text-neutral-500">{ev.date} • {ev.location}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete('events', ev._id)} className="text-red-500 hover:text-red-400 text-sm">Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* SHOWCASES TAB */}
                {activeTab === 'showcases' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <form onSubmit={handleShowcaseSubmit} className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 space-y-4">
                            <h2 className="text-xl font-bold text-lime-400">ADD SHOWCASE ITEM</h2>
                            <input
                                type="text"
                                placeholder="Title"
                                value={showcaseForm.title}
                                onChange={(e) => setShowcaseForm({ ...showcaseForm, title: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white"
                                required
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    value={showcaseForm.category}
                                    onChange={(e) => setShowcaseForm({ ...showcaseForm, category: e.target.value })}
                                    className="bg-black border border-neutral-800 p-3 rounded-lg text-white"
                                >
                                    <option value="Dance">Dance</option>
                                    <option value="Music">Music</option>
                                    <option value="Theatre">Theatre</option>
                                    <option value="Arts">Arts</option>
                                </select>
                                <select
                                    value={showcaseForm.mediaType}
                                    onChange={(e) => setShowcaseForm({ ...showcaseForm, mediaType: e.target.value })}
                                    className="bg-black border border-neutral-800 p-3 rounded-lg text-white"
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-neutral-400 block">Upload Media File (Image/Video) to Cloudinary</label>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={(e) => handleFileUpload(e, (url) => setShowcaseForm({ ...showcaseForm, mediaUrl: url }))}
                                    className="w-full bg-black border border-neutral-800 p-2 rounded-lg text-xs"
                                />
                                {showcaseForm.mediaUrl && <p className="text-xs text-lime-400 truncate">Uploaded: {showcaseForm.mediaUrl}</p>}
                            </div>

                            <textarea
                                placeholder="Description"
                                value={showcaseForm.description}
                                onChange={(e) => setShowcaseForm({ ...showcaseForm, description: e.target.value })}
                                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-white h-24"
                            />

                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-lime-400 text-black font-bold p-3 rounded-lg hover:bg-lime-500 disabled:opacity-50"
                            >
                                {uploading ? 'Uploading Media...' : 'Save Showcase Item'}
                            </button>
                        </form>

                        {/* List */}
                        <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800">
                            <h2 className="text-xl font-bold text-neutral-400 mb-4">EXISTING SHOWCASES ({showcases.length})</h2>
                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {showcases.map((sc) => (
                                    <div key={sc._id} className="flex justify-between items-center bg-black p-3 rounded-lg border border-neutral-800">
                                        <div>
                                            <p className="font-bold text-sm">{sc.title}</p>
                                            <p className="text-xs text-neutral-500">{sc.category} • {sc.mediaType}</p>
                                        </div>
                                        <button onClick={() => handleDelete('showcases', sc._id)} className="text-red-500 hover:text-red-400 text-sm">Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;