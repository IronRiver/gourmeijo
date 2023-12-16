"use client";

import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { Typography, IconButton, Menu, MenuItem, Button } from "@mui/material";

import { type User } from "firebase/auth";
import { useState, MouseEvent } from "react";

import { signInWithGoogle, signOut } from "@/app/lib/firebase/auth";

import { useAuth } from "../../hooks/useAuth";

export default function AccountButton({ initialUser }: { initialUser?: User }) {
  const user = useAuth(initialUser);

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement>();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(undefined);
  };

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  const handleLogout = async () => {
    await signOut();
    handleCloseUserMenu();
  };

  return user ? (
    <>
      <IconButton size="large" color="inherit" onClick={handleOpenUserMenu}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            void handleLogout();
          }}
        >
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Button
      color="inherit"
      onClick={() => {
        void handleLogin();
      }}
    >
      Login
    </Button>
  );
}
