import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Link, SvgIcon } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";

import { Search } from "../Search";

export function Header() {
  return (
    <AppBar position="sticky" sx={{ flexGrow: 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: { xs: 0, sm: 2 } }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          color="inherit"
          underline="none"
          noWrap
          variant="h6"
          component={NextLink}
          href="/"
          sx={{
            display: { xs: "none", sm: "block" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <SvgIcon></SvgIcon> */}
          ぐるMeijo
        </Link>
        <Search />
      </Toolbar>
    </AppBar>
  );
}
