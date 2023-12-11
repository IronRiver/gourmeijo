"use client";

import {
  Collections as CollectionsIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

export function Footer() {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="マップ"
          value="map"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="レビュー"
          value="reviews"
          icon={<CollectionsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
