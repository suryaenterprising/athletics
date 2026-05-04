const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "100m Sprint"
  type: { type: String, enum: ['Track', 'Field', 'Relay'], required: true },
  genderCategory: { type: String, enum: ['Boys', 'Girls', 'Mixed'], required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
