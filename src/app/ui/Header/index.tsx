// Header.js
import React, { useState } from "react";
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
import Login from "../../components/Login";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);

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
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const handleLogin = () => {
    // ログイン後の処理
  };

  const handleLogout = () => {
    // ログアウト後の処理
  };

  return (
    <AppBar position="sticky">
      <StyleToolbar>
        <Typography variant="h6">ぐるMeijo</Typography>
        <Search>
          <InputBase fullWidth={true} placeholder="search..."></InputBase>
        </Search>
        <Button onClick={handleMenuToggle}>
          <Icons>
            {user ? (
              <>
                <AccountCircleIcon />
                <Typography variant="body1" style={{ marginLeft: "8px" }}>
                  {user.displayName}
                </Typography>
              </>
            ) : (
              <AccountCircleIcon />
            )}
          </Icons>
        </Button>
      </StyleToolbar>
      <Menu
        id="basic-menu"
        open={open}
        onClose={() => setOpen(false)}
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
        <MenuItem>
          <Login onLogin={handleLogin} onLogout={handleLogout} user={user} />{" "}
          {/* ログインコンポーネント呼び出し */}
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
