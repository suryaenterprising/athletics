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

router.route('/')
  .get(getAthletes)
  .post(protect, admin, createAthlete);

router.route('/:id')
  .get(getAthleteById)
  .put(protect, admin, updateAthlete)
  .delete(protect, admin, deleteAthlete);

module.exports = router;
