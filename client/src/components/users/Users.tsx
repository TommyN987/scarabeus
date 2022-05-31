import { useState } from "react";

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

const Users = () => {

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUserToDelete, setSelectedUserToDelete] = useState('');

  const users = [
    'Tommy',
    'Katika',
    'Lianka',
    'Jony'
  ];
  
  const roles = [
    'Admin',
    'Project Manager',
    'Developer',
    'Submitter'
  ];

  const usersWithRoles = [
    {
      name: 'Tommy',
      email: 'tom@tom.com',
      role: 'Admin'
    },
    {
      name: 'Katika',
      email: 'kati@kati.com',
      role: 'Project Manager'
    },
    {
      name: 'Lianka',
      email: 'lianka@lianka.com',
      role: 'Developer'
    },
    {
      name: 'Jony',
      email: 'jony@jony.com',
      role: 'Submitter'
    },
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
        <Paper>
          <form className="user-roles-form">
            <Typography
              variant="h4"
              fontWeight={600}
              >
              Manage User Roles
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
                {users.map(user => (
                  <MenuItem
                    key={user}
                    value={user}
                    >{user}</MenuItem>
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
                width: '50%'
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
                {users.map(user => (
                  <MenuItem
                    key={user}
                    value={user}
                    >{user}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="error"
              endIcon={<DeleteIcon />}
              sx={{
                width: '50%'
              }}
              >
              Delete
            </Button>
          </form>
        </Paper>
      </Container>
      <Container>
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
                  backgroundColor: '#000'
                }}
                >
                <TableRow className='table-head'>
                  <TableCell>User Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersWithRoles.map(user => (
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
    </div>
  )
}
export default Users