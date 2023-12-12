"use client";

import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { Typography, IconButton, Menu, MenuItem, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, MouseEvent, useEffect } from "react";

import {
  GoogleAuthProvider,
  User,
  auth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "@/lib/firebase";

function useUserSession(initialUser?: User) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (user === undefined) {
        return;
      }

      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
  }, [router, user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser ?? undefined);
    });

    return () => unsubscribe();
  }, []);

  return user;
}

export default function AccountButton({ initialUser }: { initialUser?: User }) {
  const user = useUserSession(initialUser);

  const [anchorElUser, setAnchorElUser] = useState<HTMLElement>();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(undefined);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
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
