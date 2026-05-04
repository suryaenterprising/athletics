const express = require('express');
const router = express.Router();
const {
  getAthletes,
  getAthleteById,
  createAthlete,
  updateAthlete,
  deleteAthlete,
} = require('../controllers/athleteController');
const { protect, admin } = require('../middlewares/authMiddleware');
const multer = require('multer');

// Configure multer for memory storage with 150KB limit
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 150 * 1024 } // 150KB
});

router.route('/')
  .get(getAthletes)
  .post(protect, admin, upload.single('photo'), createAthlete);

router.route('/:id')
  .get(getAthleteById)
  .put(protect, admin, upload.single('photo'), updateAthlete)
  .delete(protect, admin, deleteAthlete);

module.exports = router;
