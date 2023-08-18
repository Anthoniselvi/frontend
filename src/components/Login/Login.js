import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import LoginForm from "./LoginForm";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
