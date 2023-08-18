import { Box, Typography, useTheme } from "@mui/material";
// import { tokens } from "../../theme";

const StatBox3 = ({
  title3,
  subtitle1,
  subtitle2,
  icon3,
  progress,
  increase,
}) => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" gap="10px">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="10px"
          borderRadius="50%"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="50px"
            height="50px"
            borderRadius="50%"
            backgroundColor="rgba(98,146,79, 0.1)"
          >
            {icon3}
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" padding="10px">
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#62924F" }}>
            {subtitle1}
          </Typography>
          <Typography variant="h3" fontWeight="bold" color="#62924F">
            {title3}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox3;
