import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
export default function SearchInput() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box
      p="2%"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      gap="5%"
    >
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        width="100%"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <TextField
                width="100%"
                placeholder="Search..."
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  width: "82vw",
                }}
              />
            </Paper>
          </Fade>
        )}
      </Popper>

      <Box display="flex" justifyContent="space-between">
        <h2 style={{ color: "#121212" }}>Search</h2>
        <Button onClick={handleClick("bottom-end")}>
          <SearchIcon style={{ color: "#121212" }} />
        </Button>
      </Box>
    </Box>
  );
}
