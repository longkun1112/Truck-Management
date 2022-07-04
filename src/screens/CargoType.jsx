import React, { useState, useEffect }  from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";
import {useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

import { addTaskAction, deleteTaskAction } from '../redux/saga/actions/CargoAction';

const CargoType = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cargoTypes, setCargoTypes] = useState([]);
  const [type, setType] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getCargoes = async () => {
    await axios.get('http://localhost:8000/cargoes')
    .then(function (response) {
      setCargoTypes(response.data)
      console.log(cargoTypes);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    dispatch({type: "GET_ALL_CARGO"})
  }, []);

  const deleteCargo = async (id) => {
    dispatch(deleteTaskAction(id))
    await getCargoes()
    dispatch({type: "GET_ALL_CARGO"})
    toast.success("Cargo deleted successfully!!");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const checkCargoTypeExists = cargoTypes.filter((cargoType) => 
    //   cargoType.cargoType === cargoType ? cargoType : null
    // )
    // if (checkCargoTypeExists.length > 0) {
    //   return toast.error("This Cargo Type already exists!!");
    // }

    if (!type) {
      return toast.warning("Please fill in the fields!!");
    }

    const data = {
      type,
    };

    dispatch(addTaskAction(data));
    toast.success("Cargo Type added successfully!!");
    dispatch({type: "GET_ALL_CARGO"})
    setType('')
    setOpen(false) 
  }

  const [user, setUser] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUser(currentUser);
    }
    console.log("user", user)
  }, []);

  const dispatch = useDispatch();

  const {dataCargo, isLoading} = useSelector(state => state.CargoReducer)
  console.log('123', dataCargo)


  return (

    <div className="Table">
      <h1 style={{textAlign: 'center', marginTop: "80px"}}>Cargo Types</h1>
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) 
        : (<>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Cargo Type</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                {user && user.role === 'Admin' && <TableCell align="left" className="Details" onClick={handleOpen}>Add</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
            {dataCargo?.length > 0 ? 
                (dataCargo.map((type, id) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{type.id + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {type.type}
                  </TableCell>
                  {user && user.role === 'Admin' &&<TableCell align="left" className="Details" 
                    onClick={() => 
                      navigate(`/cargoType/edit/${type.id}`, {
                        state:{
                          type: type.type,
                        }
                      })
                    }
                  >Edit</TableCell>}
                  {user && user.role === 'Admin' && <TableCell align="left" className="Delete" onClick={() => deleteCargo(type.id)}>Delete</TableCell>}
                  <TableCell align="left"></TableCell>
                </TableRow>
              ))) : (
                <>
                  <tr>
                    <th>No cargoTypes found</th>
                  </tr>
                </>
              )}
            </TableBody>
            </Table>
        </TableContainer>
        </>)}
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Cargo
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  style={{ width: "400px", marginTop: '30px' }}
                  type="text"
                  label="Cargo Type"
                  variant="outlined"
                  value={type}
                  placeholder={"Cargo Type"}
                  onChange={(e) => setType(e.target.value)}
                />
                <div style={{justifyContent: 'space-around', display: 'flex', marginTop: 30}}>
                  <Button variant="contained" 
                      onClick={() => setOpen(false)}
                      color="primary"
                      style={{width: '180px', height: '50px', fontSize: "18px"}}
                    >Cancel</Button>
                  <Button variant="contained" 
                    type='submit'
                    color="success"
                    style={{width: '180px', height: '50px', fontSize: "18px"}}
                  >Add</Button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default CargoType;


