import Project from "../models/project.js";

export const createProject = async (req, res) => {
  const project = req.body;
  const { title, description, personnel } = project;
  const newProject = new Project({title, description, personnel});

  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}