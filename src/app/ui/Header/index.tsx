import { AppBar, Link, Toolbar } from "@mui/material";
import NextLink from "next/link";

import AccountButton from "./AccountButton";
import MenuButton from "./MenuButton";

export function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <MenuButton />
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
          ぐるMeijo
        </Link>
        <AccountButton />
      </Toolbar>
    </AppBar>
  );
}
