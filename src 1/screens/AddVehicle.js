import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const AddVehicle = ({contacts, addContact}) => {
  const navigate = useNavigate();

  const [truckPlate, setTruckPlate] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [driver, setDriver] = useState("");
  const [truckType, setTruckType] = useState("");
  const [price, setPrice] = useState("");
  const [dimension, setDimension] = useState("");
  const [parkingAddress, setParkingAddress] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkTruckPlateExists = contacts.filter((contact) => 
      contact.truckPlate === truckPlate ? contact : null
    )

    if (!truckPlate || !cargoType || !driver || !truckType || !price || !dimension || !parkingAddress || !productionYear || !status) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkTruckPlateExists.length > 0) {
      return toast.error("This truck Plate already exists!!");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      truckPlate,
      cargoType,
      driver,
      truckType,
      price,
      dimension,
      parkingAddress,
      productionYear,
      status,
      description
    };

    addContact(data);
    toast.success("Contact added successfully!!");
    navigate("/");
  }

  return (
    <div className="MainDash">
      <h1>Add</h1>
      <form onSubmit={handleSubmit}>
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Truck Plate"
        variant="outlined"
        value={truckPlate}
        placeholder={"Truck Plate"}
        onChange={(e) => setTruckPlate(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Cargo Type"
        variant="outlined"
        value={cargoType}
          placeholder={"Cargo Type"}
          onChange={(e) => setCargoType(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Driver"
        variant="outlined"
        value={driver}
          placeholder={"Driver"}
          onChange={(e) => setDriver(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Truck Type"
        variant="outlined"
        placeholder="Truck Type"
        value={truckType}
        onChange={(e) => setTruckType(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Price"
        variant="outlined"
        value={price}
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Dimension (L-W-H)"
        variant="outlined"
        placeholder="Dimension (L-W-H)"
        value={dimension}
        onChange={(e) => setDimension(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Parking Address"
        variant="outlined"
        placeholder="Parking Address"
        value={parkingAddress}
        onChange={(e) => setParkingAddress(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Production Year"
        variant="outlined"
        placeholder="Production Year"
        value={productionYear}
        onChange={(e) => setProductionYear(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Status"
        variant="outlined"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Description"
        variant="outlined"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
        <Button style={{position: 'absolute', top: "90px", right: "150px"}} variant="contained" onClick={() => navigate("/")}>Go back</Button>
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
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: 'ADD_CONTACT', payload: data });
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicle)