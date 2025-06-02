'use client';

import React from 'react';
import { Box } from '@mui/material';
import { IMemo } from '@/types/IMemoMeta';

type EditorProps = {
  memo: IMemo | null;
  setMemo: (value: IMemo | null) => void;
};

export default function Editor({ memo, setMemo }: EditorProps) {

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    console.log(memo);
    const newContent = e.target.value;
    // memo が null の場合
    if (memo === null) {

    }
    // memo が IMemo オブジェクトの場合は、content と updatedAt を更新
    else {
      setMemo({
        ...memo,
        content: newContent,
        updatedAt: new Date(),
      });
    }
  };

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
        value={memo?.content || ''}
        onChange={handleContentChange}
      />
    </Box>
  );
}
