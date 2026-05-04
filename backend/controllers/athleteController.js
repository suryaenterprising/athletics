const Athlete = require('../models/Athlete');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Get all athletes
// @route   GET /api/athletes
// @access  Public
const getAthletes = async (req, res) => {
  try {
    const { category, event, year, search } = req.query;
    
    // Build query
    const query = {};
    if (category) query.category = category;
    if (year) query.graduationYear = year;
    if (search) query.name = { $regex: search, $options: 'i' };
    
    // Note: Filtering by event participation would require a lookup from the Achievements collection
    // which can be added later or done via aggregation.

    const athletes = await Athlete.find(query).sort({ createdAt: -1 });
    res.json(athletes);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// @desc    Get single athlete
// @route   GET /api/athletes/:id
// @access  Public
const getAthleteById = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id);
    if (athlete) {
      res.json(athlete);
    } else {
      res.status(404);
      throw new Error('Athlete not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

// @desc    Create new athlete
// @route   POST /api/athletes
// @access  Private/Admin
const createAthlete = async (req, res) => {
  try {
    let photoUrl = 'https://via.placeholder.com/300x400';
    let photoPublicId = '';

    // Handle image upload if file is present
    if (req.file) {
      const uploadFromBuffer = (req) => {
        return new Promise((resolve, reject) => {
          let cld_upload_stream = cloudinary.uploader.upload_stream(
            { folder: "athletics_profiles" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
        });
      };

      try {
        const result = await uploadFromBuffer(req);
        photoUrl = result.secure_url;
        photoPublicId = result.public_id;
      } catch (uploadError) {
        console.error('Cloudinary Error:', uploadError);
        return res.status(400).json({ message: 'Image upload failed. Please check your Cloudinary credentials in .env' });
      }
    }

    const athleteData = {
      ...req.body,
      photoUrl,
      photoPublicId
    };

    const athlete = new Athlete(athleteData);
    const createdAthlete = await athlete.save();
    res.status(201).json(createdAthlete);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Update athlete
// @route   PUT /api/athletes/:id
// @access  Private/Admin
const updateAthlete = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id);

    if (!athlete) {
      res.status(404);
      throw new Error('Athlete not found');
    }

    let photoUrl = athlete.photoUrl;
    let photoPublicId = athlete.photoPublicId;

    if (req.file) {
      const uploadFromBuffer = (req) => {
        return new Promise((resolve, reject) => {
          let cld_upload_stream = cloudinary.uploader.upload_stream(
            { folder: "athletics_profiles" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
        });
      };

      const result = await uploadFromBuffer(req);
      photoUrl = result.secure_url;
      photoPublicId = result.public_id;
    }

    const updatedData = {
      ...req.body,
      photoUrl,
      photoPublicId
    };

    Object.assign(athlete, updatedData);
    const updatedAthlete = await athlete.save();
    res.json(updatedAthlete);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Delete athlete
// @route   DELETE /api/athletes/:id
// @access  Private/Admin
const deleteAthlete = async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id);

    if (athlete) {
      await athlete.deleteOne();
      res.json({ message: 'Athlete removed' });
    } else {
      res.status(404);
      throw new Error('Athlete not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports = {
  getAthletes,
  getAthleteById,
  createAthlete,
  updateAthlete,
  deleteAthlete,
};
