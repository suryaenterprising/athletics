const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  year: { type: Number, required: true }, // e.g., 2024
  gender: { type: String, enum: ['Boys', 'Girls'], required: true },
  positions: [
    {
      position: { type: Number, enum: [1, 2, 3], required: true },
      athlete: { type: mongoose.Schema.Types.ObjectId, ref: 'Athlete', required: true },
      performanceRecord: { type: String } // e.g., "10.5s"
    }
  ]
}, { timestamps: true });

// Ensure an event has only one achievement record per year per gender
achievementSchema.index({ event: 1, year: 1, gender: 1 }, { unique: true });

module.exports = mongoose.model('Achievement', achievementSchema);
