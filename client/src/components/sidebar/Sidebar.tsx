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
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

import scarab from '../../assets/images/scarab-logo.png';
import { AuthContext, logoutUser } from '../../contexts/AuthContext';
import { theme } from '../../styles/custom-theme';

const Sidebar = () => {

  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Users' | 'Projects' | 'Tickets' | null>('Dashboard');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: any) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
      userContext?.setActiveUser(null);
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <>
      <div className="app-bar">
        <Typography
          variant="h6"
          sx={{
            color: `${theme.palette.text.primary}`
          }}>
          Welcome, {userContext?.activeUser?.name || 'test'}!
        </Typography>
        <Tooltip title='Account settings'>
          <AccountCircleIcon 
            fontSize='large'
            color='action'
            sx={{ cursor: 'pointer'}}
            onClick={handleClick} />
        </Tooltip>
        
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
              }}>
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
          {userContext?.activeUser?.role === 'Admin' && 
          <ListItem 
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
        </List>
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          User: &nbsp; <strong>{userContext?.activeUser?.name}</strong>
        </MenuItem>
        <MenuItem>
          Role:&nbsp; <strong>{userContext?.activeUser?.role}</strong>
        </MenuItem>
        <MenuItem
          onClick={() => navigate('/dashboard/profile')}
          >
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <Button 
            variant='contained'
            color="error"
            size="medium"
            startIcon={<LogoutIcon />}
            sx={{
              width: '150px',
            }}
            onClick={handleLogout}
            >Logout
          </Button>
        </MenuItem>
      </Menu>
    </>
  )
}
export default Sidebar