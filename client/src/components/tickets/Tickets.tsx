import { useState, useEffect, useContext, FormEvent } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TextField from '@mui/material/TextField';
import AddCommentIcon from '@mui/icons-material/AddComment';

import { AuthContext } from '../../contexts/AuthContext';
import { fetchAllProjects, fetchOneProject } from "../../dbOperations/projectOperations";
import { addTicket, updateTicket, addComment } from '../../dbOperations/ticketOperations';
import { Project, Ticket } from "../../types/types";

const Tickets = () => {

  // ACTIVE USER
  const userContext = useContext(AuthContext);

  // STATE FOR PROJECTS
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // STATE FOR ACTIVE TICKET
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null)

  // STATE AND HANDLERS FOR MODALS
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const handleOpenDetailsModal = () => setOpenDetailsModal(true);
  const handleCloseDetailsModal = () => setOpenDetailsModal(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  // STATE FOR ADDING A TICKET
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketPriority, setTicketPriority] = useState('');

  // STATE FOR EDITING A TICKET
  const [editedTicketSolver, setEditedTicketSolver] = useState('');
  const [editedTicketPriority, setEditedTicketPriority] = useState('');
  const [editedTicketStatus, setEditedTicketStatus] = useState('');

  // STATE FOR ADDING COMMENT
  const [comment, setComment] = useState('');

  // STATE FOR TRIGGERING FETCHALLPROJECTS
  const [trigger, setTrigger] = useState(false);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (userContext && userContext.activeUser) {
        await addTicket(activeProject!.title, ticketTitle, ticketDescription, ticketPriority, userContext?.activeUser.name)
      }
    } catch (err: any) {
      console.log(err.message);
    }
    setTrigger(trigger => !trigger);
    setActiveProject(null);
    setTicketTitle('');
    setTicketDescription('');
    setTicketPriority('');
    setOpenCreateModal(false);
  };

  const handleEdit = async (project: string, title: string, priority: string, status: string, solver: string) => {
    
    try {
      await updateTicket(project, title, priority, status, solver);
      setOpenEditModal(false);
      setEditedTicketPriority('');
      setEditedTicketSolver('');
      setEditedTicketStatus('');
      setActiveProject(null);
      setTrigger(trigger => !trigger);
    } catch (err: any) {
      console.log(err.message)
    }
  };

  const handleTicketReload = async (project: Project, ticketTitle: string) => {
    const updatedProject = await fetchOneProject(project.title);
    setActiveProject(updatedProject);
    const updatedTicket = updatedProject.tickets.find((ticket: Ticket) => ticket.title === ticketTitle);
    setActiveTicket(updatedTicket);
    setOpenDetailsModal(false);
    setOpenDetailsModal(true);
  }

  const handleAddComment = async (project: string, title: string, message: string) => {
    try {
      if (userContext && userContext.activeUser) {
        await addComment(project, title, userContext.activeUser.name, message)
      }
    } catch (err: any) {
      console.log(err.message)
    }
    setComment('');
    setTrigger(trigger => !trigger);
    activeProject && handleTicketReload(activeProject, title);
  }

  const parseTimestamp = (timestamp: string) => {
    const date = timestamp.slice(0, 10);
    const time = timestamp.slice(11, 19);
    return { date, time }
  }

  useEffect(() => {
    fetchAllProjects()
      .then((projects) => {
        if (userContext?.activeUser?.role === 'Admin') {
          setAllProjects(projects);
        } else {
          const projectsToDisplay = projects.filter((project) =>
            project.personnel.includes(userContext!.activeUser!.name)
          );
          setAllProjects(projectsToDisplay);
        }
      })
      .catch((err) => alert(err));
  }, [userContext, trigger])

  return (
    <div className="inner-content">
      <Container
        sx={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
        <Paper
          elevation={10}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1.5rem',
            minWidth: '830px',
          }}>
          <Typography variant="h3" fontWeight={600}>
            Tickets
          </Typography>
          {allProjects.map(project => (
            <>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#e65100',
                  color: 'white',
                  margin: '3rem 0 .4rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>Project: {project.title} 
                <Button
                  variant="outlined"
                  color='inherit'
                  startIcon={<NoteAddIcon />}
                  sx={{
                    border: '3px solid white',
                    fontSize: '1.1rem',
                    fontWeight: '800'
                  }}
                  onClick={() => {
                    handleOpenCreateModal();
                    setActiveProject(project);
                  }}>Add ticket
                </Button>
              </Typography>
              <TableContainer
                sx={{
                  overflow: 'auto',
                }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#1976d2'}}>
                    <TableRow className="table-head">
                      <TableCell>Title</TableCell>
                      <TableCell>Submitter</TableCell>
                      <TableCell>Solver</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {project.tickets.map(ticket => (
                      <TableRow className="table-body" key={ticket._id}>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>{ticket.submitter}</TableCell>
                        <TableCell>{ticket.solver}</TableCell>
                        <TableCell>{ticket.priority}</TableCell>
                        <TableCell>{ticket.status}</TableCell>
                        <TableCell className="inline-icons">
                          <Tooltip title='details' arrow>
                            <InfoIcon
                              color='action'
                              onClick={() => {
                                setActiveProject(project);
                                setActiveTicket(ticket);
                                handleOpenDetailsModal();
                              }}
                              />
                          </Tooltip>
                          {userContext?.activeUser?.role === 'Admin' 
                          || userContext?.activeUser?.role === 'Project Manager'
                          || (userContext?.activeUser?.role === 'Developer' && userContext?.activeUser?.name === ticket.solver)
                          ?
                          <Tooltip title='Edit' arrow>
                            <EditIcon
                              color='action'
                              onClick={() => {
                                setActiveProject(project);
                                setActiveTicket(ticket);
                                setEditedTicketSolver(ticket.solver);
                                setEditedTicketPriority(ticket.priority);
                                setEditedTicketStatus(ticket.status)
                                handleOpenEditModal();
                              }}
                              />
                          </Tooltip>
                          :
                          null
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ))}    
        </Paper>
      </Container>
      <Modal
        open={openCreateModal}
        onClose={() => {
          handleCloseCreateModal();
          setActiveProject(null);
        }}>
        <Box
          sx={{
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: '500px',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight={600}
            textAlign="center">
            Add New Ticket on {activeProject?.title}
          </Typography>
          <form
            className="new-project-form"
            onSubmit={handleSubmit}>
            <FormControl>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                required
                type='text'
                name="title"
                id="title"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                required
                type='text'
                name="description"
                id="description"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                />
            </FormControl>
            <FormControl>
              <InputLabel id="priority-select-label">
                Priority
              </InputLabel>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={ticketPriority}
                label='Select Priority'
                sx={{
                  width: '100%'
                }}
                onChange={(e) => setTicketPriority(e.target.value)}>
                <MenuItem value='Low'>Low</MenuItem>
                <MenuItem value='Medium'>Medium</MenuItem>
                <MenuItem value='High'>High</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: '1rem',
                fontSize: '1.2rem',
              }}>
              Add ticket
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        sx={{
          overflow: 'auto'
        }}
        >
        <Box
          sx={{
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: 'min(90vw, 1000px)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            fontSize="2.5rem"
            textAlign="center"
          >
            Edit Ticket
          </Typography>
          {activeTicket ? 
          <>
            <section className="project-details-header">
              <Typography variant="h4" fontWeight={600}>
                Title: {activeTicket.title}
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                Description: {activeTicket.description}
              </Typography>
            </section>
            <section className='project-details-table'>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  padding: '1rem',
                  backgroundColor: '#e65100',
                  color: 'white',
                  marginBottom: '.4rem',
                }}>
                Details
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#1976d2' }}>
                    <TableRow className="table-head">
                      <TableCell>Submitter</TableCell>
                      <TableCell>Solver</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className="table-body">
                      <TableCell>{activeTicket.submitter}</TableCell>
                      <TableCell>
                        {userContext?.activeUser?.role === 'Admin' || userContext?.activeUser?.role === 'Project Manager' ? 
                        <Select
                          labelId="solver-select-label"
                          id="solver-select"
                          value={editedTicketSolver}
                          label="Pick"
                          sx={{
                            width: '100%',
                          }}
                          onChange={(e) => setEditedTicketSolver(e.target.value)}
                          >
                          {activeProject?.personnel.map((user) => (
                            <MenuItem key={user} value={user}>
                            {user}
                            </MenuItem>
                          )) }
                        </Select>
                        :
                        activeTicket.solver
                        }
                      </TableCell>
                      <TableCell>
                        {userContext?.activeUser?.role === 'Admin' || userContext?.activeUser?.role === 'Project Manager' ?
                        <Select
                          labelId="priority-select-label"
                          id="priority-select"
                          value={editedTicketPriority}
                          label="Pick"
                          color="primary"
                          sx={{
                            width: '100%',
                          }}
                          onChange={(e) => setEditedTicketPriority(e.target.value)}
                          >
                          <MenuItem value='Low'>Low</MenuItem>
                          <MenuItem value='Medium'>Medium</MenuItem>
                          <MenuItem value='High'>High</MenuItem>
                        </Select>
                        :
                        activeTicket.priority
                        }
                      </TableCell>
                      <TableCell>
                      <Select
                          labelId="[status-select-label"
                          id="[status-select"
                          value={editedTicketStatus}
                          label="Pick"
                          color="primary"
                          sx={{
                            width: '100%',
                          }}
                          onChange={(e) => setEditedTicketStatus(e.target.value)}
                          >
                          <MenuItem value='Open'>Open</MenuItem>
                          <MenuItem value='In Process'>In Process</MenuItem>
                          <MenuItem value='Closed'>Closed</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>{parseTimestamp(activeTicket.created.toString()).time}, {parseTimestamp(activeTicket.created.toString()).date}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
            <Button
              variant="contained"
              size="large"
              startIcon={<CreditScoreIcon />}
              sx={{
                margin: '0 45% 2rem'
              }}
              onClick={() => {
                handleEdit(activeProject!.title, activeTicket.title, editedTicketPriority, editedTicketStatus, editedTicketSolver)
              }}
              >
              Edit
            </Button>
            <section className='project-details-table'>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  padding: '1rem',
                  backgroundColor: '#e65100',
                  color: 'white',
                  marginBottom: '1rem',
                }}>
                Comments
              </Typography>
            </section>
          </> 
          : null}
        </Box>
      </Modal>
      <Modal
        open={openDetailsModal}
        onClose={handleCloseDetailsModal}
        sx={{
          overflow: 'auto'
        }}
        >
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: 'min(90vw, 1000px)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            fontSize="2.5rem"
            textAlign="center"
          >
            Ticket Details
          </Typography>
          {activeTicket ? 
          <>
            <section className="project-details-header">
              <Typography variant="h4" fontWeight={600}>
                Title: {activeTicket.title}
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                Description: {activeTicket.description}
              </Typography>
            </section>
            <section className='project-details-table'>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  padding: '1rem',
                  backgroundColor: '#e65100',
                  color: 'white',
                  marginBottom: '.4rem',
                }}>
                Details
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#1976d2' }}>
                    <TableRow className="table-head">
                      <TableCell>Submitter</TableCell>
                      <TableCell>Solver</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className="table-body">
                      <TableCell>{activeTicket.submitter}</TableCell>
                      <TableCell>{activeTicket.solver}</TableCell>
                      <TableCell>{activeTicket.priority}</TableCell>
                      <TableCell>{activeTicket.status}</TableCell>
                      <TableCell>{parseTimestamp(activeTicket.created.toString()).time}, {parseTimestamp(activeTicket.created.toString()).date}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
            <section className='project-details-table'>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  padding: '1rem',
                  backgroundColor: '#e65100',
                  color: 'white',
                  marginBottom: '.5rem',
                }}>
                Comments
              </Typography>
              {activeTicket.comments.length > 0 &&
              
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#1976d2' }}>
                    <TableRow className="table-head">
                      <TableCell>Commenter</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Posted</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activeTicket.comments.map((comment) => (
                      <TableRow className="table-body">
                        <TableCell>{comment.commenter}</TableCell>
                        <TableCell>{comment.message}</TableCell>
                        <TableCell>{parseTimestamp(comment.created).time}, {parseTimestamp(comment.created).date}</TableCell>
                      </TableRow>
                    ))}
                    </TableBody>
                </Table>
              </TableContainer>
              
              }
            </section>
          </> 
          : null}
          <div
            className="comment-form"
            >
            <Typography
              variant="h5"
              fontWeight={600}
              textAlign="center"
              sx={{
                marginBottom: '1rem'
              }}
              >
              Add Comment
            </Typography>
            <TextField
              multiline
              fullWidth
              placeholder="Enter comment..."
              minRows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}/>
            <Button
              type="submit"
              variant='contained'
              startIcon={<AddCommentIcon />}
              onClick={() => {
                handleAddComment(activeProject!.title, activeTicket!.title, comment);
              }}
              >
              Add Comment
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
export default Tickets