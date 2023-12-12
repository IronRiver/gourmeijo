"use client";

import {
  Collections as CollectionsIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathName = usePathname();
  return (
    <Paper
      sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={pathName}>
        <BottomNavigationAction
          LinkComponent={NextLink}
          href="/map"
          label="マップ"
          value="/map"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          LinkComponent={NextLink}
          href="/"
          label="レビュー"
          value="/"
          icon={<CollectionsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
