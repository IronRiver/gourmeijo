"use client";

import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import Map from "react-map-gl/maplibre";

import { collection, db } from "@/lib/firebase";

import type { PostData } from "../page";

import "maplibre-gl/dist/maplibre-gl.css";

function useReviews() {
  const [reviews, setReviews] = useState<PostData[]>([]);
  useEffect(() => {
    const reference = collection(db, "reviews");
    const unsubscribe = onSnapshot(reference, (snapshot) => {
      const datas = snapshot.docs.map(
        (value) => ({ ...value.data(), id: value.id }) as PostData
      );
      console.log(datas);
      setReviews(datas);
    });
    return () => unsubscribe();
  });
  return reviews;
}

export default function MapPage() {
  const reviews = useReviews();
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
        .filter((data): data is Required<typeof data> => data.location != null)
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
