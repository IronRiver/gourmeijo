"use client";

import {
  DocumentData,
  Query,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import Map from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
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
    callback(results);
  });

  return unsubscribe;
}

export default function MapPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    const unsubscribe = getRestaurantsSnapshot((data) => setReviews(data));
    return () => unsubscribe();
  });
  return (
    <Map
      initialViewState={{
        longitude: 136.9760683,
        latitude: 35.1356448,
        zoom: 14,
      }}
      style={{ flex: "auto" }}
      mapStyle="https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json"
    >
      {reviews
        .map(({ id, location }) => ({ id, location }))
        .filter(
          (
            data
          ): data is {
            id: string;
            location: {
              latitude: number;
              longitude: number;
            };
          } => data.location != null
        )
        .map(({ id, location: { longitude, latitude } }) => (
          <Marker
            key={id}
            latitude={latitude}
            longitude={longitude}
            anchor="bottom"
          ></Marker>
        ))}
    </Map>
  );
}
