"use client";
import { Box, Button, SwipeableDrawer, Typography } from "@mui/material";
import { useState } from "react";

import Post from "./post";

const Swipearea = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={56}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            px: 2,
            pb: 2,
            height: "80%",
            overflow: "auto",
          }}
        >
          <Button onClick={toggleDrawer(false)}>close</Button>
          <Typography variant="h5" sx={{ p: 2, color: "text.secondary" }}>
            store1
          </Typography>
          <Post />
          <Post />
          <Post />
        </Box>
      </SwipeableDrawer>
    </>
  );
};
export default Swipearea;
