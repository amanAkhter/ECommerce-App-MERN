const mongoose = require('mongoose');
const User = require('./models/userModel'); // Adjust path as necessary

const createDefaultAdmin = async () => {
  try {
    // Check if the admin user already exists
    const adminExists = await User.findOne({ email: 'admin@elegant.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // Create the default admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@elegant.com',
      password: 'admin123', // This will be hashed by pre-save hook in the User model
      role: 'admin',
    });

    await admin.save();
    console.log('Default admin user created');
  } catch (error) {
    console.error('Error creating default admin user:', error);
    throw error; // Re-throw error to be caught in server.js
  }
};

module.exports = createDefaultAdmin;
