import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';

const AddUserManagement = ({users, addUser}) => {
  const navigate = useNavigate();

  // const [truckPlate, setTruckPlate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkEmailExists = users.filter((user) => 
      user.email === email ? user : null
    )

    if (!name || !email || !dob || !phone || !role || !image ) {
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
      role,
      image
    };

    addUser(data);
    toast.success("User added successfully!!");
    navigate("/userManagement");
  }

  return (
    <div className="MainDash">
      <h1 style={{marginTop: '80px'}}>Add</h1>
      <form style={{width: "80%", margin: 'auto'}} onSubmit={handleSubmit}>
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Name"
        variant="outlined"
        value={name}
        placeholder={"Name"}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Email"
        variant="outlined"
        value={email}
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Phone"
        variant="outlined"
        value={phone}
        placeholder={"Phone"}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Date Of Birth"
        variant="outlined"
        value={dob}
        placeholder={"Date Of Birth"}
        onChange={(e) => setDob(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Role"
        variant="outlined"
        value={role}
        placeholder={"Role"}
        onChange={(e) => setRole(e.target.value)}
      />
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
          // onClick={() => handleSubmit()}
          type='submit'
          color="success"
          style={{width: '180px', height: '50px', fontSize: "18px"}}
        >Add</Button>
        </div>
      </form>
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