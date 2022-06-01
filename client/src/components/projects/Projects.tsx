import { useState } from 'react';

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
import Chip from '@mui/material/Chip'


const Projects = () => {

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

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

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
          <form className='new-project-form'>
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
                {names.map(name => (
                  <MenuItem
                    key={name}
                    value={name}>
                    {name}
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