import React, { useState, useEffect } from 'react';
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
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    await axios.post('http://localhost:8000/users', {
        name,
        password,
        email,
        dob,
        phone,
        role: "Operator",
        image: image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPSLHeCARXVSGgCgQNk43vrya5cinr6McfmARLozzMg&s'
      })
      .then(() => {
        toast.success("User register successfully!!");
        navigate("/");
        localStorage.setItem('user', JSON.stringify({
          name,
          password,
          email,
          dob,
          phone,
          role: "Operator",
          image: image
        }))
      });
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
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box 
            // component="form" 
            // onSubmit={handleSubmit} 
            noValidate sx={{ mt: 1 }}>
          <Formik
          initialValues={{ email: '', password: '', name: '', phone: '', dob: '', image: '' }}
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
            if (!values.phone) {
              errors.phone = 'Phone is required';
            }
            if (!values.name) {
              errors.name = 'Name is required';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const {name, password, email, dob, phone, image} = values;
            await axios.post('http://localhost:8000/users', {
                name: name,
                password: password,
                email: email,
                dob: dob,
                phone: phone,
                role: "Operator",
                image: image
              })
              .then(() => {
                toast.success("User register successfully!!");
                navigate("/vehicleInformation");
                localStorage.setItem('user', JSON.stringify({
                  name,
                  password,
                  email,
                  dob,
                  phone,
                  role: "Operator",
                  image: image === '' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPSLHeCARXVSGgCgQNk43vrya5cinr6McfmARLozzMg&s' : image 
                }))
              });
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
          <form style={{width: "100%", margin: 'auto'}} onSubmit={handleSubmit}>
            <TextField
              style={{ width: "600px", margin: "5px" }}
              type="text"
              label="Name"
              name='name'
              variant="outlined"
              placeholder={"Name"}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name && touched.name && errors.name}
              helperText={errors.name && touched.name && errors.name}
            />
            <TextField
              style={{ width: "600px", margin: "5px" }}
              type="text"
              label="Email"
              name='email'
              variant="outlined"
              placeholder={"Email"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              helperText={errors.email && touched.email && errors.email}
            />
            <TextField
              style={{ width: "600px", margin: "5px" }}
              type="text"
              name='password'
              label="Password"
              variant="outlined"
              placeholder={"Password"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password && errors.password}
              helperText={errors.password && touched.password && errors.password}
            />
            <TextField
              style={{ width: "600px", margin: "5px" }}
              type="number"
              label="Phone"
              variant="outlined"
              name='phone'
              value={values.phone}
              placeholder={"Phone"}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone && touched.phone && errors.phone}
              helperText={errors.phone && touched.phone && errors.phone}
            />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Of Birth"
                  value={values.dob}
                  onChange={(newValue) => {
                    values.dob = newValue;
                  }}
                  onBlur={handleBlur}
                  renderInput={(params) => <TextField 
                    style={{ width: "600px", margin: "5px" }} {...params} />}
                />
              </LocalizationProvider>
              <TextField
                style={{ width: "600px", margin: "5px" }}
                type="text"
                label="Image"
                variant="outlined"
                name='image'
                value={values.image}
                placeholder={"Image"}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.image && touched.image && errors.image}
                helperText={errors.image && touched.image && errors.image}
              />
              <div style={{justifyContent: 'space-around', display: 'flex', marginTop: 0}}>
              <Button variant="contained" 
                type='submit'
                color="success"
                style={{width: '180px', height: '50px', fontSize: "18px"}}
              >Register</Button>
              </div>
                </form>
              )}
            </Formik>
            {/* <TextField
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
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                label="Date Of Birth"
                openTo="year"
                views={['year', 'month', 'day']}
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue);
                }}
                renderInput={(params) => <TextField style={{width: "500px"}} {...params} />}
              />
            </LocalizationProvider>
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image"
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}