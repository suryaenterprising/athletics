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

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/')
  .get(getAthletes)
  .post(protect, admin, upload.single('photo'), createAthlete);

router.route('/:id')
  .get(getAthleteById)
  .put(protect, admin, updateAthlete)
  .delete(protect, admin, deleteAthlete);

module.exports = router;
