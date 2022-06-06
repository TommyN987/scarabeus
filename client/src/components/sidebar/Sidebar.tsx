import { useContext, useState } from 'react';
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

  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Users' | 'Projects' | 'Tickets' | 'Profile'>('Dashboard')

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

  return (
    <>
      <div className="app-bar">
        <Typography
          variant="h6"
          sx={{
            color: `${theme.palette.text.primary}`
          }}
          >
        User: {userContext?.activeUser?.name || 'test'}
        </Typography>
        <Typography
          variant="h6"
          sx={{
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
            width: '250px'
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
            <ListItem 
              className={activeTab === 'Dashboard' ? 'sidebar-nav sidebar-active-nav' : 'sidebar-nav'}
              onClick={() => {
                navigate('/dashboard');
                setActiveTab('Dashboard');
                }}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary='Dashboard Home' />
            </ListItem>
            {userContext?.activeUser?.role === 'Admin' && <ListItem 
              className={activeTab === 'Users' ? 'sidebar-nav sidebar-active-nav' : 'sidebar-nav'}
              onClick={() => {
                navigate('/dashboard/users');
                setActiveTab('Users');
                }}>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary='Manage Users' />
            </ListItem>}
            <ListItem 
              className={activeTab === 'Projects' ? 'sidebar-nav sidebar-active-nav' : 'sidebar-nav'}
              onClick={() => {
                navigate('/dashboard/projects');
                setActiveTab('Projects');
                }}>
              <ListItemIcon><TopicIcon /></ListItemIcon>
              <ListItemText primary='Projects' />
            </ListItem>
            <ListItem 
              className={activeTab === 'Tickets' ? 'sidebar-nav sidebar-active-nav' : 'sidebar-nav'}
              onClick={() => {
                navigate('/dashboard/tickets');
                setActiveTab('Tickets');
                }}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary='Tickets' />
            </ListItem>
            <ListItem 
              className={activeTab === 'Profile' ? 'sidebar-nav sidebar-active-nav' : 'sidebar-nav'}
              onClick={() => {
                navigate('/dashboard/profile')
                setActiveTab('Profile')
                }}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary='User Profile' />
            </ListItem>
        </List>
      </Drawer>
    </>
  )
}
export default Sidebar