require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Cloudinary upload configuration
const { upload } = require('./config/cloudinary');

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Single File Upload Endpoint
app.post('/api/upload', (req, res) => {
  const uploadSingle = upload.single('file');
  
  uploadSingle(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary Upload Error:', err);
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    res.json({ url: req.file.path });
  });
});

// Mount Database API Routes
app.use('/api/members', require('./routes/members'));
app.use('/api/events', require('./routes/events'));
app.use('/api/showcases', require('./routes/showcases'));

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('Sanskriti Club API Server Running');
});

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});