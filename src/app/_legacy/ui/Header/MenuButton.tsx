import { Menu as MenuIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export default function MenuButton() {
  return (
    <IconButton size="large" color="inherit" aria-label="open drawer">
      <MenuIcon />
    </IconButton>
  );
}
