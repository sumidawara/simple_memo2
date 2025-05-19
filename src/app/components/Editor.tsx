'use client';

import React from 'react';
import { Box } from '@mui/material';

type EditorProps = {
  text: string;
  setText: (value: string) => void;
};

export default function Editor({ text, setText }: EditorProps) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        padding: 2,
        boxSizing: 'border-box',
        backgroundColor: 'transparent',
        borderRadius: 1,
      }}
    >
      <textarea
        style={{
          width: '100%',
          height: '300px',
          padding: '1rem',
          fontFamily: 'monospace',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none',
          resize: 'none',
          backgroundColor: 'transparent',
          color: 'inherit',
          boxSizing: 'border-box',
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Box>
  );
}
