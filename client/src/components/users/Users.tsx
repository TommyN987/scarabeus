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

import { User } from "../../types/types";
import { deleteUserFromFirebase, AuthContext } from "../../contexts/AuthContext";
import { fetchAllUsers, updateUserRole, deleteUser } from "../../dbOperations/userOperations";

const Users = () => {

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUserToDelete, setSelectedUserToDelete] = useState('');
  const [trigger, setTrigger] = useState(false);

  const userContext = useContext(AuthContext);

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

  const handleRoleAssignment = async (e: FormEvent) => {
    e.preventDefault();
    await updateUserRole(selectedUser, selectedRole)
    setSelectedRole('');
    setSelectedUser('');
    setTrigger(trigger => !trigger);
  };

  const handleDelete = (e: FormEvent) => {
    e.preventDefault()
    
    // DELETION FROM DB
    deleteUser(selectedUserToDelete);

    // DELETION FROM FIREBASE
    const userToDelete = allUsers.find(user => user.email === selectedUserToDelete);

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
            }}
            >
            <Paper>
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
                    onChange={handleSelectedUserChange}
                    >
                    {allUsers.map(user => (
                      <MenuItem
                        key={user.email}
                        value={user.name}
                        >{user.name}</MenuItem>
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
                    onChange={handleSelectedRoleChange}
                    >
                    {roles.map(role => (
                      <MenuItem
                        key={role}
                        value={role}
                        >{role}</MenuItem>
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
                  onClick={handleRoleAssignment}
                  >
                  Assign
                </Button>
              </form>
            </Paper>
            <Paper>
              <form className="user-roles-form">
                <Typography
                  variant="h4"
                  fontWeight={600}
                  >
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
                    onChange={handleSelectedUserToDeleteChange}
                    >
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
                  onClick={handleDelete}
                  >
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
            }}
            >
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.5rem'
              }}
              >
              <Typography
                variant="h4"
                fontWeight={600}
                >
                All Personnel
              </Typography>
              <TableContainer
                sx={{
                  marginTop: '1rem'
                }}
                >
                <Table>
                  <TableHead
                    sx={{
                      backgroundColor: '#1976d2'
                    }}
                    >
                    <TableRow className='table-head'>
                      <TableCell>User Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allUsers.map(user => (
                      <TableRow className="table-body" key={user.email}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}
export default Users