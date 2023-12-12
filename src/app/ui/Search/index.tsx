"use client";

import { Search as SearchIcon } from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  InputBase,
  alpha,
  styled,
} from "@mui/material";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  position: "relative",
  flexGrow: 1,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
  },
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.85),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
  },
}));

const StyledInputAdornment = styled(InputAdornment)(({ theme }) => ({
  display: "flex",
  height: "100%",
  padding: theme.spacing(0, 1),
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
}));

export function Search() {
  return (
    <StyledFormControl>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        startAdornment={
          <StyledInputAdornment position="start">
            <SearchIcon />
          </StyledInputAdornment>
        }
      />
    </StyledFormControl>
  );
}
