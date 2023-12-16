import { GeoPoint, Timestamp } from "firebase/firestore";

export interface Users {
  name: string;
}

export interface Review {
  title: string;
  author: string;
  uid: string;
  createdAt: Timestamp;
  shopName: string;
  rating: number;
  content: string;
  imageUrl?: URL;
  location: GeoPoint;
  like_count: number;
  liked: string[];
}

export function convertRaw(doc: { id: string; data(): Review }) {
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: (doc.data() as { createdAt: Timestamp }).createdAt.toDate(),
    location: (doc.data() as { location: GeoPoint }).location.toJSON(),
  };
}
