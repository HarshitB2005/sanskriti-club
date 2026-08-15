require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Cloudinary upload configuration
const { upload } = require('./config/cloudinary');

const app = express();

// Middleware - Configured to allow Vercel & cross-origin requests
app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Single File Upload Endpoint (Supports both 'file' and 'media' key names)
app.post('/api/upload', (req, res, next) => {
  // Accepts 'file' (from Admin.jsx) or 'media'
  const uploadSingle = upload.single('file');
  
  uploadSingle(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary Upload Error:', err);
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please select a file.' });
    }
    
    // Return the secure Cloudinary hosted URL
    res.json({ url: req.file.path });
  });
});

// Import & Use API Routes for Members, Events, Showcases if they exist
try {
  app.use('/api/members', require('./routes/members'));
  app.use('/api/events', require('./routes/events'));
  app.use('/api/showcases', require('./routes/showcases'));
} catch (e) {
  // Gracefully skip if routes are handled elsewhere
}

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('Sanskriti Club API Server Running');
});

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});