import HandymanIcon from "@mui/icons-material/Handyman";
import { AppBar, Toolbar, Typography } from "@mui/material";

import Icon from "../../../public/icon.svg?react";

export default function Maintenance() {
  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Icon height="24px" />
          <Typography variant="h6">ぐるMeijo</Typography>
        </Toolbar>
      </AppBar>
      <main className="flex flex-col items-center mt-8">
        <Typography variant="h1" fontSize="2rem">
          メンテナンス中
        </Typography>
        <HandymanIcon fontSize="large" />
      </main>
    </>
  );
}
