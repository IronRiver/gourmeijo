import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  auth,
  deleteDoc,
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
import DeleteIcon from "@mui/icons-material/Delete";

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
  userName: string;
}

const Post: React.FC = () => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const currentUser = auth.currentUser;

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
            userId,
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
            userId: userId || "Unknown User",
            review: review || "レビューがありません",
            rating: rating || 0,
            shopName: shopName || "Unknown Shop",
            likes: likes || [],
            userName: userName || "ユーザー名無し",
          } as PostData);
        });

        setPostData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // 最初のマウント時にのみデータを取得する

  const getTotalLikes = (postId: string): number => {
    const post = postData.find((p) => p.id === postId);
    return post ? post.likes.length : 0;
  };

  const handleLikeToggle = async (postId: string) => {
    try {
      const postIndex = postData.findIndex((p) => p.id === postId);

      if (postIndex !== -1) {
        const post = postData[postIndex];
        const liked = post.likes.includes(currentUser?.uid || "");

        const postRef = doc(db, "reviews", postId);

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

        // ローカルのpostDataを更新
        const updatedPostData = [...postData];
        updatedPostData[postIndex] = {
          ...post,
          likes: liked
            ? post.likes.filter((like) => like !== currentUser?.uid)
            : [...post.likes, currentUser?.uid || ""],
        };

        setPostData(updatedPostData);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  const handleDeletePost = async (postId: string) => {
    try {
      const postRef = doc(db, "reviews", postId);
      await deleteDoc(postRef);

      // ローカルのpostDataから削除
      const updatedPostData = postData.filter((post) => post.id !== postId);
      setPostData(updatedPostData);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      {postData.map((post) => {
        return (
          <Card key={post.id} sx={{ margin: 5 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                  {post.userId.charAt(0)}
                </Avatar>
              }
              action={
                currentUser?.uid === post.userId ? (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null
              }
              title={`投稿者: ${post.userName}`}
              subheader={post.date}
            />

            <CardMedia
              component="img"
              height="194"
              className="w-auto max-h-[350px] mx-auto my-auto"
              image={post.imageUrl}
              alt=""
            />
            {!post.imageUrl && (
              <span className="block mx-auto text-center border-b">
                画像なし
              </span>
            )}

            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                店名: {post.shopName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                レビュー：{post.review}
              </Typography>

              <Rating
                name={`rating-${post.id}`}
                value={post.rating}
                precision={0.5}
                readOnly
              />
            </CardContent>
            <CardActions disableSpacing>
              {currentUser?.uid === post.userId && (
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeletePost(post.id)}
                ></IconButton>
              )}
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
        );
      })}
    </>
  );
};

export default Post;
