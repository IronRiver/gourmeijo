"use client";
import { Box, Stack } from "@mui/material";
import Leftarea from "./components/leftarea";
import Righatarea from "./components/rightarea";
import { Header } from "./ui/Header";

export default function Home() {
  return (
    <Box>
      <Header />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Leftarea />
        <Righatarea />
      </Stack>
    </Box>
  );
}
