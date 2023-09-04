import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SigninValidation from "./SigninValidation";

import { useUserAuth } from "../../auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const isNonMobile = useMediaQuery("(max-width:1000px)");
  // const {role, setRole, isLoggedIn, setIsLoggedIn, logout} = useAuthContext()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { googleSignIn, facebookSignIn, user } = useUserAuth();

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event) => {
    setSigninData({
      ...signinData,
      [event.target.name]: event.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = SigninValidation(signinData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No validation errors, proceed with login
      try {
        const res = await signInWithEmailAndPassword(
          auth,
          signinData.email,
          signinData.password
        );

        const user = res.user;
        navigate(`/dashboard?profile=${user.uid}`);
      } catch (error) {
        setError("Invalid email or password."); // Display a generic error message for incorrect credentials
      }
    } else {
      // Validation errors exist, do not proceed with submission
      setError("Please correct the validation errors.");
    }
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await googleSignIn();
      const user = userCredential.user; // Get the user from the userCredential

      console.log("user : " + JSON.stringify(user));

      // Check if the user with the same email already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // User does not exist in Firestore, so add them
        await setDoc(userDocRef, {
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

        navigate(`/dashboard?profile=${response.data.profileId}`);
      } else {
        // User already exists in Firestore, no need to add them
        console.log("User already exists in Firestore");
        navigate(`/dashboard?profile=${user.uid}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const navigateToResetPassword = () => {
    navigate("/resetpassword");
  };

  const handleFacebookSignIn = async (e) => {
    e.preventDefault();

    try {
      await facebookSignIn();
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/profile/add`, {
          profileId: user.uid,
          name: user.displayName,
          email: user.email,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.data.profileId);
          navigate(`/dashboard?profile=${user.uid}`);
        });
    } catch (error) {
      console.error("Facebook Sign-in Error:", error);
    }
  };
  return (
    <div className="login-form-container">
      <h4 className="login-form-title">Login to MoiList</h4>
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
          className="login-form-button"
          onClick={handleGoogleSignin}
          type="submit"
          // variant="contained"s
          sx={{
            background: "#fff",
            border: "1px solid #DA344D",
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
          onClick={handleFacebookSignIn}
          type="submit"
          // variant="contained"
          sx={{
            background: "#fff",
            border: "1px solid #DA344D",
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
        {/* </Box> */}
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
      {error && <span style={{ color: "red", fontSize: 16 }}>{error}</span>}
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
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
            onChange={handleChange}
            value={signinData.email}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span style={{ color: "red", fontSize: 16 }}>{errors.email}</span>
          )}
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
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            style={{
              background: "#fff",
              position: "relative",
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
            onChange={handleChange}
            value={signinData.password}
            placeholder="Enter your Password"
          />
          {errors.password && (
            <span style={{ color: "red", fontSize: 16 }}>
              {errors.password}
            </span>
          )}
          {/* <InputAdornment
            sx={{ position: "absolute", paddingTop: 6, paddingLeft: 57 }}
          >
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handlePasswordVisibility}
              onMouseDown={(e) => e.preventDefault()} // Prevents focus change on click
            >
              {showPassword ? (
                <Visibility style={{ color: "#101a34", opacity: 1 }} />
              ) : (
                <VisibilityOff style={{ color: "#101a34", opacity: 1 }} />
              )}
            </IconButton>
          </InputAdornment> */}
        </div>

        <button
          type="submit"
          style={{
            marginTop: "10px",
            backgroundColor: "#DA344D",
            color: "#ffffff",
            width: "100%",
            height: "44px",
            padding: "8px 15px",
            fontWeight: 600,
            borderRadius: "7px",
            fontSize: "16px",
            lineHeight: "20px",
            fontFamily: "Poppins",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            // e.target.style.border = "1px solid #DA344D";
            e.target.style.backgroundColor = "#f59f2f";
            e.target.style.color = "#DA344D";
          }}
          onMouseLeave={(e) => {
            e.target.style.border = "none";
            e.target.style.color = "#ffffff";
            e.target.style.backgroundColor = "#DA344D";
          }}
        >
          Sign In
        </button>
      </form>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt="20px"
        width="100%"
      >
        <Grid container>
          <Grid item xs sx={{ color: "#DA344D", fontSize: 15 }}>
            <Link
              to="/resetpassword"
              href="#"
              // onClick={navigateToResetPassword}
              sx={{ color: "#DA344D" }}
            >
              Forgot password?
            </Link>
          </Grid>

          <Grid item>
            <Link href="signup" to="/signup" sx={{ color: "#5e6577" }}>
              Need to create an account?{" "}
              <span style={{ color: "#DA344D", fontSize: 15 }}>Sign Up</span>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LoginForm;
