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

import { AuthContext } from '../../contexts/AuthContext';
import { fetchAllProjects, addTicket } from "../../dbOperations/projectOperations";
import { Project, Ticket } from "../../types/types";

const Tickets = () => {

  // STATE FOR PROJECTS
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // STATE FOR ACTIVE TICKET
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null)

  // STATE FOR MODALS
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  // STATE FOR ADDING A TICKET
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketPriority, setTicketPriority] = useState('');

  const userContext = useContext(AuthContext);

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const handleOpenDetailsModal = () => setOpenDetailsModal(true);
  const handleCloseDetailsModal = () => setOpenDetailsModal(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (userContext && userContext.activeUser) {
        await addTicket(activeProject!.title, ticketTitle, ticketDescription, ticketPriority, userContext?.activeUser.name)
      }
    } catch (err: any) {
      console.log(err.message);
    }

    setActiveProject(null);
    setTicketTitle('');
    setTicketDescription('');
    setTicketPriority('');
    setOpenCreateModal(false);
  }

  useEffect(() => {
    fetchAllProjects()
      .then((projects) => {
        if (userContext?.activeUser?.role === 'Admin') {
          console.log(projects);
          setAllProjects(projects);
        } else {
          const projectsToDisplay = projects.filter((project) =>
            project.personnel.includes(userContext!.activeUser!.name)
          );
          console.log(projectsToDisplay);
          setAllProjects(projectsToDisplay);
        }
      })
      .catch((err) => alert(err));
  }, [userContext])

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
          <Typography variant="h4" fontWeight={600}>
            My Tickets
          </Typography>
          {allProjects.map(project => (
            <>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#e65100',
                  color: 'white',
                  marginTop: '3rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>{project.title} 
                <Button
                  variant="outlined"
                  color='inherit'
                  startIcon={<NoteAddIcon />}
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
                          {userContext?.activeUser?.role !== 'Submitter' &&
                          <Tooltip title='Edit' arrow>
                            <EditIcon
                              color='action'
                              />
                          </Tooltip>
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
        open={openDetailsModal}
        onClose={handleCloseDetailsModal}
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
                  marginBottom: '1rem',
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
                      <TableCell>{activeTicket.created.toString()}</TableCell>
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
                  marginBottom: '1rem',
                }}>
                Comments
              </Typography>
            </section>
          </> 
          : null}
        </Box>
      </Modal>
    </div>
  )
}
export default Tickets