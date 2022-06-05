import Project from '../models/project.js'

export const createTicket = async (req, res) => {
  const ticket = req.body.ticket;
  try {
    const project = await Project.findOne({ title: req.body.title });
    const { tickets } = project;
    tickets.push(ticket);
    project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}