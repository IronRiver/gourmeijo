import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

import { Search } from "../Search";
import { Typography } from "../Typography";

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography
          role="title"
          size="large"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          ぐるMeijo
        </Typography>
        <Search />
      </Toolbar>
    </AppBar>
  );
}
