import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  getDocs,
  deleteDoc,
  doc,
  auth,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "../firebase";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

interface PostData {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  content: string;
  userId: string;
  review: string;
  rating: number;
  shopName: string;
  likes: string[];
}

const Post: React.FC = () => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const currentUser = auth.currentUser; // 現在のユーザーを取得

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const data: PostData[] = [];

        querySnapshot.forEach((doc) => {
          const {
            rating,
            timestamp,
            userName,
            imageUrl,
            title,
            content,
            review,
            shopName,
            likes,
          } = doc.data();

          data.push({
            id: doc.id,
            title: title || "Example Title",
            date:
              timestamp
                ?.toDate()
                .toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }) ||
              "不明なデータ",
            imageUrl: imageUrl || "",
            content: content || "Example Content",
            userId: userName || "Unknown User",
            review: review || "レビューがありません",
            rating: rating || 0,
            shopName: shopName || "Unknown Shop",
            likes: likes || [],
          } as PostData);
        });

        setPostData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser]); // currentUser が変更されたときに再実行する

  const getTotalLikes = (postId: string): number => {
    const post = postData.find((p) => p.id === postId);
    return post ? post.likes.length : 0;
  };

  const handleLikeToggle = async (postId: string) => {
    try {
      const postRef = doc(db, "reviews", postId);

      // いいねがすでにされているか確認
      const liked = postData
        .find((post) => post.id === postId)
        ?.likes.includes(currentUser?.uid || "");

      if (liked) {
        // いいねを取り消す
        await updateDoc(postRef, {
          likes: arrayRemove(currentUser?.uid),
        });
      } else {
        // いいねを追加する
        await updateDoc(postRef, {
          likes: arrayUnion(currentUser?.uid),
        });
      }

      // データを再取得して更新
      fetchData();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <>
      {postData.map((post) => (
        <Card key={post.id} sx={{ margin: 5 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {post.userId.charAt(0)}
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
            alt="画像なし"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.review}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              店名: {post.shopName}
            </Typography>
            <Rating
              name={`rating-${post.id}`}
              value={post.rating}
              precision={0.5}
              readOnly
            />
          </CardContent>

          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={() => handleLikeToggle(post.id)}
            >
              {post.likes.includes(currentUser?.uid || "") ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <span>{getTotalLikes(post.id)}</span>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default Post;
function fetchData() {
  throw new Error("Function not implemented.");
}
