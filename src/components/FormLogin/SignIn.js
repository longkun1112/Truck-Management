import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { Formik } from 'formik';

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([])
  const getUsers = async () => {
    await axios.get('http://localhost:8000/users')
    .then(function (response) {
      console.log(response.data);
      setUsers(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    getUsers();
    console.log('test', users)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const emailLogin = users.find(user => user.email === email)
    console.log('test', email, password)
    const checkPasswordCorrect = emailLogin?.password === password;
    if(emailLogin && checkPasswordCorrect) {
        navigate('/')
        toast.success("Login successfully!!");
        localStorage.setItem('user', JSON.stringify(emailLogin))
    } else {
      toast.error("Email or Password is not correct!!");
    }
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
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box 
            // component="form" 
            // onSubmit={handleSubmit} 
            noValidate sx={{ mt: 1 }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              if (!values.password) {
                errors.password = 'Password is required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const {password, email} = values;

              const emailLogin = users.find(user => user.email === email)
              console.log('test',emailLogin)
              const checkPasswordCorrect = emailLogin?.password === password;
              if(emailLogin && checkPasswordCorrect) {
                  navigate('/vehicleInformation')
                  toast.success("Login successfully!!");
                  localStorage.setItem('user', JSON.stringify(emailLogin))
              } else {
                toast.error("Email or Password is not correct!!");
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form 
                onSubmit={handleSubmit}
              >
                <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email && errors.email}
              helperText={errors.email && touched.email && errors.email}
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
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password && errors.password}
              helperText={errors.password && touched.password && errors.password}
            />
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
              </form>
            )}
          </Formik>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to='/SignUp' variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}