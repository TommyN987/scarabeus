import { useContext, useEffect, useState } from "react";

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { AuthContext } from "../../contexts/AuthContext";
import { fetchAllProjects } from "../../dbOperations/projectOperations";
import { Project, Ticket } from "../../types/types";

const Profile = () => {

  const userContext = useContext(AuthContext);

  const [projects, setProjects] = useState<Project[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetchAllProjects()
      .then((projects) => {
        if (userContext?.activeUser?.role === 'Admin') {
          setProjects(projects);
        } else {
          const projectsToDisplay = projects.filter((project) =>
            project.personnel.includes(userContext!.activeUser!.name)
          );
          setProjects(projectsToDisplay);
        }
      })
      .catch((err) => alert(err));
  }, [userContext]);

  useEffect(() => {
    const userTickets: Ticket[] = [];

    if (userContext?.activeUser?.role === 'Admin') {
      projects.forEach(project => {
        project.tickets.forEach(ticket => {
          userTickets.push(ticket)
        })
      })
    } else {
      projects.forEach(project => {
      project.tickets.forEach(ticket => {
        if (ticket.solver === userContext?.activeUser?.name) {
          userTickets.push(ticket);
        }
      })
    });
    }
    setTickets(userTickets);
  }, [projects, userContext?.activeUser])

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
              <div className="user-roles-form">
                <Typography
                  variant="h4"
                  fontWeight={600}
                  sx={{
                    margin: '1rem 0'
                  }}
                  >
                  User Info
                </Typography>
                <div className="profile">
                  <Typography
                    component='span'
                    variant="h6"
                    >Name:
                  </Typography>
                  <Typography
                    component='span'
                    variant="h6"
                    >{userContext?.activeUser?.name}
                  </Typography>
                </div>
                <div className="profile">
                  <Typography
                    component='span'
                    variant="h6"
                    >Email:
                  </Typography>
                  <Typography
                    component='span'
                    variant="h6"
                    >{userContext?.activeUser?.email}
                  </Typography>
                </div>
                <div className="profile">
                  <Typography
                    component='span'
                    variant="h6"
                    >Role:
                  </Typography>
                  <Typography
                    component='span'
                    variant="h6"
                    >{userContext?.activeUser?.role}
                  </Typography>
                </div>

              </div>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Container
            sx={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
            <Paper 
              elevation={10}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem'
              }}>
              <Typography
                variant="h4"
                fontWeight={600}
                sx={{
                  margin: '1rem 0'
                }}
                >
                My Tickets
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead 
                    sx={{
                      backgroundColor: '#1976d2'
                    }}>
                    <TableRow className="table-head">
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tickets.map(ticket => (
                      <TableRow className="table-body" key={ticket._id}>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>{ticket.description}</TableCell>
                        <TableCell>{ticket.priority}</TableCell>
                        <TableCell>{ticket.status}</TableCell>
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
export default Profile