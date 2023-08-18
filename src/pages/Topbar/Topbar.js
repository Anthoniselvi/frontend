import "./Topbar.css";
import { useUserAuth } from "../../auth";

const Topbar = () => {
  const auth = useUserAuth();
  // console.log("Name: " + auth.user.displayName);
  return (
    <div className="topbar">
      <div className="wrapper">
        <p className="wrapper-text">Welcome {auth.user.displayName} !</p>
      </div>
    </div>
  );
};

export default Topbar;
