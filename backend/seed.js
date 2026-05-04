require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const adminExists = await User.findOne({ email: 'admin@iiti.ac.in' });
    
    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit();
    }

    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@iiti.ac.in',
      password: 'password123',
      role: 'superadmin'
    });

    console.log(`Admin created successfully!`);
    console.log(`Email: ${admin.email}`);
    console.log(`Password: password123`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
