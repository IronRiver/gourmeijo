import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { AppBar, IconButton, Link, SvgIcon, Toolbar } from "@mui/material";
import NextLink from "next/link";

import Icon from "../../../../public/icon.svg?react";

export function Header() {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton size="large" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <Link
          color="inherit"
          underline="none"
          variant="h6"
          component={NextLink}
          href="/"
          sx={{ display: "inline-flex", alignItems: "center" }}
        >
          <SvgIcon>
            <Icon />
          </SvgIcon>
          ぐるMeijo
        </Link>
        <IconButton size="large" color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
