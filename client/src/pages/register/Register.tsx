import { FormEvent, useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

import { AuthContext, createUserInFirebase } from '../../contexts/AuthContext';
import { createUser } from '../../dbOperations/userOperations';
import { User } from "../../types/types";

const Register = () => {
  
  const [newUser, setNewUser] = useState<User>(
    {
      email: '',
      password: '',
      name: '',
      role: 'Submitter',
      projects: []
    }
  );
  const [confirmPassword, setConfirmPassword] = useState('');

  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // FORM VALIDATION
    if (newUser.password !== confirmPassword) {
      alert("Passwords don't match");
      return
    } else if (newUser.password.length < 6 || newUser.password.length > 20) {
      alert('Password must contain between 6 and 20 characters');
      return
    } else if (newUser.password.match(/[A-Z]/) === null) {
      alert('Password must contain a capital letter');
      return
    } else if (newUser.password.match(/[1-9]/) === null) {
      alert('Password must contain a number');
      return
    }

    try {
      
      // CREATE USER IN FIREBASE
      await createUserInFirebase(newUser.email, newUser.password);
      
      // CREATE USER IN DB
      await createUser(newUser);
      userContext?.setActiveUser(newUser);
      navigate('/dashboard');

    } catch(err: any) {
      console.log(err.message)
    }
  }
  
  return (
    <div className="home-bg">
      <Typography
        component='h1'
        fontFamily='Cairo'
        fontSize='clamp(3rem, 6.5vw, 8rem)'
        fontWeight={900}
        sx={{
          marginLeft: '2rem',
          paddingTop: '2rem',
          color: '#592913',
          lineHeight: 'clamp(3rem, 6.5vw, 8rem)'
        }}>
        SCARABEUS
      </Typography>
      <Typography
        component='h5'
        fontFamily='Cairo'
        fontSize='clamp(1.5rem, 4vw, 4rem)'
        fontWeight={600}
        sx={{
          marginLeft: '2rem',
          color: '#592913',
          lineHeight: 'clamp(1.5rem, 4vw, 4rem)'
        }}>
        bug tracker
      </Typography>
      <Card
        sx={{
          width: '350px',
          padding: '1rem',
          position: "absolute",
          top: '13.5%',
          left: '50%',
          transform: 'translate(-50%, 0)'
        }}
        >
        <CardContent>
          <Typography 
            component="h2"
            fontSize='2rem'
            fontWeight={600}
            textAlign='center'
            color='primary'
            >
            Register
          </Typography>
          <Box
            component='form'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '1rem'
            }}
            onSubmit={handleSubmit}
            >
              <FormControl>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <Input
                required
                type="text"
                name="name"
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({
                  ...newUser,
                  name: e.target.value
                })}
              ></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                required
                type="email"
                name="email"
                id="email"
                value={newUser.email}
                onChange={(e) => setNewUser({
                  ...newUser,
                  email: e.target.value
                })}
              ></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                required
                type="password"
                name="password"
                id="password"
                value={newUser.password}
                onChange={(e) => setNewUser({
                  ...newUser,
                  password: e.target.value
                })}
              ></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
              <Input
                required
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: '1rem',
                fontSize: '1.2rem'
              }}
              >Register</Button>
          </Box>
        </CardContent>
        <Typography 
            component="p"
            fontSize='1rem'
            fontWeight={400}
            textAlign='center'
            color='black'
            >
            Already have an account? <Link to='/'>Login</Link>
          </Typography>
      </Card>
    </div>
  )
}
export default Register