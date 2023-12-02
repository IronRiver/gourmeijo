import { Box } from "@mui/material";
import Post from "./post";

const Rightarea = () => {
  return (
    <Box bgcolor="white" flex={4} sx={{ display: { xs: "none", sm: "block" } }}>
      <Post />
      <Post />
      <Post />
    </Box>
  );
};

export default Rightarea;
