import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SigninValidation from "./SigninValidation";
import { auth } from "../../firebase";
import { useUserAuth } from "../../auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
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
    setErrors(SigninValidation(signinData));
    setDataIsCorrect(true);
    setError("");

    signInWithEmailAndPassword(auth, signinData.email, signinData.password)
      .then(async (res) => {
        console.log(res);
        navigate(`/dashboard?profile=${res.user.uid}`);

        // navigate(`/newdashboard?profile=${res.user.uid}`);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
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
          // navigate(`/newhome?profile=${user.uid}`);
        });
    } catch (error) {
      console.log(error.message);
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
          // navigate(`/newhome?profile=${user.uid}`);
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
