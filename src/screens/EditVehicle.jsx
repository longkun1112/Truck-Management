import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const EditVehicle = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setTruckPlate(currentContact.truckPlate);
    setCargoType(currentContact.cargoType);
    setDriver(currentContact.driver);
    setTruckType(currentContact.truckType);
    setPrice(currentContact.price);
    setDimension(currentContact.dimension);
    setParkingAddress(currentContact.parkingAddress);
    setProductionYear(currentContact.productionYear);
    setStatus(currentContact.status);
    
  }, [currentContact]);

  const handleChangeDriver = (event) => {
    setDriver(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const [truckPlate, setTruckPlate] = useState("");
  const [cargoType, setCargoType] = useState([]);
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
    const checkTruckPlate = contacts.filter((contact) =>
      contact.truckPlate === truckPlate && contact.id !== currentContact.id
        ? contact
        : null
    );

    const checkTruckPlateValidation = () => {
      const regex = /^(\d{2}[A-Z]-\d{4,5})$/;
      if(truckPlate && regex.test(truckPlate) === false) {
        return 1;
      }
      return 0;
    }
  
    if (checkTruckPlateValidation() === 1 ) {
      return toast.error("This Truck Plate is not valid!!");
    }
    
    if (!truckPlate || !cargoType || !truckType  || !price || !dimension || !parkingAddress || !productionYear || !status) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkTruckPlate.length > 0) {
      return toast.error("This Truck Plate already exists!!");
    }
    const data = {
      id: currentContact.id,
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

    updateContact(data);
    toast.success("Contact updated successfully!!");
    navigate("/");
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  

  const names = [
    'Computer',
    'Electronics',
    'Vegetables',
    'Kid toys',
  ];

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className="MainDash">
      <h1>Edit</h1>
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
      {/* <FormControl sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-multiple-checkbox-label">Cargo Type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      {/* <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Driver"
        variant="outlined"
        value={driver}
          placeholder={"Driver"}
          onChange={(e) => setDriver(e.target.value)}
      /> */}
      <FormControl sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-simple-select-label">Operator</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={driver}
          label="Operator"
          onChange={handleChangeDriver}
        >
          <MenuItem value={""}></MenuItem>
          <MenuItem value={"Invoker"}>Invoker</MenuItem>
          <MenuItem value={"Lina"}>Lina</MenuItem>
          <MenuItem value={"Lisa"}>Lisa</MenuItem>
        </Select>
      </FormControl>
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="number"
        label="Truck Type"
        variant="outlined"
        placeholder="Truck Type"
        value={truckType}
        onChange={(e) => setTruckType(e.target.value)}
      />
      <TextField
        style={{ width: "600px", margin: "5px" }}
        type="number"
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
        type="number"
        label="Production Year"
        variant="outlined"
        placeholder="Production Year"
        value={productionYear}
        onChange={(e) => setProductionYear(e.target.value)}
      />
      {/* <TextField
        style={{ width: "600px", margin: "5px" }}
        type="text"
        label="Status"
        variant="outlined"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      /> */}
      <FormControl sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChangeStatus}
        >
          <MenuItem value={""}></MenuItem>
          <MenuItem value={"New"}>New</MenuItem>
          <MenuItem value={"In-used"}>In-Used</MenuItem>
          <MenuItem value={"Suspended"}>Suspended</MenuItem>
        </Select>
      </FormControl>
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
        >Update </Button>
      </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(EditVehicle)

