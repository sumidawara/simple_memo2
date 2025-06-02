'use client';

import { Box, Button, Typography } from '@mui/material';
import { Session } from 'next-auth';
import React from 'react';

type HeaderProps = {
    session: Session | null;
    handleLogout: () => Promise<void>;
};

export default function Header({ session, handleLogout }: HeaderProps) {
    return (
        <Box
            display="flex"
            justifyContent="space-between" // 左端と右端に要素を配置
            alignItems="center"
            p={1}
            sx={{ borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}
        >
            {/* 左側にSimple Memo */}
            <Box
                sx={{
                    fontSize: '1.2rem', // These styles might now be redundant if Typography handles font-size
                    fontWeight: 'bold',  // This can be set on Typography
                    // If you need other Box specific layout styles, keep them here
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>
                    Simple Memo
                </Typography>
            </Box>

            {/* 右側のグループ: メールアドレスとログアウトボタン */}
            <Box display="flex" alignItems="center">
                {session?.user?.email && ( // メールアドレスを表示
                    <Box component="span" sx={{ mr: 2, fontSize: '0.9rem' }}> {/* ログアウトボタンとの間に余白 */}
                        {session.user.email}
                    </Box>
                )}
                <Button variant="outlined" size="small" onClick={handleLogout}>
                    ログアウト
                </Button>
            </Box>
        </Box>
    );
}
