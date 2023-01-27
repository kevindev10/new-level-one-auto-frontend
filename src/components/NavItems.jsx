
import * as Icons from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaTruckLoading } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";


export const navItems = [
  {
    id: 1,
    title: "Home",
    path: "/",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaHome style={{color:'rgba(0,0,0, 0.7)'}} />,
  },
  {
    id:2,
    title: "Stock",
    path: "/stock",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaCartArrowDown style={{color:'rgba(0,0,0, 0.7)'}} />,
  },
  {
    id: 3,
    title: "Previously Sold",
    path: "/previously-sold",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FaTruckLoading style={{color:'rgba(0,0,0, 0.7)'}}/>,
  },

  {
    id:4,
    title: "Sell Your Car",
    path: "/sell-your-car",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FaWallet style={{color:'	rgba(0,0,0, 0.7)'}}/>,
  },

  {
    id: 5,
    title: "FAQ",
    path: "/frequently-asked-questions",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FaQuestionCircle style={{color:'rgba(0,0,0, 0.7)'}}/>,
  },

  {
    id:6,
    title: "Contact Us",
    path: "/contact-us",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaPhone style={{color:'rgba(0,0,0, 0.7)'}}/>,
  },


];
