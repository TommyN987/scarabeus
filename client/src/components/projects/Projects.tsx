import { useState, useEffect, useContext, FormEvent } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AuthContext } from '../../contexts/AuthContext';
import { User, Project } from '../../types/types';
import {
  fetchAllUsers,
  updateUserProjects, 
  handleProjectsEditInUser,
  removeUserProjects,
} from '../../dbOperations/userOperations';
import {
  createProject,
  fetchAllProjects,
  fetchOneProject,
  editProject,
  deleteProject,
} from '../../dbOperations/projectOperations';
import { CloseButton } from '../close-icon/CloseIcon';

const Projects = () => {
  
  // ACTIVE USER
  const userContext = useContext(AuthContext);

  // STATE FOR ALL AVAILABLE USERS AND PROJECTS
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  // STATE FOR ACTIVE PROJECT
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // STATE AND HANDLERS FOR MODALS
  const [openCreationModal, setOpenCreationModal] = useState(false);
  const handleOpenCreationModal = () => setOpenCreationModal(true);
  const handleCloseCreationModal = () => setOpenCreationModal(false);

  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const handleOpenDetailsModal = async (project: string) => {
    const fetchedProject = await fetchOneProject(project);
    setActiveProject(fetchedProject);
    setOpenDetailsModal(true);
  };
  const handleCloseDetailsModal = () => setOpenDetailsModal(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = async (project: Project) => {
    const fetchedProject = await fetchOneProject(project.title);
    setActiveProject(fetchedProject);
    setOpenEditModal(true);
    setNewProjectTitle(project.title);
    setNewProjectDescription(project.description);
    setNewProjectPersonnel(project.personnel)
  };
  const handleCloseEditModal = () => setOpenEditModal(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  // STATE FOR NEW PROJECT DATA
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectPersonnel, setNewProjectPersonnel] = useState<string[]>([]);

  // STATE FOR TRIGGERING FETCHALLPROJECTS
  const [trigger, setTrigger] = useState(false);

  const handlePersonnelSelectChange = (e: SelectChangeEvent<typeof newProjectPersonnel>) => {
    const { target: { value } } = e;
    setNewProjectPersonnel(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // CREATE PROJECT IN DB
    try {
      createProject({
        title: newProjectTitle,
        description: newProjectDescription,
        personnel: newProjectPersonnel,
        tickets: [],
      });
    } catch (err: any) {
      alert(err.message);
    }

    // UPDATES USER OBJECTS' PROJECT FIELDS WITH THE NEW PROJECT
    try {
      newProjectPersonnel.forEach((username) => {
        updateUserProjects(username, newProjectTitle);
      });
    } catch (err: any) {
      alert(err.message);
    }
    setNewProjectTitle('');
    setNewProjectDescription('');
    setNewProjectPersonnel([]);
    handleCloseCreationModal();
    setTrigger((trigger) => !trigger);
  };

  const symmetricDifference = (setA: string[], setB: string[]) => {
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

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    
    const setDifference = symmetricDifference(activeProject!.personnel, newProjectPersonnel);
    const usersToUpdate = [...setDifference];

    try {
      await editProject(activeProject!.title, newProjectTitle, newProjectDescription, newProjectPersonnel);
      await handleProjectsEditInUser(usersToUpdate, activeProject!.title)
    } catch (err: any) {
      alert(err.message);
    }

    setActiveProject(null);
    setNewProjectTitle('');
    setNewProjectDescription('');
    setNewProjectPersonnel([]);
    handleCloseEditModal();
    setTrigger((trigger) => !trigger);
  }

  const handleDelete = async (project: Project) => {
    await deleteProject(project.title);
    project.personnel.forEach(async (user) => {
      await removeUserProjects(user, project.title);
    });
    setTrigger((trigger) => !trigger);
  };

  const findUserForProjectDetails = (name: string) =>
    allUsers.find((user) => user.name === name);

  useEffect(() => {
    fetchAllUsers()
      .then((users) => setAllUsers(users))
      .catch((err) => alert(err));
  }, []);

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
  }, [trigger, userContext]);

  return (
    <div className="inner-content">
      <Container
        sx={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
        >
        <Paper
          elevation={10}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2.5rem 1.5rem',
            minWidth: '830px',
          }}
          >
          <Typography variant="h3" fontWeight={600}>
            Projects
          </Typography>
          <TableContainer
            sx={{
              marginTop: '2rem',
              overflow: 'auto',
            }}
            >
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow className="table-head">
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Personnel</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allProjects.map((project) => (
                  <TableRow className="table-body" key={project.title}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>
                      <ul>
                        {project.personnel.map((user) => (
                          <li className="project-table-personnel" key={user}>
                            {user}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="inline-icons">
                      <Tooltip title="Details" arrow>
                        <InfoIcon
                          color="action"
                          onClick={() => handleOpenDetailsModal(project.title)}
                        />
                      </Tooltip>
                      {(userContext?.activeUser?.role === 'Project Manager' || userContext?.activeUser?.role === 'Admin') && <Tooltip title="Edit" arrow>
                        <EditIcon 
                          color="action"
                          onClick={() => handleOpenEditModal(project)}
                        />
                      </Tooltip>}
                      {userContext?.activeUser?.role === 'Admin' && <Tooltip title="Delete" arrow>
                        <DeleteIcon
                          color="action"
                          onClick={() => {
                            setActiveProject(project);
                            handleOpenDeleteDialog();
                          }}
                        />
                      </Tooltip>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {userContext?.activeUser?.role === 'Admin' && 
          <Button
            variant="contained"
            startIcon={<CreateNewFolderIcon />}
            onClick={handleOpenCreationModal}
            sx={{
              width: '30%',
              alignSelf: 'center',
              marginTop: '1rem'
            }}>
            Create New Project
          </Button>}
        </Paper>
      </Container>
      <Modal open={openCreationModal} onClose={handleCloseCreationModal}>
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
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            fontWeight={600}
            textAlign="center"
          >
            Create New Project
          </Typography>
          <form className="new-project-form" onSubmit={handleSubmit}>
            <FormControl>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                required
                type="text"
                name="title"
                id="title"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                required
                type="text"
                name="description"
                id="description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="personnel-select-label">
                Select personnel
              </InputLabel>
              <Select
                labelId="personnel-select-label"
                id="personnel-select"
                multiple
                required
                value={newProjectPersonnel}
                onChange={handlePersonnelSelectChange}
                input={<OutlinedInput label="Select personnel" />}
                renderValue={(selected): React.ReactNode => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  );
                }}
              >
                {allUsers.map((user) => (
                  <MenuItem className='new-project-personnel' key={user.name} value={user.name}>
                    <span>{user.name}</span><span>{user.role}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: '1rem',
                fontSize: '1.2rem',
              }}
            >
              Create
            </Button>
          </form>
          <CloseButton onClick={handleCloseCreationModal} />
        </Box>
      </Modal>
      <Modal 
        open={openDetailsModal} 
        onClose={handleCloseDetailsModal}
        sx={{
          overflow: 'auto'
        }}>
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
          }}>
          <Typography
            variant="h5"
            fontWeight={600}
            fontSize="2.5rem"
            textAlign="center">
            Project Details
          </Typography>
          {activeProject ? (
            <>
              <section className="project-details-header">
                <Typography variant="h4" fontWeight={600}>
                  Title: {activeProject.title}
                </Typography>
                <Typography variant="h5" fontWeight={600}>
                  Description: {activeProject.description}
                </Typography>
              </section>
              <section className="project-details-table">
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{
                    padding: '1rem',
                    backgroundColor: '#e65100',
                    color: 'white',
                    marginBottom: '1rem',
                  }}
                >
                  Assigned Personnel
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                      <TableRow className="table-head">
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activeProject.personnel.map((person) => {
                        const user = findUserForProjectDetails(person);
                        return (
                          <TableRow className="table-body" key={user!.email}>
                            <TableCell>{user!.name}</TableCell>
                            <TableCell>{user!.email}</TableCell>
                            <TableCell>{user!.role}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </section>
              <section>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{
                    padding: '1rem',
                    backgroundColor: '#e65100',
                    color: 'white',
                    marginBottom: '1rem',
                  }}>
                  Tickets for the Project
                </Typography>
                <TableContainer sx={{ overflow: 'auto' }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#1976d2'}}>
                        <TableRow className="table-head">
                          <TableCell>Title</TableCell>
                          <TableCell>Solver</TableCell>
                          <TableCell>Priority</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {activeProject.tickets.map((ticket) => (
                          <TableRow className="table-body" key={ticket._id}>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>{ticket.solver}</TableCell>
                            <TableCell>{ticket.priority}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>
              </section>
            </>
          ) : null}
          <CloseButton onClick={handleCloseDetailsModal} />
        </Box>
      </Modal>
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
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
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            fontWeight={600}
            textAlign="center"
          >
            Edit Project
          </Typography>
          <form className="new-project-form" onSubmit={handleEdit}>
            <FormControl>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                required
                type="text"
                name="title"
                id="title"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                required
                type="text"
                name="description"
                id="description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="personnel-select-label">
                Select personnel
              </InputLabel>
              <Select
                labelId="personnel-select-label"
                id="personnel-select"
                multiple
                required
                value={newProjectPersonnel}
                onChange={handlePersonnelSelectChange}
                input={<OutlinedInput label="Select personnel" />}
                renderValue={(selected): React.ReactNode => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  );
                }}
              >
                {allUsers.map((user) => (
                  <MenuItem className='new-project-personnel' key={user.name} value={user.name}>
                    <span>{user.name}</span><span>{user.role}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: '1rem',
                fontSize: '1.2rem',
              }}
            >
              Edit
            </Button>
          </form>
          <CloseButton onClick={handleCloseEditModal} />
        </Box>
      </Modal>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        >
        <DialogTitle>
          {'Do you want to delete the selected project?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is irrevocable
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={handleCloseDeleteDialog}
            >Cancel</Button>
          <Button
            color='error'
            variant='contained'
            onClick={() => {
              handleDelete(activeProject!);
              handleCloseDeleteDialog();
            }}
            >Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Projects;
