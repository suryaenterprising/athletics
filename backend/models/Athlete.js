const mongoose = require('mongoose');

const athleteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, sparse: true, unique: true }, // For students
  department: { type: String, required: true },
  category: { type: String, enum: ['Student', 'Alumni', 'Coach'], required: true },
  graduationYear: { type: Number },
  photoUrl: { type: String, default: 'https://via.placeholder.com/150' },
  photoPublicId: { type: String }, // For Cloudinary deletion
  bio: { type: String },
  isActive: { type: Boolean, default: true },
  medicalStatus: { type: String, enum: ['Fit', 'Injured', 'Rehabilitating'], default: 'Fit' }
}, { timestamps: true });

module.exports = mongoose.model('Athlete', athleteSchema);
