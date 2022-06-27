import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const navigate = useNavigate ();

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)

  const navigateHandle = (path ,index) => {
    navigate(`/${path}`)
    setSelected(index)
  }

  const logout = () => {
    localStorage.removeItem('user')
    toast.success("Logout successfully");
    navigate('/login')
  }
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo" onClick={() => navigate('/')}>
        <img src={Logo} alt="logo" />
        <span>
          {/* Sh<span>o</span>ps */}
          Truck <br></br><span>Management</span>
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => navigateHandle( item.path, index )}
                // onClick={() => navigate('/userManagement')}
                // onClick={() => setSelected(index)}
              >
                    <item.icon />
                    <span>{item.heading}</span>
              </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem" onClick={() => logout()}>
          <UilSignOutAlt />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
