"use client";

import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapPage() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ flex: "auto" }}
      mapStyle="https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json"
    />
  );
}
