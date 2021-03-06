import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { Formik } from 'formik';
import Input from '@mui/material/Input';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { addInfoAction } from '../redux/saga/actions/InfoAction';

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

const AddVehicle = () => {
  const navigate = useNavigate();

  const [cargoType, setCargoType] = useState([]);
  const [users, setUsers] = useState([]);
  const [driver, setDriver] = useState('');
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

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

  const handleChangeDriver = (event) => {
    setDriver(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

const [names, setNames] = useState([]);

const getCargoType = async () => {
  await axios.get('http://localhost:8000/cargoes')
  .then(function (response) {
    setNames(response.data)
    console.log('get', names);
  })
  .catch(function (error) {
    console.log(error);
  });
}

const getUsers = async () => {
  await axios.get('http://localhost:8000/users')
  .then(function (response) {
    console.log('users' ,response.data)
    setUsers(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}

useEffect(() => {
  getCargoType();
  getUsers();
  console.log('test', names)
  console.log('users', users)
}, [])

  const handleChangeCargo = (event) => {
    const {
      target: { value },
    } = event;
    setCargoType(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const dispatch = useDispatch();

  return (
    <div className="MainDash">
      <h1>Add</h1>
      <Formik
        initialValues={{ truckPlate: '', cargoType: '',
        driver: '', truckType: '',
        price: '', dimension: '',
        parkingAddress: '', productionYear: '',
        status: '', description: '',
      }}
       validate={values => {
         const errors = {};
         if (!values.truckPlate) {
           errors.truckPlate = 'Truck Plate required';
         } else if (
           !/^(\d{2}[A-Z]-\d{4,5})$/i.test(values.truckPlate)
         ) {
           errors.truckPlate = 'Invalid Truck Plate, the correct form is AAB-AAAA ';
         }
         if (!values.truckType) {
          errors.truckType = 'Truck type required';
        }
        if (!values.price) {
          errors.price = 'Price required';
        }
        if (!values.dimension) {
          errors.dimension = 'Dimension required';
        }
        if (!values.parkingAddress) {
          errors.parkingAddress = 'Parking address required';
        }
        if (!values.productionYear) {
          errors.productionYear = 'Production year required';
        }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        const {truckPlate, truckType, dimension, price, parkingAddress, productionYear, description} = values;
        // const checkTruckPlateExists = contacts.filter((contact) => 
        //   contact.truckPlate === truckPlate ? contact : null
        // )
        // if (checkTruckPlateExists.length > 0) {
        //   return toast.error("This Truck Plate already exists!!");
        // }
        const data = {
          // id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
          truckPlate,
          cargoType: cargoType,
          driver: driver,
          truckType,
          price,
          dimension,
          parkingAddress,
          productionYear,
          status: status,
          description
        };
        dispatch(addInfoAction(data));
        toast.success("Contact added successfully!!");
        navigate("/");
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
         <form onSubmit={handleSubmit}>
           <TextField
            style={{ width: "600px", margin: "5px" }}
            type="text"
            label="Truck Plate"
            variant="outlined"
            placeholder={"Truck Plate"}
            name='truckPlate'
            value={values.truckPlate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.truckPlate && touched.truckPlate && errors.truckPlate}
            helperText={errors.truckPlate && touched.truckPlate && errors.truckPlate}
          />
          <FormControl sx={{ m: 1, width: 600 }}>
            <InputLabel id="demo-multiple-checkbox-label">Cargo Type</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={cargoType}
              onChange={handleChangeCargo}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name.id} value={name.type}>
                  <Checkbox checked={cargoType.indexOf(name.type) > -1} />
                  <ListItemText primary={name.type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 600 }}>
            <InputLabel id="demo-simple-select-label">Operator</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={driver}
              label="Operator"
              onChange={handleChangeDriver}
            >
              {users.map((user) => (
                <MenuItem value={user.name}>{user.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            style={{ width: "600px", margin: "5px" }}
            type="number"
            label="Truck Type"
            variant="outlined"
            placeholder="Truck Type"
            name='truckType'
            value={values.truckType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.truckType && touched.truckType && errors.truckType}
            helperText={errors.truckType && touched.truckType && errors.truckType}
          />
          <TextField
            style={{ width: "600px", margin: "5px" }}
            type="number"
            label="Price"
            variant="outlined"
            placeholder="Price"
            name='price'
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.price && touched.price && errors.price}
            helperText={errors.price && touched.price && errors.price}
          />
          <FormControl variant="standard">
            <Input
              style={{ width: "600px", margin: "5px", height: "55px" }}
              label="Dimension (L-W-H)"
              variant="outlined"
              placeholder="Dimension (L-W-H)"
              value={values.dimension}
              onChange={handleChange}
              name="dimension"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
              error={errors.dimension && touched.dimension && errors.dimension}
              helperText={errors.dimension && touched.dimension && errors.dimension}
            />
          </FormControl>
          <TextField
            style={{ width: "600px", margin: "5px" }}
            type="text"
            label="Parking Address"
            variant="outlined"
            placeholder="Parking Address"
            name='parkingAddress'
            value={values.parkingAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.parkingAddress && touched.parkingAddress && errors.parkingAddress}
            helperText={errors.parkingAddress && touched.parkingAddress && errors.parkingAddress}
          />
          <TextField
            style={{ width: "600px", margin: "5px" }}
            type="number"
            label="Production Year"
            variant="outlined"
            placeholder="Production Year"
            name='productionYear'
            value={values.productionYear}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.productionYear && touched.productionYear && errors.productionYear}
            helperText={errors.productionYear && touched.productionYear && errors.productionYear}
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
            >Add</Button>
            </div>
         </form>
       )}
     </Formik>
    </div>
  )
}

export default AddVehicle;
