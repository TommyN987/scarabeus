import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import { AuthContext, logoutUser } from '../../contexts/AuthContext';

const Dashboard = () => {

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
      <h1>Dashboard</h1>
      <div>User: {userContext && userContext.activeUser ? userContext.activeUser.name : 'test'}</div>
      <Button 
        variant='contained'
        onClick={handleLogout}
        >Logout
      </Button>
    </>
  )
}
export default Dashboard