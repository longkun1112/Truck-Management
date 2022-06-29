import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';

const AddUserManagement = () => {
  // const AddUserManagement = ({users, addUser}) => {
  const navigate = useNavigate();

  // const [truckPlate, setTruckPlate] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !dob || !phone || !role ) {
      return toast.warning("Please fill in all fields!!");
    }
    // if (checkEmailExists.length > 0) {
    //   return toast.error("This Email is already exists!!");
    // }

    const data = {
      // id: users.length > 0 ? users[users.length - 1].id + 1 : 0,
      name,
      email,
      dob,
      phone,
      role,
    };

    await axios.post('http://localhost:8000/users', {
      name,
      password,
      email,
      dob,
      phone,
      role,
      image: image ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPSLHeCARXVSGgCgQNk43vrya5cinr6McfmARLozzMg&s'
    })
    .then(() => {
      toast.success("User added successfully!!");
      navigate("/userManagement");
    });
    // addUser(data);
  }

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

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
        //  setTimeout(() => {
        //    alert(JSON.stringify(values, null, 2));
        //    setSubmitting(false);
        //  }, 400);
        await axios.post('http://localhost:8000/users', {
            name: name,
            password: password,
            email: email,
            // dob: new Date(),
            dob: dob,
            phone: phone,
            role: role,
            image: image
          })
          .then(() => {
            toast.success("User added successfully!!");
            navigate("/userManagement");
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
              // onChange={(e) => setName(e.target.value)}
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
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
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
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
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
              // onChange={(e) => setPhone(e.target.value)}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone && touched.phone && errors.phone}
              helperText={errors.phone && touched.phone && errors.phone}
            />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Of Birth"
                  // value={dob}
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
                // onChange={(e) => setImage(e.target.value)}
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

      {/* <form style={{width: "100%", margin: 'auto'}} onSubmit={handleSubmit}>
      <TextField
        style={{ width: "600px",marginTop: '0px' , margin: "5px" }}
        type="text"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={isNameValid}
        helperText={isNameValid && "Name is required."}
      />
      <TextField
        style={{ width: "600px",marginTop: '0px' , margin: "5px" }}
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        error={isEmailValid}
        helperText={isEmailValid && "Email is required."}
      />
      <TextField
        style={{ width: "600px",marginTop: '50px' , margin: "5px" }}
        type="text"
        label="Password"
        variant="outlined"
        value={password}
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        error={isPassword}
        helperText={isPassword && "Password is required."}
      />
      <TextField
        style={{ width: "600px", marginTop: '50px' , margin: "5px" }}
        type="number"
        label="Phone"
        variant="outlined"
        value={phone}
        placeholder={"Phone"}
        onChange={(e) => setPhone(e.target.value)}
        error={isPhone}
        helperText={isPhone && "Phone is required."}
      />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date Of Birth"
            value={dob}
            onChange={(newValue) => {
              setDob(newValue);
            }}
            renderInput={(params) => <TextField
              error={isDob}
              helperText={isDob && "Date Of Birth is required."}
              style={{ width: "600px", marginTop: '50px' , margin: "5px" }} {...params} />}
          />
        </LocalizationProvider>
        <TextField
          style={{ width: "600px", marginTop: '50px' , margin: "5px" }}
          type="text"
          label="Image"
          variant="outlined"
          value={image}
          placeholder={"Image"}
          onChange={(e) => setImage(e.target.value)}
          error={isImage}
          helperText={isImage && "Image is required."}
        />
        <FormControl sx={{ m: 1, width: 600, marginTop: 7 }}>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={handleChange}
            error={isRole}
            helperText={isRole && "Role is required."}
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Operator"}>Operator</MenuItem>
            <MenuItem value={"Driver"}>Driver</MenuItem>
          </Select>
        </FormControl>
      
      <Button style={{position: 'absolute', top: "90px", right: "150px"}} variant="contained" onClick={() => navigate("/userManagement")}>Go back</Button>
        <div style={{justifyContent: 'space-around', display: 'flex', marginTop: 70}}>
        <Button variant="contained"
          type='submit'
          color="success"
          style={{width: '180px', height: '50px', fontSize: "18px"}}
        >Add</Button>
        </div>
      </form> */}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUserManagement)

    
