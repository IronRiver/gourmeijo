"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Link } from "@mui/material";
import NextLink from "next/link";

export function Header() {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar className="justify-between">
        <IconButton size="large" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <Link
          color="inherit"
          underline="none"
          variant="h6"
          component={NextLink}
          href="/"
        >
          ぐるMeijo
        </Link>
        <IconButton size="large" color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
