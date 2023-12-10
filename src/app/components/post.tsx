import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebase";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { Checkbox } from "@mui/material";

interface PostData {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  content: string;
  userId: string; // Add user ID to PostData
}

const Post: React.FC = () => {
  const [postData, setPostData] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const data: PostData[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as PostData);
        });
        setPostData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {postData.map((post) => (
        <Card key={post.id} sx={{ margin: 5 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {post.userId.charAt(0)}{" "}
                {/* Display the first character of user's ID */}
              </Avatar>
            }
            action={<IconButton aria-label="settings"></IconButton>}
            title={`投稿者: ${post.userId}`}
            subheader={post.date}
          />
          <CardMedia
            component="img"
            height="194"
            image={post.imageUrl}
            alt="Post Image"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default Post;
