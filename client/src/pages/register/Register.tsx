import { Link } from "react-router-dom";

import { Box, Button, Card, CardContent, FormControl, Input, InputLabel, Typography } from "@mui/material";

import { User } from "../../types/types";

const Register = () => {
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
            fontSize='1.5rem'
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
            >
              <FormControl>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <Input
                required
                type="text"
                name="name"
                id="name"
              ></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                required
                type="email"
                name="email"
                id="email"
              ></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                required
                type="password"
                name="password"
                id="password"
              ></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
              <Input
                required
                type="password"
                name="confirm-password"
                id="confirm-password"
              ></Input>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: '1rem',
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