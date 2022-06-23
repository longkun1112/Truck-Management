import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const theme = createTheme();

const SignUp = ({users, addUser}) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    const checkEmailExists = users.filter((user) => 
      user.email === email ? user : null
    )

    if (!name || !email || !phone || !image ) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkEmailExists.length > 0) {
      return toast.error("This Email is already exists!!");
    }

    const data = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 0,
      name,
      email,
      dob,
      phone,
      role: 'Operator',
      image
    };

    addUser(data);
    toast.success("User Sign Up successfully!!");
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              autoComplete="current-password"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image"
              id="image"
              autoComplete="current-password"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              id="phone"
              autoComplete="current-password"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => ({
  users: state,
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (data) => {
    dispatch({ type: 'ADD_USER', payload: data });
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)