"use client";
import { Add as AddIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Fab,
  Modal,
  Rating,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import React from "react";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Addcomment = () => {
  const [open, setopen] = useState(false);
  const [value, setValue] = useState(0);
  return (
    <>
      <Tooltip
        arrow
        onClick={() => setopen(true)}
        title="create"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "clac(50%-25)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={() => {
          setopen(false);
          setValue(0);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={280} bgcolor={"white"} p={1} borderRadius={5}>
          <Typography variant="h6" color={"gray"} textAlign={"center"}>
            Create Post
          </Typography>
          <UserBox>
            <Avatar>H</Avatar>
            <Typography fontWeight={500}>your name</Typography>
          </UserBox>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography variant="h6">Restaurant</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue!);
              }}
            />
          </Box>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="Comment"
            variant="standard"
          />
          <Button
            onClick={() => {
              setValue(0);
              setopen(false);
            }}
          >
            Post
          </Button>
        </Box>
      </StyledModal>
    </>
  );
};

export default Addcomment;
