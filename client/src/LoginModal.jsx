import React, { useState } from 'react';

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default prototype verification
    if (credentials.username === 'admin' && credentials.password === 'sanskriti2026') {
      onLoginSuccess();
      onClose();
    } else {
      setError('Invalid username or password (Use admin / sanskriti2026)');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border border-white/10 w-full max-w-md rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-lg"
        >
          ✕
        </button>

        <h3 className="text-2xl font-black text-[#ccff00] mb-2">Core Login</h3>
        <p className="text-xs text-gray-400 mb-6">Enter admin credentials to access core Secretariat tools.</p>

        {error && (
          <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Username</label>
            <input
              type="text"
              placeholder="e.g. admin"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#ccff00]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full bg-[#121212] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#ccff00]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ccff00] text-black font-bold p-3 rounded-lg hover:bg-opacity-90 transition mt-2 cursor-pointer"
          >
            Authenticate & Proceed
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;