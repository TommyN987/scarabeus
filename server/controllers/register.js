import User from '../models/user.js'

export const createUser = async (req, res) => {
  const user = req.body;
  const { email, password, name } = user
  const newUser = new User({email, password, name});

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch(err) {
    res.status(409).json({ message: err.message })
  }
}