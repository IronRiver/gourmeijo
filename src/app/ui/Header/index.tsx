import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { AppBar, IconButton, Link, Toolbar } from "@mui/material";
import NextLink from "next/link";

export function Header() {
  return (
    <AppBar position="sticky">
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
          sx={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {/* <SvgIcon>
            <Icon />
          </SvgIcon> */}
          ぐるMeijo
        </Link>
        <IconButton size="large" color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
