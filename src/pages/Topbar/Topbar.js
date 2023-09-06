import "./Topbar.css";
import { useUserAuth } from "../../auth";
import AddIcon from "@mui/icons-material/Add";
import { useMediaQuery, Fab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Topbar = () => {
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  const auth = useUserAuth();
  const isNonMobile = useMediaQuery("(max-width:1000px)");
  const navigate = useNavigate();
  const navigateToCreateEvent = () => {
    navigate(`/newevent?profile=${profileId}`);
  };
  return (
    <div className="topbar">
      <div className="wrapper">
        <p className="wrapper-text">Welcome {auth.user.displayName} !</p>
      </div>
      <Box
        sx={{
          position: "fixed",
          top: isNonMobile && "90%",
          bottom: "5%",
          left: isNonMobile ? "90%" : "97%",
          transform: "translateX(-50%)",
          zIndex: 2000,
        }}
      >
        <Fab color="secondary" aria-label="add" onClick={navigateToCreateEvent}>
          <AddIcon style={{ fontSize: 25 }} />
        </Fab>
      </Box>
    </div>
  );
};

export default Topbar;
