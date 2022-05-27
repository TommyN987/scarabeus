import { useContext } from 'react';

import { Button } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';

const Dashboard = () => {

  const userContext = useContext(AuthContext);
  console.log(userContext?.activeUser)

  return (
    <>
      <h1>Dashboard</h1>
      <div>User: {userContext && userContext.activeUser ? userContext.activeUser.name : 'test'}</div>
      <Button 
        variant='contained'
        >Logout
      </Button>
    </>
  )
}
export default Dashboard