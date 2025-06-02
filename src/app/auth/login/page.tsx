// app/auth/signin/page.tsx
'use client'; // クライアントコンポーネントとしてマーク

import React from 'react';
import { useSearchParams } from 'next/navigation'; // URLクエリパラメータを読み込むためのフック
import { signIn } from 'next-auth/react'; // NextAuth.js のサインイン関数
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Googleアイコン (MUI Iconsをインストール済みの場合)

export default function SignInPage() {
  const searchParams = useSearchParams();
  // ログイン後のリダイレクト先URLを取得。指定がなければルートパス ('/') に設定。
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [loading, setLoading] = React.useState(false); // ボタンのローディング状態管理

  const handleGoogleSignIn = async () => {
    setLoading(true); // ローディング開始
    try {
      // Google プロバイダーでサインインを開始
      // callbackUrl を指定することで、ログイン成功後にこのURLへリダイレクトされる
      await signIn('google', { callbackUrl: callbackUrl });
    } catch (error) {
      console.error('Googleサインインエラー:', error);
      // エラー処理（例: ユーザーに通知）
      setLoading(false); // エラー発生時もローディング解除
    }
  };

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
      <Paper elevation={6} sx={{ // 影のレベルを少し上げて強調
        padding: 4,
        textAlign: 'center',
        maxWidth: 400, // 最大幅
        width: '100%', // 常に親要素の100%（maxWidthまで）
        borderRadius: '12px', // 角丸を少し大きく
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // 少し深めの影
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Simple Memo
        </Typography>
        <Typography variant="h6" component="h2" sx={{ mb: 3, color: 'text.secondary' }}>
          ログインしてメモを始めましょう
        </Typography>

        <Button
          variant="contained" // 背景色ありのボタン
          color="primary"      // テーマのプライマリカラー
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />} // ローディング中はスピナー、それ以外はGoogleアイコン
          onClick={handleGoogleSignIn}
          disabled={loading} // ローディング中はボタンを無効化
          sx={{
            mt: 2,
            py: 1.5, // 縦方向のパディングを増やしてボタンを大きく
            fontSize: '1rem',
            textTransform: 'none', // 大文字変換を無効にする (デザインの好みによる)
            width: '80%', // ボタンの幅を調整
            maxWidth: 300,
          }}
        >
          {loading ? 'ログイン中...' : 'Googleでログイン'}
        </Button>
      </Paper>
    </Box>
  );
}