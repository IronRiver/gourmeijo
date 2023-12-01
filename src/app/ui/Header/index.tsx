import {
  AppBar,
  Button,
  InputBase,
  Toolbar,
  Typography,
  styled,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
const StyleToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  display: "flex",
  borderRadius: theme.shape.borderRadius,
}));
export function Header() {
  const [open, setopen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyleToolbar>
        <Typography variant="h6">ぐるMeijo</Typography>
        <Search>
          <InputBase fullWidth={true} placeholder="search..."></InputBase>
        </Search>
        <Button onClick={() => setopen(true)}>
          <Icons>
            <AccountCircleIcon></AccountCircleIcon>
          </Icons>
        </Button>
      </StyleToolbar>
      <Menu
        id="basic-menu"
        open={open}
        onClose={() => setopen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
