import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import {useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";

const MainDash = () => {
  
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
