import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

const EditUserManagement = () => {
  // const EditUserManagement = ({users, updateUser}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  // const currentUser = users.find(
  //   (user) => user.id === parseInt(id)
  // );
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState("");

  useEffect(() => {
    // setName( user?.name);
    // setEmail( user?.email);
    // setDob( user?.dob);
    // setPhone( user?.phone);
    // setRole( user?.role);
    getUserById(id);
    console.log('test', user?.name)
    console.log('id', id)
  }, []);

  const getUserById = async (id) => {
    await axios.get(`http://localhost:8000/users/${id}`)
    .then(function (response) {
      console.log(response.data);
      setUser(response.data)
      setName(user?.name);
      setEmail(user?.email);
      setDob(user?.dob);
      setPhone(user?.phone);
      setRole(user?.role);
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

    // updateUser(data);
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
      toast.success("Users edited successfully!!");
      navigate("/userManagement");
      // getUsers()
    });
    // toast.success("User edited successfully!!");
    // navigate("/userManagement");
  }

  return (
    <div className="MainDash">
      <h1 style={{marginTop: '80px'}}>Edit</h1>
      
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
        label="Phone"
        variant="outlined"
        value={phone || ''}
        placeholder={"Phone"}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Date Of Birth"
        variant="outlined"
        value={dob || ''}
        placeholder={"Date Of Birth"}
        onChange={(e) => setDob(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Role"
        variant="outlined"
        value={role || ''}
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
        >Edit</Button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: state,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => {
    dispatch({ type: "UPDATE_USER", payload: data });
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserManagement);