import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const EditUserManagement = (props) => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  // const currentUser = users.find(
  //   (user) => user.id === parseInt(id)
  // );
  const [name, setName] = useState(location.state.name);
  const [password, setPassword] = useState(location.state.password);
  const [email, setEmail] = useState(location.state.email);
  const [dob, setDob] = useState(location.state.dob);
  const [phone, setPhone] = useState(location.state.phone);
  const [role, setRole] = useState(location.state.role);
  const [image, setImage] = useState(location.state.image);

  useEffect(() => {
    getUserById(id);
  }, []);

  const getUserById = async (id) => {
    await axios.get(`http://localhost:8000/users/${id}`)
    .then(function (response) {
      console.log(response.data);
      setUser(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const checkEmailExists = users.filter((user) => 
    //   user.email === email && user.id !== currentUser.id ? user : null
    // )

    if (!name || !email || !dob || !phone || !role ) {
      return toast.warning("Please fill in all fields!!");
    }
    // if (checkEmailExists.length > 0) {
    //   return toast.error("This Email is already exists!!");
    // }

    const data = {
      // id: currentUser.id,
      name,
      email,
      dob,
      phone,
      role,
    };

    await axios.put(`http://localhost:8000/users/${id}`, {
      name,
      email,
      password: password ? password : user.password,
      dob,
      phone,
      role,
      image: image ? image : user.image
    })
    .then(() => {
      toast.success("User edited successfully!!");
      navigate("/userManagement");
    });
    
  }

  return (
    <div className="MainDash">
      <h1 style={{marginTop: '80px'}}>Edit</h1>
      <div>{location.state?.name}</div>
      <form style={{width: "80%", margin: 'auto'}} onSubmit={handleSubmit}>
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Name"
        variant="outlined"
        value={name || ''}
        placeholder={"Name"}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Email"
        variant="outlined"
        value={email || ''}
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Password"
        variant="outlined"
        value={password || ''}
        placeholder={"Password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="number"
        label="Phone"
        variant="outlined"
        value={phone || ''}
        placeholder={"Phone"}
        onChange={(e) => setPhone(e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date Of Birth"
            value={dob}
            onChange={(newValue) => {
              setDob(newValue);
            }}
            renderInput={(params) => <TextField style={{ width: "600px", margin: "5px" }} {...params} />}
          />
        </LocalizationProvider>
      <FormControl sx={{ m: 1, width: 600 }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Role"
                  onChange={ (event) => 
                    setRole(event.target.value)}>
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
        value={image}
        placeholder={"Image"}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button style={{position: 'absolute', top: "90px", right: "150px"}} variant="contained" onClick={() => navigate("/userManagement")}>Go back</Button>
        <div style={{justifyContent: 'space-around', display: 'flex', marginTop: 70}}>
        <Button variant="contained" 
          type='submit'
          color="success"
          style={{width: '180px', height: '50px', fontSize: "18px"}}
        >Edit</Button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => {
    dispatch({ type: "UPDATE_USER", payload: data });
  },
})

export default EditUserManagement;