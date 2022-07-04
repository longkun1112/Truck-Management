import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteInfoAction } from '../../redux/saga/actions/InfoAction';

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

const BasicTable =({ deleteinfo }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUser(currentUser);
    }
    console.log("user", user)
  }, []);

  const add = () => {
    navigate('/vehicleInformation/add')

  }

  const deleted = async (id) => {
    await deleteinfo(id)
    toast.success("Info deleted successfully!!");
    dispatch({type: "GET_ALL_INFO"})
  }

  useEffect(() => {
    dispatch({type: "GET_ALL_INFO"})
  }, []);

  const dispatch = useDispatch();

  const {dataInfo, isLoading} = useSelector(state => state.InfoReducer)
  console.log('123', dataInfo)

  const navigate = useNavigate();
  return (
      <div className="Table">
      <h3>Welcome {user ? user?.name : 'User'}</h3>
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
                <TableCell align="left">Operator</TableCell>
                <TableCell align="left">Truck Type</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Dimension<br></br>(L-W-H)</TableCell>
                <TableCell align="left">Parking Address</TableCell>
                <TableCell align="left">Production<br></br> Year</TableCell>
                <TableCell align="left">Status</TableCell>
                {user && user.role === 'Admin' && <TableCell align="left" className="Details" onClick={() => add()}>Add </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {dataInfo?.length > 0 ? 
                (dataInfo.map((contact, id) => (
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
                  <TableCell align="left">{contact.truckType} tons</TableCell>
                  <TableCell align="left">{contact.price}</TableCell>
                  <TableCell align="left">{contact.dimension}</TableCell>
                  <TableCell align="left">{contact.parkingAddress}</TableCell>
                  <TableCell align="left">{contact.productionYear}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle1(contact.status)}>{contact.status}</span>
                  </TableCell>
                  {user && user.role === 'Admin' && <TableCell align="left" className="Details" 
                    onClick={() => 
                      navigate(`/vehicleInformation/edit/${contact.id}`,
                      {
                        state: {
                          truckPlate: contact.truckPlate,
                          cargoType: contact.cargoType,
                          driver: contact.driver,
                          truckType: contact.truckType,
                          price: contact.price,
                          dimension: contact.dimension,
                          parkingAddress: contact.parkingAddress,
                          productionYear: contact.productionYear,
                          status: contact.status,
                        }
                      })}
                  >Edit</TableCell>}
                  {user && user.role === 'Admin' && <TableCell align="left" className="Delete" onClick={() => deleted(contact.id)}>Delete</TableCell>}
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

const mapDispatchToProps = dispatch => {
  return {
      deleteinfo: (id) => {
          dispatch(deleteInfoAction(id))
      }
  }
}

export default  connect(null, mapDispatchToProps)(BasicTable);
