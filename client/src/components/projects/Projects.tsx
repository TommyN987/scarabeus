import { useState, useEffect, FormEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';

import { Project, User } from '../../types/types';
import { fetchAllUsers, updateUserProjects } from '../../dbOperations';

const Projects = () => {

  const [allUsers, setAllUsers] = useState<User[]>([])
  const [openModal, setOpenModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectPersonnel, setNewProjectPersonnel] = useState<string[]>([]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handlePersonnelSelectChange = (e: SelectChangeEvent<typeof newProjectPersonnel>) => {
    const {
      target: { value },
    } = e;
    setNewProjectPersonnel(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    fetchAllUsers()
      .then(users => setAllUsers(users))
      .catch(err => alert(err))
  },[]);

  const createProject = (project: Project) => {
    fetch('http://localhost:5000/dashboard/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    handleCloseModal();
  };

  return (
    <div className="inner-content">
      <Button 
        variant='contained'
        onClick={handleOpenModal}>
        Create New Project
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
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
    </div>
  )
}
export default Projects