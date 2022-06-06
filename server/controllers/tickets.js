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
};

export const updateTicket = async (req, res) => {
  const updatesInTicket = req.body.ticket;

  try {
    const project = await Project.findOne({ title: req.body.title });
    const { tickets } = project;
    const index = tickets.findIndex(({ title }) => title == updatesInTicket.title);
    tickets[index].solver = updatesInTicket.solver;
    tickets[index].priority = updatesInTicket.priority;
    tickets[index].status = updatesInTicket.status;
    project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const addComment = async (req, res) => {
  const ticket = req.body.ticket;

  try {
    const project = await Project.findOne({ title: req.body.title });
    const { tickets } = project;
    const index = tickets.findIndex(({ title }) => title == ticket.title);
    tickets[index].comments.push(ticket.comment);
    project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}