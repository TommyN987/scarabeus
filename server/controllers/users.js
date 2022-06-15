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

export const addUserProjects = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    user.projects = [...user.projects, req.body.projects];
    user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};

export const removeUserProjects = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    const { projects } = user;
    projects.splice(projects.indexOf(req.body.projects), 1);
    user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const handleProjectsEdit = async (req, res) => {

  const usersToUpdate = req.body.usersToUpdate;
  const project = req.body.project;

  try {
    usersToUpdate.forEach(async (person) => {
      const user = await User.findOne({ name: person })
      if (user.projects.includes(project)) {
        user.projects.splice(user.projects.indexOf(project), 1)
      } else {
        user.projects.push(project);
      }
      user.save();
    })
    res.status(200).json();
  } catch (err) {
    res.status(404).json({ message: err.message})
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne({ email: req.body.email });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message})
  };
};