import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';
import { addUserAction, deleteUserAction } from '../redux/saga/actions/UserAction';

const AddUserManagement = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const dispatch = useDispatch();

  return (
    <div className="MainDash">
      <h1 style={{marginTop: '80px'}}>Add</h1>
      <Formik
       initialValues={{ email: '', password: '', name: '', phone: '', dob: '', role: '', image: '' }}
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
         if (!values.image) {
          errors.image = 'Image is required';
         }
         return errors;
       }}
       onSubmit={async (values, { setSubmitting }) => {
        const {name, password, email, dob, phone, image} = values;
        const data = {
          name: name,
          password: password,
          email: email,
          dob: dob,
          phone: phone,
          role: role,
          image: image
        };
        dispatch(addUserAction(data))
        toast.success("User added successfully!!");
        dispatch({type: "GET_ALL_USER"})
        navigate("/userManagement");
        }
      }
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
              <FormControl sx={{ m: 1, width: 600 }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={handleChangeRole}>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"Operator"}>Operator</MenuItem>
                  <MenuItem value={"Driver"}>Driver</MenuItem>
                </Select>
              </FormControl>
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
              <Button style={{position: 'absolute', top: "90px", right: "150px"}} variant="contained" onClick={() => navigate("/userManagement")}>Go back</Button>
              <div style={{justifyContent: 'space-around', display: 'flex', marginTop: 0}}>
              <Button variant="contained" 
                type='submit'
                color="success"
                style={{width: '180px', height: '50px', fontSize: "18px"}}
              >Add</Button>
              </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AddUserManagement;

    
