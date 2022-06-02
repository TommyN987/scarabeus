import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: {
    type: String,
    default: 'Submitter'
  },
  projects: {
    type: [String],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

export default User;