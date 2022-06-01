import User from "../models/user.js";

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

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message})
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message});
  };
};

export const updateUserRole = async (req, res) => {
  try {
    const user = await User.updateOne({ name: req.body.name }, {$set: { role: req.body.role }});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message});
  };
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne({ email: req.body.email });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message})
  };
};