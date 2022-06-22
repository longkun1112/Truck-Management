// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Vehicle Information",
    path: 'vehicleInformation'
  },
  {
    icon: UilClipboardAlt,
    heading: "Cargo Type",
    path: 'cargoType'
  },
  {
    icon: UilUsersAlt,
    heading: "User Management",
    path: 'userManagement'
  },
  {
    icon: UilPackage,
    heading: 'My Account',
    path: 'myAccount'
  },
  {
    icon: UilChart,
    heading: 'Analytics',
    path: ''
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      // backGround: "linear-gradient(180deg, #59bfff 0%, #59bfff 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    info: 
      { id: 0, truckPlate: "30A-50493", cargoType: "Computer, Electronics", drive: "Nguyễn Văn A", truckType: '5 tons', price: '1000000000', dimension: '10-2-1.5', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2010', status: 'In-used'},
    
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      // backGround: "linear-gradient(180deg, rgb(145 254 159 / 47%) 0%, rgb(145 254 159 / 47%) 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
    info: 
      { id: 1, truckPlate: "30A-12345", cargoType: "Vegetables", drive: "Nguyễn Văn B", truckType: '10 tons', price: '1500000000', dimension: '9.8-1.8-1.8', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2011', status: 'New'},
    
  },
  {
    title: "Expenses",
    color: {
      backGround:
        // "linear-gradient(#ffadad8f -146.42%, #ffadad8f -46.42%)",
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
    info: 
      { id: 2, truckPlate: "30A-50493", cargoType: "Kid toys, Compute", drive: "Nguyễn Văn C", truckType: '20 tons', price: '2000000000', dimension: '10-2-2', parkingAddress: 'No.128 Hoàn Kiếm, HN', productionYear: '2012', status: 'Suspended'},
    
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
