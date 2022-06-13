import { useState, useEffect, FormEvent, useContext } from "react";

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { User } from "../../types/types";
import { deleteUserFromFirebase, AuthContext } from "../../contexts/AuthContext";
import { fetchAllUsers, updateUserRole, deleteUser } from "../../dbOperations/userOperations";
import { updateProjectPersonnel } from '../../dbOperations/projectOperations'

const Users = () => {

  // ACTIVE USER
  const userContext = useContext(AuthContext);

  // STATE OF ALL USERS
  const [allUsers, setAllUsers] = useState<User[]>([]);
  
  // STATE FOR ROLE ASSIGNMENT
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  
  // STATE FOR USER DELETION
  const [selectedUserToDelete, setSelectedUserToDelete] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  // STATE FOR TRIGGERING FETCHALLUSERS
  const [trigger, setTrigger] = useState(false);

  const roles = [
    'Admin',
    'Project Manager',
    'Developer',
    'Submitter'
  ];

  useEffect(() => {
    fetchAllUsers()
      .then(users => setAllUsers(users))
      .catch(err => alert(err))
  },[trigger]);

  const handleSelectedUserChange = (e: SelectChangeEvent) => {
    setSelectedUser(e.target.value)
  };

  const handleSelectedRoleChange = (e: SelectChangeEvent) => {
    setSelectedRole(e.target.value)
  };

  const handleSelectedUserToDeleteChange = async (e: SelectChangeEvent) => {
    setSelectedUserToDelete(e.target.value);
  };

  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleRoleAssignment = async (e: FormEvent) => {
    e.preventDefault();
    await updateUserRole(selectedUser, selectedRole)
    setSelectedRole('');
    setSelectedUser('');
    setTrigger(trigger => !trigger);
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault()
    
    // DELETION FROM DB
    await deleteUser(selectedUserToDelete);

    const userToDelete = allUsers.find(user => user.email === selectedUserToDelete);

    // DELETION OF USER FROM HIS PROJECTS 
    userToDelete?.projects.forEach(async (project) => {
      await updateProjectPersonnel(project, userToDelete.name)
    });

    // DELETION FROM FIREBASE
    if (userContext && userContext.activeUser && userToDelete) {
      deleteUserFromFirebase(userContext?.activeUser?.email, userContext?.activeUser?.password, userToDelete?.email, userToDelete?.password)
    }

    setSelectedUserToDelete('');
    setTrigger(trigger => !trigger);
  };

  return (
    <div className="inner-content">
      <Grid container>
        <Grid item xs={12} lg={4}>
          <Container
            sx={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
            <Paper elevation={10}>
              <form className="user-roles-form">
                <Typography
                  variant="h4"
                  fontWeight={600}
                  >
                  Assign Role
                </Typography>
                <FormControl sx={{width: '100%'}}>
                  <InputLabel id="user-select-label">Select a User</InputLabel>
                  <Select
                    labelId="user-select-label"
                    id="user-select"
                    value={selectedUser}
                    label="Select a User"
                    sx={{
                      width: '100%'
                    }}
                    onChange={handleSelectedUserChange}>
                    {allUsers.map(user => (
                      <MenuItem
                        key={user.email}
                        value={user.name}
                        >{user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{width: '100%'}}>
                  <InputLabel id="role-select-label">Select a Role to Assign</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={selectedRole}
                    label="Select a Role to Assign"
                    sx={{
                      width: '100%'
                    }}
                    onChange={handleSelectedRoleChange}>
                    {roles.map(role => (
                      <MenuItem
                        key={role}
                        value={role}
                        >{role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    width: '40%'
                  }}
                  onClick={handleRoleAssignment}>
                  Assign
                </Button>
              </form>
            </Paper>
            <Paper elevation={10}>
              <form className="user-roles-form">
                <Typography
                  variant="h4"
                  fontWeight={600}>
                  Delete User
                </Typography>
                <FormControl sx={{width: '100%'}}>
                  <InputLabel id="user-delete-label">Select a User to Delete</InputLabel>
                  <Select
                    labelId="user-delete-label"
                    id="user-delete"
                    value={selectedUserToDelete}
                    label="Select a User to Delete"
                    sx={{
                      width: '100%'
                    }}
                    onChange={handleSelectedUserToDeleteChange}>
                    {allUsers.map(user => (
                      <MenuItem
                        key={user.email}
                        value={user.email}
                        >{user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  endIcon={<DeleteIcon />}
                  sx={{
                    width: '40%'
                  }}
                  onClick={(e: FormEvent) => {
                    e.preventDefault();
                    handleOpenDeleteDialog()
                  }}>
                  Delete
                </Button>
              </form>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Container
            sx={{
              padding: '1.5rem'
            }}>
            <Paper
              elevation={10}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.5rem'
              }}>
              <Typography
                variant="h4"
                fontWeight={600}>
                All Personnel
              </Typography>
              <TableContainer
                sx={{
                  marginTop: '1rem'
                }}>
                <Table>
                  <TableHead
                    sx={{
                      backgroundColor: '#1976d2'
                    }}>
                    <TableRow className='table-head'>
                      <TableCell>User Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Projects</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allUsers.map(user => (
                      <TableRow className="table-body" key={user.email}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <ul>
                            {user.projects.map(project => (
                              <li key={project}>{project}</li>
                            ))}
                          </ul>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </Grid>
      </Grid>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        >
        <DialogTitle>
          {'Do you want to delete the selected user?'}
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
            onClick={handleDelete}
            >Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Users