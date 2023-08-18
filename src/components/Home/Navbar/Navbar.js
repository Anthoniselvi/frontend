/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./Navbar.css";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiMenu2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      text: "About",
      icon: <InfoIcon />,
      link: "#about",
    },
    {
      text: "Services",
      icon: <CommentRoundedIcon />,
      link: "#services",
    },
    {
      text: "How To Works",
      icon: <CommentRoundedIcon />,
      link: "#works",
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
      link: "#testimonal",
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      link: "#footer",
    },
  ];
  const handleMenuClicked = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <nav>
      <div className="navbar-menu-container">
        <div className="mobile-menu-icon">
          {!openMenu ? (
            <RiMenu2Line
              onClick={handleMenuClicked}
              style={{ fontSize: "25px" }}
              className="Icon"
            />
          ) : (
            <ImCross onClick={handleMenuClicked} className="Icon" />
          )}
        </div>
      </div>

      <div className="navbar">
        <div className="nav-logo-container">
          <h1>MOI APP</h1>
        </div>
        <div className="navbar-links-container">
          <a href="/">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#works">How to Works</a>
          <a href="#testimonal">Testimonials</a>
          <a href="#footer">Contact</a>

          <button className="primary1-button" onClick={navigateToLogin}>
            Login
          </button>
          <button className="primary-button" onClick={navigateToSignUp}>
            Sign Up
          </button>
        </div>
      </div>
      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="left"
        sx={{
          zIndex: 4000,
          "& .MuiDrawer-paper": {
            background: "#fff",
            color: "black",
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            paddingTop: "70px",
          }}
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
          {/* <Divider /> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "80%",
              alignItems: "center",
              margin: "0 10px",
            }}
          >
            <button
              className="primary1-button"
              style={{ width: "100%" }}
              onClick={navigateToLogin}
            >
              Login
            </button>
            <button
              className="primary-button"
              style={{ width: "100%" }}
              onClick={navigateToSignUp}
            >
              Sign Up
            </button>
          </div>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
