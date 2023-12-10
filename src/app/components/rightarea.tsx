import { Box } from "@mui/material";

import Restaurant from "./Restaurant";

const Rightarea = () => {
  return (
    <Box bgcolor="white" flex={4} sx={{ display: { xs: "none", sm: "block" } }}>
      <Restaurant />
      <Restaurant />
      <Restaurant />
    </Box>
  );
};

export default Rightarea;
