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
  imageUrl?: string;
  location?: Pick<GeoPoint, "latitude" | "longitude">;
  like_count: number;
  liked: string[];
}

export function convertRaw(doc: { id: string; data(): Review }) {
  const { createdAt, location, ...data } = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: createdAt.toDate(),
    location: location,
  };
}
