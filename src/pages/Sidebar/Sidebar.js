import "./Sidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../auth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ImCross } from "react-icons/im";
import { RiMenu2Line } from "react-icons/ri";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

const Sidebar = ({ profileId }) => {
  console.log("ProfileId in Sidebar :" + profileId);
  const [currentLink, setCurrentLink] = useState(1);
  const [openMenu, setOpenMenu] = useState(false);
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const menuOptions = [
    {
      text: "Dashboard",
      icon: <HomeIcon />,
      link: `/dashboard?profile=${profileId}`,
    },
    {
      text: "Events",
      icon: <PersonOutlineIcon />,
      link: `/eventslist?profile=${profileId}`,
    },
    {
      text: "Profile",
      icon: <AccountCircleOutlinedIcon />,
      link: `/profile?profile=${profileId}`,
    },
    {
      text: "Logout",
      icon: <ExitToAppIcon />,
      // link: "#works",
    },
  ];
  const handleMenuClicked = () => {
    setOpenMenu(!openMenu);
  };

  const handleMenuItemClick = (index) => {
    setCurrentLink(index);
    setOpenMenu(false);
  };
  return (
    <>
      {/* <div className="navbar-menu-container">
        <div className="mobile-menu-icon">
          {!openMenu ? (
            <RiMenu2Line
              onClick={handleMenuClicked}
              style={{ fontSize: "25px", color: "black" }}
              className="Icon"
            />
          ) : (
            <ImCross onClick={handleMenuClicked} className="Icon" />
          )}
        </div>
      </div>
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="left"
        sx={{ zIndex: 4000 }}
      >
        <Box
          sx={{ width: 250, paddingTop: "70px" }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer> */}
      <div className="sidebar">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="logo">
              Moi
              <span className="logo-text"> App</span>
            </p>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <Link
              to={`/dashboard?profile=${profileId}`}
              style={{ textDecoration: "none" }}
            >
              <li
                onClick={() => handleMenuItemClick(1)}
                className={currentLink === 1 ? "active" : "none"}
              >
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <p className="title">LISTS</p>
            <Link
              to={`/eventslist?profile=${profileId}`}
              style={{ textDecoration: "none" }}
            >
              <li
                onClick={() => handleMenuItemClick(2)}
                className={currentLink === 2 ? "active" : "none"}
              >
                <PersonOutlineIcon className="icon" />
                <span>Events</span>
              </li>
            </Link>

            <p className="title">USER</p>
            <Link
              to={`/profile?profile=${profileId}`}
              style={{ textDecoration: "none" }}
            >
              <li
                onClick={() => handleMenuItemClick(3)}
                className={currentLink === 3 ? "active" : "none"}
              >
                <AccountCircleOutlinedIcon className="icon" />
                <span>Profile</span>
              </li>
            </Link>
            <li
              className={currentLink === 4 ? "active" : "none"}
              onClick={handleLogout}
            >
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
