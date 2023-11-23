import {
  Box,
  Typography,
  Button,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";

import { Header } from "./ui/Header";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            🤔
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Button variant="contained">Hello world</Button>
    </Box>
  );
}
