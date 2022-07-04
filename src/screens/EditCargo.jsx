import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import axios from 'axios';

const EditCargo = () => {
  const location = useLocation();
  const { id } = useParams();
  const [cargoType, setCargoType] = useState(location.state.type);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const checkCargoExists = cargoTypes.filter((cargoType) => 
    // cargoTypes.cargoType === cargoType && cargoTypes.id !== currentCargo.id ? cargoType : null
    // )
    // if (checkCargoExists.length > 0) {
    //   return toast.error("This Cargo Type is already exists!!");
    // }

    if (!cargoType) {
      return toast.warning("Please fill in all fields!!");
    }

    const data = {
      cargoType,
    };
    editCargo(id, cargoType)
  }

  const editCargo = async (id, cargoType) => {
    await axios.put(`http://localhost:8000/cargoes/${id}`, {type: cargoType})
    .then(() => {
      toast.success("Cargo Type edited successfully!!");
      navigate("/cargoType");
    })
  }

  return (
    <div>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Cargo
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  style={{ width: "400px", marginTop: '30px' }}
                  type="text"
                  label="Cargo Type"
                  variant="outlined"
                  value={cargoType}
                  placeholder={"Cargo Type"}
                  onChange={(e) => setCargoType(e.target.value)}
                />
                <div style={{justifyContent: 'space-around', display: 'flex', marginTop: 30}}>
                    <Button variant="contained" 
                        onClick={() => navigate('/cargoType')}
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
        </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateCargo: (data) => {
    dispatch({ type: 'UPDATE_CARGO', payload: data });
  },
});

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

export default EditCargo;