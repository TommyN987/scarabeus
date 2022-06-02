import { useState, useContext, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, Button, Card, CardContent, FormControl, Input, InputLabel, Typography } from "@mui/material";

import { AuthContext, loginUser } from "../../contexts/AuthContext";
import { fetchOneUser } from "../../dbOperations/userOperations";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // login with firebase
      await loginUser(email, password);
      // get user data from db
      const loggedInUser = await fetchOneUser(email);
      userContext?.setActiveUser({
        email: loggedInUser.email,
        password: loggedInUser.password,
        name: loggedInUser.name,
        role: loggedInUser.role,
        projects: loggedInUser.projects,
      });
      navigate('/dashboard')
    } catch(err: any) {
      console.log(err.message);
      alert('Invalid email or password');
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
          top: '20%',
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
            Login
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
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                required
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                required
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: '1rem',
                fontSize: '1.2rem'
              }}
              >Login</Button>
          </Box>
        </CardContent>
        <Typography 
            component="p"
            fontSize='1rem'
            fontWeight={400}
            textAlign='center'
            color='black'
            >
            Don't have an account yet? <Link to='/register'>Register</Link>
          </Typography>
      </Card>
    </div>
  )
}
export default Login