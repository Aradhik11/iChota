const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controller/userController');

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

// User routes
router.post('/create', 
  upload.single('resume'), 
  userController.createUser
);
router.get('/:id', userController.getUserProfile);

module.exports = router;