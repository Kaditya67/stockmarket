import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure that usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure that emails are unique
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Regex for email validation
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
