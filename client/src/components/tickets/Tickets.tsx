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

import { AuthContext } from '../../contexts/AuthContext';
import { fetchAllProjects, addTicket } from "../../dbOperations/projectOperations";
import { Project } from "../../types/types";

const Tickets = () => {

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketPriority, setTicketPriority] = useState('');

  const userContext = useContext(AuthContext);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
    setOpenModal(false);
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
                    handleOpenModal();
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
                        <TableCell>D | E | D</TableCell>
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
        open={openModal}
        onClose={() => {
          handleCloseModal();
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
    </div>
  )
}
export default Tickets