import {
  DocumentData,
  Query,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/app/lib/firebase/client";

import { Review, convertRaw } from "@/app/lib/models";

import ReviewListings from "./ui/ReviewListings";

async function getReviews() {
  const q = query(
    collection(db, "reviews"),
    orderBy("like_count", "desc")
  ) as Query<Review, DocumentData>;
  const results = await getDocs(q);
  return results.docs.map((doc) => convertRaw(doc));
}

export default async function HomePage() {
  const reviews = await getReviews();
  return <ReviewListings initialReviews={reviews} />;
}
