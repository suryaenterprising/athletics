const Achievement = require('../models/Achievement');

// @desc    Get all achievements (with optional filtering)
// @route   GET /api/achievements
// @access  Public
const getAchievements = async (req, res) => {
  try {
    const { event, year, gender } = req.query;
    
    const query = {};
    if (event) query.event = event;
    if (year) query.year = year;
    if (gender) query.gender = gender;

    const achievements = await Achievement.find(query)
      .populate('event', 'name type genderCategory')
      .populate('positions.athlete', 'name rollNo photoUrl category department')
      .sort({ year: -1 });

    res.json(achievements);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// @desc    Get single achievement
// @route   GET /api/achievements/:id
// @access  Public
const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id)
      .populate('event', 'name type genderCategory')
      .populate('positions.athlete', 'name rollNo photoUrl category department');
      
    if (achievement) {
      res.json(achievement);
    } else {
      res.status(404);
      throw new Error('Achievement not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// @desc    Create achievement record
// @route   POST /api/achievements
// @access  Private/Admin
const createAchievement = async (req, res) => {
  try {
    const { event, year, gender, positions } = req.body;
    
    // Check if record already exists for this event, year, and gender
    const existing = await Achievement.findOne({ event, year, gender });
    if (existing) {
      res.status(400);
      throw new Error('Achievement record for this event, year, and gender already exists');
    }

    const achievement = new Achievement(req.body);
    const createdAchievement = await achievement.save();
    res.status(201).json(createdAchievement);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Update achievement record
// @route   PUT /api/achievements/:id
// @access  Private/Admin
const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (achievement) {
      Object.assign(achievement, req.body);
      const updatedAchievement = await achievement.save();
      res.json(updatedAchievement);
    } else {
      res.status(404);
      throw new Error('Achievement not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Delete achievement record
// @route   DELETE /api/achievements/:id
// @access  Private/Admin
const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (achievement) {
      await achievement.deleteOne();
      res.json({ message: 'Achievement removed' });
    } else {
      res.status(404);
      throw new Error('Achievement not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports = {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
