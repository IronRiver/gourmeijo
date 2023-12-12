"use client";

import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapPage() {
  return (
    <Map
      initialViewState={{
        longitude: 136.9760683,
        latitude: 35.1356448,
        zoom: 14,
      }}
      style={{ flex: "auto" }}
      mapStyle="https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json"
    />
  );
}
