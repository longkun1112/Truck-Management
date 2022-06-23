import * as React from "react";
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

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];

const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

function createData1(id, truckPlate, cargoType, driver, truckType, price, dimension, parkingAddress, productionYear, status) {
  return { id, truckPlate, cargoType, driver, truckType, price, dimension, parkingAddress, productionYear, status };
}

const rows1 = [
  { id: 0, truckPlate: "30A-50493", cargoType: "Computer, Electronics", drive: "Nguyễn Văn A", truckType: '5 tons', price: '1000000000', dimension: '10-2-1.5', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2010', status: 'In-used'},
  { id: 1, truckPlate: "30A-12345", cargoType: "Vegetables", drive: "Nguyễn Văn B", truckType: '10 tons', price: '1500000000', dimension: '9.8-1.8-1.8', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2011', status: 'New'},
  { id: 2, truckPlate: "30A-50493", cargoType: "Kid toys, Compute", drive: "Nguyễn Văn C", truckType: '20 tons', price: '2000000000', dimension: '10-2-2', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2012', status: 'Suspended'},
];

const makeStyle1=(status)=>{
  if(status === 'New')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Suspended')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}


const BasicTable =({ contacts, deleteContact }) => {
  const navigate = useNavigate();
  return (
      <div className="Table">
      <h3>Vehicle Information</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Truck plate</TableCell>
                <TableCell align="left">Cargo Type</TableCell>
                <TableCell align="left">Driver</TableCell>
                <TableCell align="left">Truck Type</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Dimension<br></br>(L-W-H)</TableCell>
                <TableCell align="left">Parking Address</TableCell>
                <TableCell align="left">Production<br></br> Year</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left" className="Details" onClick={() => navigate('/vehicleInformation/add')}>Add </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {contacts.length > 0 ? 
                (contacts.map((contact, id) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{contact.id + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {contact.truckPlate}
                  </TableCell>
                  <TableCell align="left">{contact.cargoType}</TableCell>
                  <TableCell align="left">{contact.driver}</TableCell>
                  <TableCell align="left">{contact.truckType}</TableCell>
                  <TableCell align="left">{contact.price}</TableCell>
                  <TableCell align="left">{contact.dimension}</TableCell>
                  <TableCell align="left">{contact.parkingAddress}</TableCell>
                  <TableCell align="left">{contact.productionYear}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle1(contact.status)}>{contact.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details" onClick={() => navigate(`/vehicleInformation/edit/${contact.id}`)}>Edit</TableCell>
                  <TableCell align="left" className="Delete" onClick={() => deleteContact(contact.id)}>Delete</TableCell>
                </TableRow>
              ))) : (
                <>
                  <tr>
                    <th>No contacts found</th>
                  </tr>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
});

export default  connect(mapStateToProps, mapDispatchToProps)(BasicTable);
