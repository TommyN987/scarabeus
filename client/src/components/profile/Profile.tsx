import { useContext } from "react";

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

const Profile = () => {

  const userContext = useContext(AuthContext);

  return (
    <div className="inner-content">
      <Grid container>
        <Grid item xs={12} lg={3}>
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
                    >Name:</Typography>
                  <Typography
                    component='span'
                    variant="h6"
                    >{userContext?.activeUser?.name}</Typography>
                </div>
                <div className="profile">
                  <Typography
                    component='span'
                    variant="h6"
                    >Email:</Typography>
                  <Typography
                    component='span'
                    variant="h6"
                    >{userContext?.activeUser?.email}</Typography>
                </div>
                <div className="profile">
                  <Typography
                    component='span'
                    variant="h6"
                    >Role:</Typography>
                  <Typography
                    component='span'
                    variant="h6"
                    >{userContext?.activeUser?.role}</Typography>
                </div>

              </div>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}
export default Profile