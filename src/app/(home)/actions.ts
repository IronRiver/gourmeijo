"use server";

import { GeoPoint, Timestamp } from "firebase/firestore";

export interface ReviewDocument {
  title: string;
  author_uid: string;
  author_name: string;
  createdAt: Timestamp;
  content: string;
  imageUrl?: URL;
  location: GeoPoint;
  like_count: number;
  liked: string[];
}
