"use client";

import { Search as SearchIcon } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

export interface SearchProps {}

const SearchNav = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export function Search(props: SearchProps) {
  return (
    <SearchNav>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </SearchNav>
  );
}
