const express = require('express');
const router = express.Router();
const {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require('../controllers/achievementController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAchievements)
  .post(protect, admin, createAchievement);

router.route('/:id')
  .get(getAchievementById)
  .put(protect, admin, updateAchievement)
  .delete(protect, admin, deleteAchievement);

module.exports = router;
