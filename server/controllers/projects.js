import Project from "../models/project.js";
import User from "../models/user.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(404).json({ message: err.message })
  };
};

export const getOneProject = async (req, res) => {
  try {
    const project = await Project.findOne({ title: req.params.title });
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ message: err.message })
  };
};

export const createProject = async (req, res) => {
  const project = req.body;
  const { title, description, personnel } = project;
  const newProject = new Project({title, description, personnel});

  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(409).json({ message: err.message })
  };
};

export const removePersonnelFromProject = async (req, res) => {
  try {
    const project = await Project.findOne({ title: req.body.title });
    const { personnel } = project;
    personnel.splice(personnel[personnel.indexOf(req.body.user)], 1);
    project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const editProject = async (req, res) => {
  try {
    const project = await Project.updateOne({ title: req.body.prevTitle }, {$set: {
      title: req.body.newTitle,
      description: req.body.description,
      personnel: req.body.personnel
    }});
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.deleteOne({ title: req.body.title });
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}