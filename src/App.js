import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CargoType from './screens/CargoType';
import UserManagement from './screens/UserManagement';
import MyAccount from './screens/MyAccount';
import AddVehicle from './screens/AddVehicle';
import EditVehicle from './screens/EditVehicle';
import SignInSide from './components/FormLogin/SignIn';
import AddUserManagement from './screens/AddUserManagement';
import EditUserManagement from './screens/EditUserManagement';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <div className="AppGlass">
        <Sidebar/>
        <Routes>
          <Route path="/login" element={<SignInSide/>} />
          <Route exact path="/" element={<MainDash/>} />
          <Route path="/vehicleInformation" element={<MainDash/>} />
          <Route path="/vehicleInformation/add" element={<AddVehicle/>} />
          <Route path="/vehicleInformation/edit/:id" element={<EditVehicle/>} />
          <Route path="/cargoType" element={<CargoType/>} />
          <Route path="/userManagement" element={<UserManagement/>} />
          <Route path="/userManagement/add" element={<AddUserManagement/>} />
          <Route path="/userManagement/edit/:id" element={<EditUserManagement/>} />
          <Route path="/myAccount" element={<MyAccount/>} />
        </Routes>
        {/* <RightSide/> */}
      </div>
    </div>
  );
}

export default App;
