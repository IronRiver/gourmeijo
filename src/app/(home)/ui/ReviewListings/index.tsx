"use client";

import {
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  CardActions,
} from "@mui/material";
import {
  DocumentData,
  Query,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  increment,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { useAuth } from "@/app/(home)/hooks/useAuth";
import { db } from "@/app/lib/firebase/client";
import { Review, convertRaw } from "@/app/lib/models";

type ReviewData = ReturnType<typeof convertRaw>;

export interface ReviewListingsProps {
  initialReviews: ReviewData[];
}

function getRestaurantsSnapshot(callback: (reviews: ReviewData[]) => void) {
  const q = query(
    collection(db, "reviews"),
    orderBy("like_count", "desc")
  ) as Query<Review, DocumentData>;

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const results = snapshot.docs.map((doc) => convertRaw(doc));
    console.log(results);
    callback(results);
  });

  return unsubscribe;
}

export default function ReviewListings(props: ReviewListingsProps) {
  const { initialReviews } = props;

  const [reviews, setReviews] = useState(initialReviews);
  const user = useAuth();

  useEffect(() => {
    const unsubscribe = getRestaurantsSnapshot((data) => setReviews(data));
    return () => unsubscribe();
  });

  const handleDeletePost = async (id: string) => {
    const reviewRef = doc(db, "reviews", id);
    await deleteDoc(reviewRef);
  };

  const handleLikeToggle = async (review: ReviewData) => {
    if (user == null) return;
    const reviewRef = doc(db, "reviews", review.id);
    await updateDoc(
      reviewRef,
      review.liked?.includes(user.uid)
        ? {
            like_count: increment(-1),
            liked: arrayRemove(user.uid),
          }
        : {
            like_count: increment(1),
            liked: arrayUnion(user.uid),
          }
    );
  };

  return (
    <>
      {reviews.map((review) => (
        <Card key={review.id} sx={{ margin: 5 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {review.author.charAt(0)}
              </Avatar>
            }
            action={
              user?.uid === review.uid ? (
                <IconButton
                  aria-label="delete"
                  onClick={() => void handleDeletePost(review.id)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null
            }
            title={`投稿者: ${review.author}`}
            subheader={review.createdAt.toLocaleString("ja-JP", {
              timeZone: "Asia/Tokyo",
            })}
          />

          {review.imageUrl ? (
            <CardMedia
              component="img"
              height="194"
              className="w-auto max-h-[350px] mx-auto my-auto"
              image={review.imageUrl}
              alt=""
            />
          ) : (
            <Typography className="block mx-auto text-center border-b">
              画像なし
            </Typography>
          )}

          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              店名: {review.shopName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              レビュー：{review.content}
            </Typography>

            <Rating
              name={`rating-${review.id}`}
              value={review.rating}
              precision={0.5}
              readOnly
            />
          </CardContent>
          <CardActions disableSpacing>
            {user?.uid === review.uid && (
              <IconButton
                aria-label="delete"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => handleDeletePost(review.id)}
              ></IconButton>
            )}
            <IconButton
              aria-label="add to favorites"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => handleLikeToggle(review)}
            >
              {user && review.liked?.includes(user.uid) ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography>{review.liked?.length}</Typography>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
