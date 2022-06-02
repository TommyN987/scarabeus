import { useState, useEffect, useContext, FormEvent } from 'react';

import Container from "@mui/material/Container";
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
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import { AuthContext } from '../../contexts/AuthContext';
import { User, Project } from '../../types/types';
import { fetchAllUsers, updateUserProjects } from '../../dbOperations/userOperations';
import { createProject, fetchAllProjects, fetchOneProject } from '../../dbOperations/projectOperations';

const Projects = () => {

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [openCreationModal, setOpenCreationModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectPersonnel, setNewProjectPersonnel] = useState<string[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [trigger, setTrigger] = useState(false);

  const userContext = useContext(AuthContext);

  const handleOpenCreationModal = () => setOpenCreationModal(true);
  const handleCloseCreationModal = () => setOpenCreationModal(false);
  const handlePersonnelSelectChange = (e: SelectChangeEvent<typeof newProjectPersonnel>) => {
    const {
      target: { value },
    } = e;
    setNewProjectPersonnel(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleOpenDetailsModal = async (project: string) => {
    const fetchedProject = await fetchOneProject(project);
    setActiveProject(fetchedProject)
    setOpenDetailsModal(true)
  };
  const handleCloseDetailsModal = () => setOpenDetailsModal(false);

  useEffect(() => {
    fetchAllUsers()
      .then(users => setAllUsers(users))
      .catch(err => alert(err));
  }, []);

  useEffect(() => {
    fetchAllProjects()
      .then(projects => {
        if (userContext?.activeUser?.role === 'Admin') {
          setAllProjects(projects)
        } else {
          const projectsToDisplay = projects.filter(project => project.personnel.includes(userContext!.activeUser!.name));
          setAllProjects(projectsToDisplay)
        }
      })
      .catch(err => alert(err))
  }, [trigger, userContext])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // CREATE PROJECT IN DB
    try {
      createProject(
        {
          title: newProjectTitle,
          description: newProjectDescription,
          personnel: newProjectPersonnel,
          tickets: []
        }
      )
    } catch (error: any) {
      console.log(error.message)
    }

    // UPDATES USER OBJECTS' PROJECT FIELDS WITH THE NEW PROJECT
    try {
      newProjectPersonnel.forEach(username => {
        updateUserProjects(username, newProjectTitle)
      })
    } catch(error: any) {
      console.log(error.message)
    }
    
    setNewProjectTitle('');
    setNewProjectDescription('');
    setNewProjectPersonnel([]);
    handleCloseCreationModal();
    setTrigger(trigger => !trigger)
  };

  return (
    <div className="inner-content">
      <Container
        sx={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
        >
        <Paper
          elevation={10}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1.5rem',
            minWidth: '830px',
          }}
          >
          <Typography
            variant="h4"
            fontWeight={600}
            >
            My Projects
          </Typography>
          <TableContainer sx={{ 
            marginTop: '2rem',
            overflow: 'auto'
            }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow className='table-head'>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Personnel</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allProjects.map(project => (
                  <TableRow className='table-body' key={project.title}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>
                      <ul>
                        {project.personnel.map(user => (
                        <li className='project-table-personnel' key={user}>{user}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className='inline-icons'>
                      <InfoIcon 
                        color='action'
                        onClick={() => handleOpenDetailsModal(project.title)}
                        /><EditIcon color='action' /><DeleteIcon color='action' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Button 
          variant='contained'
          startIcon={<CreateNewFolderIcon />}
          onClick={handleOpenCreationModal}
          sx={{
            width: '30%',
            alignSelf: 'center'
          }}
          >
          Create New Project
        </Button>
        <Modal
          open={openCreationModal}
          onClose={handleCloseCreationModal}
          >
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
              color='primary'
              fontWeight={600}
              textAlign='center'
              >
              Create New Project
            </Typography>
            <form 
              className='new-project-form'
              onSubmit={handleSubmit}>
              <FormControl>
                <InputLabel htmlFor='title'>Title</InputLabel>
                <Input
                  required
                  type='text'
                  name='title'
                  id='title'
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor='description'>Description</InputLabel>
                <Input
                  required
                  type='text'
                  name='description'
                  id='description'
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel id='personnel-select-label'>Select personnel</InputLabel>
                <Select
                  labelId='personnel-select-label'
                  id='personnel-select'
                  multiple
                  required
                  value={newProjectPersonnel}
                  onChange={handlePersonnelSelectChange}
                  input={<OutlinedInput label='Select personnel' />}
                  renderValue={(selected): React.ReactNode => {
                    return <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5
                      }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>;
                  }}
                  >
                  {allUsers.map(user => (
                    <MenuItem
                      key={user.name}
                      value={user.name}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: '1rem',
                  fontSize: '1.2rem'
                }}
                >Create</Button>
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
              width: '500px',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
            >
            <Typography 
              variant="h5"
              color='primary'
              fontWeight={600}
              textAlign='center'
              >
              {activeProject?.title}
            </Typography>
          </Box>
        </Modal>
      </Container>
    </div>
  )
}
export default Projects