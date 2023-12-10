import React, { useState, useEffect, ChangeEvent } from "react";
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
import { Add as AddIcon } from "@mui/icons-material";
import {
  auth,
  db,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../firebase";
import "../../../public/pict-drop.svg";

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

type User = any;

const Addcomment = () => {
  const [open, setopen] = useState(false);
  const [value, setValue] = useState<number | null>(2);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isImageInserted, setIsImageInserted] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const uploadImage = async (imageFile: File) => {
    try {
      const storageRef = ref(storage, "images/" + imageFile.name);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      setErrorMessage("ログイン状態でのみ投稿ができます");
      return;
    }

    try {
      if (image) {
        setUploading(true);
        const imageUrl = await uploadImage(image);
        setUploading(false);

        const reviewData = {
          rating: value,
          review: comment,
          imageUrl,
          timestamp: new Date(),
          userId: currentUser.uid,
        };

        await addDoc(collection(db, "reviews"), reviewData);
        console.log("Review added to Firestore");

        setValue(0);
        setComment("");
        setopen(false);
        setErrorMessage("");
        setIsImageInserted(true);
      } else {
        setErrorMessage("画像を選択してください");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleImageChanges = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setIsImageInserted(false);
    }
  };

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
        <Box width={400} height={440} bgcolor={"white"} p={1} borderRadius={5}>
          <Typography variant="h6" color={"gray"} textAlign={"center"}>
            レビューを投稿
          </Typography>
          <UserBox>
            <Avatar>
              {currentUser ? currentUser.displayName.charAt(0) : "×"}
            </Avatar>
            <Typography fontWeight={500}>
              {currentUser ? currentUser.displayName : "ログインしていません"}
            </Typography>
          </UserBox>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography variant="h6">ラーメン丸</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {!currentUser && errorMessage && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errorMessage}
            </Typography>
          )}

          <div className="border-dotted border-4 border-blue-500 p-4 mt-4 relative">
            <input
              type="file"
              accept="image/*"
              id="image-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleImageChanges(e)
              }
              className="absolute inset-0 opacity-0"
            />
            <label htmlFor="image-input" className="cursor-pointer">
              <img
                src="../../..//pict-drop.svg"
                alt="pict-drop"
                className="mx-auto max-w-full max-h-full"
              />
              <Typography variant="body2">
                {isImageInserted
                  ? "画像が挿入されました"
                  : "ここを押す or ドラッグアンドドロップして写真を投稿"}
              </Typography>
            </label>
          </div>
          <div className="center"></div>
          <Button onClick={handleSubmit} disabled={uploading}>
            投稿
          </Button>
        </Box>
      </StyledModal>
    </>
  );
};

export default Addcomment;
