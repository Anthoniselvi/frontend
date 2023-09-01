import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Validation from "./Validation";
import { auth, db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useUserAuth } from "../../auth";
import { FcGoogle } from "react-icons/fc";
import "./Signup.css";
const SignupForm = () => {
  const isNonMobile = useMediaQuery("(max-width:1000px)");
  // const {role, setRole, isLoggedIn, setIsLoggedIn, logout} = useAuthContext()
  const { googleSignIn, facebookSignIn, user } = useUserAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [signupData, setSignupData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigateToSignIn = () => {
    navigate("/signin");
  };
  const updateHandleChange = (event) => {
    // setErrors(Validation(signupData));

    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    setErrors(Validation(signupData));
    setDataIsCorrect(true);
    setError("");

    createUserWithEmailAndPassword(
      auth,
      signupData.email,
      signupData.password
    ).then(async (res) => {
      const user = res.user;
      await updateProfile(user, {
        displayName: signupData.name,
      });
      // create Profile here
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: signupData.name,
        mobile: signupData.mobile,
        email: signupData.email,
        password: signupData.password,
      });
      console.log("firebase signup created");

      // Make the POST request to your API endpoint
      fetch(`${process.env.REACT_APP_BASE_URL}/profile/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: user.uid,
          name: signupData.name,
          email: signupData.email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log("fetch id:" + data.profileId);
          navigate(`/dashboard?profile=${user.uid}`);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await googleSignIn();
      const user = userCredential.user; // Get the user from the userCredential

      console.log("user : " + JSON.stringify(user));

      // Update user profile in Firestore with Google login data
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
      });

      // Make the POST request to add Google login data to profile
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/profile/add`,
        {
          profileId: user.uid,
          name: user.displayName,
          email: user.email,
        }
      );

      console.log("response :" + JSON.stringify(response));
      console.log(response.data);
      console.log(response.data.profileId);

      navigate(`/dashboard?profile=${user.uid}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const userCredential = await facebookSignIn();
      const user = userCredential.user; // Get the user from the userCredential

      console.log("user : " + JSON.stringify(user));

      // Update user profile in Firestore with Google login data
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
      });

      // Make the POST request to add Google login data to profile
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/profile/add`,
        {
          profileId: user.uid,
          name: user.displayName,
          email: user.email,
        }
      );

      console.log("response :" + JSON.stringify(response));
      console.log(response.data);
      console.log(response.data.profileId);

      navigate(`/dashboard?profile=${user.uid}`);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="signup-form-container">
      <h4 className="signup-form-title">Sign up for MoiList</h4>

      <Typography sx={{ color: "#5e6577" }}>It’s quick and easy.</Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        mt="20px"
        width="100%"
        flexDirection={isNonMobile ? "column" : "row"}
        gap={isNonMobile ? "10px" : "undefined"}
      >
        <Button
          width={isNonMobile ? "100%" : "49%"}
          className="signup-form-button"
          onClick={handleGoogleSignIn}
          type="submit"
          // variant="contained"s
          sx={{
            background: "#fff",
            border: "1px solid #50bcd9",
            borderRadius: "4px",
            padding: "10px 17px",
            fontWeight: 500,
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#292929",
            textTransform: "none",
          }}
        >
          <FcGoogle style={{ fontSize: 20 }} /> Login with Google
        </Button>
        <Button
          width={isNonMobile ? "100%" : "49%"}
          className="signup-form-button"
          onClick={handleFacebookSignIn}
          type="submit"
          // variant="contained"
          sx={{
            background: "#fff",
            border: "1px solid #50bcd9",
            borderRadius: "4px",
            padding: "10px 17px",
            fontWeight: 500,
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#292929",
            textTransform: "none",
          }}
        >
          <i
            class="fa fa-facebook-square"
            style={{ fontSize: "20px", color: "#50bcd9" }}
          ></i>
          Login with Facebook
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <hr style={{ color: "#101a34", flex: 1 }} />
        <p
          style={{
            color: "#101a34",
            fontSize: 15,
            fontWeight: 600,
            textAlign: "bottom",
          }}
        >
          or
        </p>
        <hr style={{ color: "#101a34", flex: 1 }} />
      </Box>
      <form
        onSubmit={handleSubmitSignup}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label
            for="name"
            style={{
              fontFamily: "Poppins",
              fontSize: "15px",
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
            value={signupData.name}
            onChange={updateHandleChange}
            placeholder="Enter your Name"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label
            for="mobile"
            style={{
              fontFamily: "Poppins",
              fontSize: "15px",
              lineHeight: "18px",
              color: "#101a34",
              fontWeight: 600,
            }}
          >
            Mobile Number:
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
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
            value={signupData.mobile}
            onChange={updateHandleChange}
            placeholder="Enter your Mobile Number"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label
            for="email"
            style={{
              fontFamily: "Poppins",
              fontSize: "15px",
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
            value={signupData.email}
            onChange={updateHandleChange}
            placeholder="Enter your Email"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label
            for="password"
            style={{
              fontFamily: "Poppins",
              fontSize: "15px",
              lineHeight: "18px",
              color: "#101a34",
              fontWeight: 600,
            }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
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
            value={signupData.password}
            onChange={updateHandleChange}
            placeholder="Enter your Password"
          />
        </div>

        {/* <Box display="flex" justifyContent="center" mt="10px" sx={{ gridColumn: "span 10" }}> */}
        <Button
          type="submit"
          sx={{
            backgroundColor: "#DA344D",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: 600,
            // padding: "10px 20px",
            width: "100%",
            "&:hover ": {
              backgroundColor: "#f59f2f",
              color: "#DA344D",
              // border: "1px solid #DA344D",
            },
          }}
        >
          Sign Up
        </Button>
        {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
        {/* </Box> */}
      </form>
      <Box
        display="flex"
        justifyContent="center"
        mt="20px"
        sx={{ gridColumn: "span 10" }}
      >
        <Grid container>
          {/* <Grid item xs>
                <Link href="#" sx={{color: "white"}}>
                  Forgot password?
                </Link>
              </Grid> */}
          <Grid item>
            <Link
              href="/login"
              to="/login"
              sx={{ color: "#5e6577", fontSize: 15 }}
            >
              Already have an account?{" "}
              <span style={{ color: "#DA344D", fontSize: 15, fontWeight: 400 }}>
                Login
              </span>
            </Link>
          </Grid>
        </Grid>
      </Box>
      {/* <Box display="flex" justifyContent="center" mt="20px" sx={{ gridColumn: "span 10" }}>
            <Button
            onClick={handleClick}
            type="submit"
          
            // variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 50px",
              width: '100%', 
              '&:hover ': {
                backgroundColor: colors.grey[100],
                color: colors.blueAccent[700]
              },
          }}>
            Sign Up with Google
          </Button>
  </Box> */}
    </div>
  );
};

export default SignupForm;
