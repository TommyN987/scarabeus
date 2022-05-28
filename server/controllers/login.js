import User from "../models/user.js"

export const getLoggedIn = async (req, res) => {
  try {
    const users = await User.findOne({ email: req.params.email});
    console.log(req.params.email)
    console.log(users)
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message})
  }
}