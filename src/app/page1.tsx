"use client";
import {
  Box,
  Typography,
  Button,
  AppBar,
  IconButton,
  Toolbar,
  Grid,
  Select,
  MenuItem,
  Paper,
  Rating,
  styled,
} from "@mui/material";

import { Header } from "./ui/Header";
import { useState } from "react";
const items = [
  { id: 1, name: "store 1", rating: 4.5, time: 90, coment: "おいしい" },
  {
    id: 2,
    name: "store 2",
    rating: 3.8,
    time: 9100,
    coment: "あまりおいしくない",
  },
  // ... 他のアイテム
];

export default function Home() {
  const [sortBy, setSortBy] = useState("rating"); // 初期値: 評価順

  const sortedItems = items.slice().sort((a, b) => {
    // 評価順に並び替えるロジック
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    if (sortBy === "latest") {
      return b.time - a.time;
    }
    // 他の並び替えロジックを追加する場合はここに追加
    return 0;
  });
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Box p={3} border={1} height="200%">
              <Typography variant="h6">左側の領域</Typography>
              {/* ここに左側のコンテンツを配置 */}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box p={3} border={1} height="100%">
              <Typography variant="h6">右側の領域</Typography>
              {/* ここに右側のコンテンツを配置 */}
              {/* ソート選択 */}
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  marginBottom: 2,
                  borderRadius: 8, // 角を丸くする
                  width: "50%", // 幅を少し小さくする
                }}
              >
                <MenuItem value="rating">評価順</MenuItem>
                <MenuItem value="popular">人気順</MenuItem>
                <MenuItem value="latest">投稿順</MenuItem>
                {/* 他の選択肢を追加 */}
              </Select>
              {/* アイテム一覧 */}
              {sortedItems.map((item) => (
                <Box key={item.id}>
                  <Paper>
                    <Typography>{item.name}</Typography>
                    <Typography>
                      <Rating name="read-only" value={item.rating} readOnly />
                    </Typography>
                  </Paper>
                  {/* 他のアイテム情報を表示 */}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "skybule",
          color: "#888",
          margin: 5,
          "&:hover": {
            backgroundColor: "lightblue",
          },
        }}
      >
        Mybutton
      </Button>
    </>
  );
}
