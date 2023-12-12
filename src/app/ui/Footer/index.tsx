"use client";

import {
  Collections as CollectionsIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { Ref, forwardRef } from "react";

const ReplaceLinkBehaviour = forwardRef(function LinkBehaviour(
  props: Omit<NextLinkProps, "replace">,
  ref: Ref<HTMLAnchorElement>
) {
  return <NextLink ref={ref} replace {...props} />;
});

export function Footer() {
  const pathName = usePathname();
  return (
    <Paper
      sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={pathName}>
        <BottomNavigationAction
          LinkComponent={ReplaceLinkBehaviour}
          href="/"
          label="レビュー"
          value="/"
          icon={<CollectionsIcon />}
        />
        <BottomNavigationAction
          LinkComponent={ReplaceLinkBehaviour}
          href="/map"
          label="マップ"
          value="/map"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
