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
  
  function symmetricDifference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem)
        } else {
            _difference.add(elem)
        }
    }
    return _difference
  }

  try {
    const users = await User.find();
    console.log(users)
    const prevPersonnel = req.body.prevPersonnel;
    console.log(prevPersonnel);
    const newPersonnel = req.body.newPersonnel;
    const project = req.body.project;

    const prevPersonnelSet = new Set(prevPersonnel);
    const newPersonnelSet = new Set(newPersonnel);
    console.log(prevPersonnelSet)

    const setDifference = symmetricDifference(prevPersonnelSet, newPersonnelSet);
    const personnelToUpdate = [...setDifference];

    const userObjects = [];

    personnelToUpdate.forEach(user => {
      userObjects.push(users.find(personnel => personnel.name === user));
    });


    userObjects.forEach(user => {
      if ((user.projects.indexOf(project)) === -1) {
        user.projects.push(project)
      } else {
        user.projects.splice(user.projects.indexOf(project), 1);
      }
    });

    console.log(userObjects)

    users.forEach(oldUser => {
      userObjects.forEach(newUser => {
        if (oldUser.name === newUser.name) {
          oldUser.projects.splice(0, oldUser.projects.length, [...newUser.projects]);
          oldUser.save();
        }
      })
    })

    res.status(200).json(users);

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