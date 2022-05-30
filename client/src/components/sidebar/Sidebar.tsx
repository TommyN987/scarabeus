import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import TopicIcon from '@mui/icons-material/Topic';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';

import scarab from '../../assets/images/scarab-logo.png';
import { AuthContext, logoutUser } from '../../contexts/AuthContext';
import { theme } from '../../styles/custom-theme';

const Sidebar = () => {

  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      userContext?.setActiveUser(null);
      navigate('/');
    } catch(err: any) {
      console.log(err.message)
    }
  }

  const menuItems = [
    {
      text: 'Dashboard Home',
      icon: <DashboardIcon />,
      path: '/dashboard',
      visibleFor: ''
    },
    {
      text: 'Manage Users',
      icon: <GroupIcon />,
      path: '/dashboard/users'
    },
    {
      text: 'My Projects',
      icon: <TopicIcon />,
      path: '/dashboard/projects'
    },
    {
      text: 'My Tickets',
      icon: <AssignmentIcon />,
      path: '/dashboard/tickets'
    },
    {
      text: 'User Profile',
      icon: <PersonIcon />,
      path: '/dashboard/profile'
    },
  ]

  return (
    <>
      <div className="app-bar">
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            left: '300px',
            top: '18px',
            color: `${theme.palette.text.primary}`
          }}
          >
        User: {userContext?.activeUser?.name || 'test'}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            left: '600px',
            top: '18px',
            color: `${theme.palette.text.primary}`
          }}
          >
        Role: {userContext?.activeUser?.role || 'test'}
        </Typography>
        <Button 
          variant='contained'
          color="error"
          size="medium"
          sx={{
            width: '150px',
            position: 'absolute',
            top: '1rem',
            right: '2.6rem'
          }}
          onClick={handleLogout}
          >Logout
        </Button>
      </div>
      <Drawer
        variant='permanent'
        anchor="left"
        PaperProps={{
          sx: {
            backgroundColor: '#dde8f2',
            width: '280px'
          }
        }}
        >
        <div className='brand'>
          <img className='logo' src={scarab} alt="" />
          <div>
            <Typography
              variant="h4"
              fontFamily='Cairo'
              fontWeight={800}
            >
            SCARABEUS
            </Typography>
            <Typography
              variant="h6"
              fontFamily='Cairo'
              fontWeight={600}
              sx={{
                marginTop: '-1rem',
              }}
            >
            bug tracker
            </Typography>
          </div>
        </div>
        <List>
          {menuItems.map(item => (
            <ListItem 
              key={item.text}
              sx={{
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#c0d9f1'
                }
              }}
              onClick={() => navigate(item.path)}
              >
              <ListItemIcon
                sx={{
                  color: '#592913'
                }}
                >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
export default Sidebar