import User from "../models/user.js"

export const getLoggedIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message})
  }
}