import { FavoriteBorder, Favorite } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";

import Post from "./post";

const Restaurant = () => {
  return (
    <Card sx={{ display: "flex", margin: 2, borderRadius: 3 }}>
      <CardHeader
        title="Restaurant"
        subheader={
          <Box sx={{ display: "flex" }}>
            <Rating name="read-only" value={3} readOnly size="small" />
          </Box>
        }
      />
      <CardMedia
        component="img"
        sx={{ width: "130px", height: "80px", objectFit: "cover" }}
        image="https://lh3.googleusercontent.com/p/AF1QipMSrzMTmsZq0gJRAAn8VnpXehgNNZytsem6oKyW=s1360-w1360-h1020"
        alt="Restaurant Image"
      />
      <CardContent>
        <Box>
          <Post />
          <Post />
          <Post />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Restaurant;
