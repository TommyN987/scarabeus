import User from "../models/user.js";

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