import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import "./Signup.css";
import SignupForm from "./SignupForm";

const Signup = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const {role, setRole, isLoggedIn, setIsLoggedIn, logout} = useAuthContext()

  return (
    <div className="signup-container">
      <Navbar />
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Signup;
