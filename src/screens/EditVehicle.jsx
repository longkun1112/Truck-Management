import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import Input from '@mui/material/Input';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask=" 00-00-00"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const EditVehicle = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeDriver = (event) => {
    setDriver(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const [truckPlate, setTruckPlate] = useState(location.state.truckPlate);
  const [cargoType, setCargoType] = useState([location.state.cargoType]);
  const [driver, setDriver] = useState(location.state.driver);
  const [truckType, setTruckType] = useState(location.state.truckType);
  const [price, setPrice] = useState(location.state.price);
  const [dimension, setDimension] = useState(location.state.dimension);
  const [parkingAddress, setParkingAddress] = useState(location.state.parkingAddress);
  const [productionYear, setProductionYear] = useState(location.state.productionYear);
  const [status, setStatus] = useState(location.state.status);
  const [description, setDescription] = useState(location?.state.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const checkTruckPlate = contacts.filter((contact) =>
    //   contact.truckPlate === truckPlate && contact.id !== currentContact.id
    //     ? contact
    //     : null
    // );

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
    // if (checkTruckPlate.length > 0) {
    //   return toast.error("This Truck Plate already exists!!");
    // }

    const data = {
      // id: currentContact.id,
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

    await axios.put(`http://localhost:8000/info/${id}`, {
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
    })
    .then(() => {
      toast.success("Info edited successfully!!");
      navigate("/");
    });

    // updateContact(data);
    // toast.success("Contact updated successfully!!");
    // navigate("/");
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

  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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
      <FormControl variant="standard">
            <Input
              style={{ width: "600px", margin: "5px", height: "55px" }}
              label="Dimension (L-W-H)"
              variant="outlined"
              placeholder="Dimension (L-W-H)"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              name="dimension"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
            />
          </FormControl>
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
          type='submit'
          color="success"
          style={{width: '180px', height: '50px', fontSize: "18px"}}
        >Update </Button>
      </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
})

export default EditVehicle;

