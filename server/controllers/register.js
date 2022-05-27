import User from '../models/user.js'

export const getRegisterPage = (req, res) => {
  res.send('Register Page')
}

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch(err) {
    res.status(409).json({ message: err.message })
  }
}