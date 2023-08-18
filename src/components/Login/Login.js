import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import LoginForm from "./LoginForm";
import "./Login.css";

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const {role, setRole, isLoggedIn, setIsLoggedIn, logout} = useAuthContext()

  return (
    <div className="login-container">
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
