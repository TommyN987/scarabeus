import { useState, useEffect, FormEvent } from "react";

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

import { User, UserDB } from "../../types/types";

const Users = () => {

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUserToDelete, setSelectedUserToDelete] = useState('');

  const fetchAllUsers = async () => {
    const allUsersInDb: User[] = [];
    const res = await fetch('http://localhost:5000/dashboard/users');
    const users: UserDB[] = await res.json();
    users.forEach((user: UserDB) => {
      const userToAdd: User = {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        projects: user.projects
      };
      allUsersInDb.push(userToAdd);
    });
    setAllUsers(allUsersInDb);
  };

  useEffect(() => {
    fetchAllUsers();
  },[allUsers])
  
  const roles = [
    'Admin',
    'Project Manager',
    'Developer',
    'Submitter'
  ];

  const handleSelectedUserChange = (e: SelectChangeEvent) => {
    setSelectedUser(e.target.value)
  };

  const handleSelectedRoleChange = (e: SelectChangeEvent) => {
    setSelectedRole(e.target.value)
  };

  const handleSelectedUserToDeleteChange = (e: SelectChangeEvent) => {
    setSelectedUserToDelete(e.target.value)
  };

  const handleRoleAssignment = async (name: string, role: string) => {
    await fetch(`http://localhost:5000/dashboard/users/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, role: role})
    });
    setSelectedRole('');
    setSelectedUser('');
  }

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
                  onClick={(e: FormEvent) => {
                    e.preventDefault();
                    handleRoleAssignment(selectedUser, selectedRole);
                  }}
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
                        value={user.name}
                        >{user.name}</MenuItem>
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