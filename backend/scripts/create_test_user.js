const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const email = process.argv[2];
const password = process.argv[3];
const phone = process.argv[4] || '0000000000';
const firstName = process.argv[5] || 'Test';
const lastName = process.argv[6] || 'User';

if (!email || !password) {
  console.error('Usage: node scripts/create_test_user.js <email> <password> [phone] [firstName] [lastName]');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      console.log('User already exists:', exists.email);
      process.exit(0);
    }
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      role: 'member'
    });
    console.log('Created user:', user.email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
