import { Box, Input, Typography, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";
import axios from "axios";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const navigateToNewEventPage = () => {
    navigate("/eventpage");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/profile/${profileId}`, {
        name: name,
        age: age,
        gender: gender,
        address: address,
        city: city,
        mobile: mobile,
        email: email,
      })
      .then((response) => {
        console.log("updated profile: " + JSON.stringify(response));
        alert("Profile updated successfully");
        // navigate(`/events?profile=${profileId}`);
      });
  };
  const getProfile = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/profile/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log("get selected Profile : " + JSON.stringify(response.data));
        // setProfiles(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setMobile(response.data.mobile);
        setAge(response.data.age);
        setAddress(response.data.address);
        setCity(response.data.city);
        setGender(response.data.gender);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    // <div className="home">
    //   <Sidebar profileId={profileId} />
    <div className="homeContainer">
      <Box margin="20px" paddingTop={isNonMobile ? "undefined" : "100px"}>
        {/* <Toolbar /> */}
        <Typography
          sx={{
            color: "#101a34",
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: "32px",
            lineHeight: "34px",
            marginTop: "-50px",
          }}
        >
          Profile
        </Typography>
        <Box
          display="flex"
          padding="2% 0%"
          borderBottom="1px solid #cad3dd"
          sx={{ gap: isNonMobile ? "50px" : "20px" }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            backgroundColor="#bf1110"
            color="#fff"
            fontFamily="Poppins"
            sx={{
              height: isNonMobile ? "90px" : "50px",
              width: isNonMobile ? "90px" : "50px",
              fontSize: isNonMobile ? "35px" : "20px",
            }}
          >
            {" "}
            {name.charAt(0).toUpperCase()}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="left"
            justifyContent="center"
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "17px",
                lineHeight: "22px",
                color: "#101a34",
                fontWeight: 600,
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "13px",
                lineHeight: "16px",
                color: "#5e6577",
              }}
            >
              {email}
            </Typography>
          </Box>
        </Box>

        <form
          onSubmit={handleSubmit}
          style={{
            margin: isNonMobile ? "2% 0%" : "4% 0%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "20px",
                lineHeight: "25px",
                color: "#101a34",
                fontWeight: 600,
              }}
            >
              Personal Info
            </Typography>
            <button
              type="submit"
              style={{
                //   marginTop: "10px",
                backgroundColor: "#bf1110",
                color: "#ffffff",
                width: isNonMobile ? "200px" : "30px",
                height: isNonMobile ? "44px" : "30px",
                padding: isNonMobile ? "8px 15px" : "10px",
                fontWeight: 400,
                borderRadius: "7px",
                fontSize: "16px",
                lineHeight: "20px",
                fontFamily: "Poppins",
                border: "none",
                cursor: "pointer",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.border = "1px solid #bf1110";
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.color = "#bf1110";
              }}
              onMouseLeave={(e) => {
                e.target.style.border = "none";
                e.target.style.color = "#ffffff";
                e.target.style.backgroundColor = "#bf1110";
              }}
            >
              {isNonMobile ? (
                <>
                  <TaskAltIcon /> Save Changes
                </>
              ) : (
                <TaskAltIcon style={{ width: "20px" }} />
              )}
            </button>
          </Box>
          <Box
            display="flex"
            gap="5%"
            sx={{
              flexWrap: isNonMobile ? "wrap" : "nowrap",
              flexDirection: isNonMobile ? "row" : "column",
              width: isNonMobile ? "undefined" : "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: isNonMobile ? "30%" : "100%",
                marginBottom: "20px",
              }}
            >
              <label
                for="name"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
                }}
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  height: "44px",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: isNonMobile ? "30%" : "100%",
                marginBottom: "20px",
              }}
            >
              <label
                for="gender"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
                }}
              >
                Gender:
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  height: "44px",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: isNonMobile ? "30%" : "100%",
                marginBottom: "20px",
              }}
            >
              <label
                for="city"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
                }}
              >
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  height: "44px",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: isNonMobile ? "30%" : "100%",
                marginBottom: "20px",
              }}
            >
              <label
                for="mobile"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
                }}
              >
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  height: "44px",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: isNonMobile ? "30%" : "100%",
                marginBottom: "20px",
              }}
            >
              <label
                for="email"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#101a34",
                  fontWeight: 600,
                }}
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: "#fff",
                  borderRadius: "7px",
                  width: "100%",
                  height: "44px",
                  padding: "8px 15px",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#101a34",
                  border: "1px solid #cad3dd",
                  fontFamily: "Poppins",
                }}
              />
            </div>
          </Box>
        </form>
      </Box>
    </div>
    // </div>
  );
}
