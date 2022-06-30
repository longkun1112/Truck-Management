import React, { useEffect, useState } from 'react';
import "./Table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';
import { toast } from "react-toastify";

const makeStyle1=(role)=>{
  if(role === 'Admin')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(role === 'Operator')
  {
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
  else{
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
}

const UserManagement = () => {
  const navigate = useNavigate();
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

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`)
    .then(() => {
      toast.success("Users deleted successfully!!");
      getUsers()
    });
  }

  const [user, setUser] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUser(currentUser);
    }
    console.log("user", user)
  }, []);

  return (
    <div className="Table">
      <h1 style={{textAlign: 'center', marginTop: "80px"}}>User Management</h1>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Date Of Birth</TableCell>
                <TableCell align="left">Role Management</TableCell>
                {user && user.role === 'Admin' && <TableCell align="left" className="Details" onClick={() => navigate('/userManagement/add')}>Add</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {users.length > 0 ? 
                (users.map((user, id) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{user.id + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
                  <TableCell align="left">{user.dob}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle1(user.role)}>{user.role}</span>
                  </TableCell>
                  <TableCell align="left" className="Details" 
                    onClick={() => 
                      navigate(`/userManagement/edit/${user.id}`, 
                        {
                          state:{
                            email: user.email,
                            password: user.password,
                            name: user.name,
                            phone: user.phone,
                            dob: user.dob,
                            image: user.image,
                            role: user.role
                          }
                        }
                      )}
                    >Edit</TableCell>
                  <TableCell align="left" className="Delete" onClick={() => deleteUser(user.id)}>Delete</TableCell>
                </TableRow>
              ))) : (
                <>
                  <tr>
                    <th>No users found</th>
                  </tr>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}

const mapStateToProps = (state) => ({
  users: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (id) => {
    dispatch({ type: "DELETE_USER", payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)