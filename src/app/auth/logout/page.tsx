// app/auth/loggedout/page.tsx
'use client'; // クライアントコンポーネントとしてマーク

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // App Routerの場合のルーター
import { Box, Button, Typography, Paper } from '@mui/material';

export default function LoggedOutPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // 要素を縦に並べる
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // 画面いっぱいの高さ
        backgroundColor: '#f0f2f5', // 背景色
        padding: 2, // 全体のパディング
      }}
    >
      <Paper elevation={3} sx={{
        padding: 4,
        textAlign: 'center',
        maxWidth: 400, // 最大幅
        width: '100%', // 常に親要素の100%（maxWidthまで）
        borderRadius: '8px', // 角丸
      }}>
        <Typography variant="h5" component="h1" gutterBottom>
          ログアウトしました
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ご利用ありがとうございました。
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/auth/login')} // ボタンクリックで即時リダイレクト
          sx={{ mt: 2 }}
        >
          再度ログインする
        </Button>
      </Paper>
    </Box>
  );
}