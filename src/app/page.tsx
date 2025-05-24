'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { Box, Divider } from '@mui/material';

export default function HomePage() {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  const API_BASE = '/api/memos';

  const fetchMemoList = async () => {
    const res = await fetch(API_BASE);
    return await res.json(); // ['sample1.md', ...]
  };

  const fetchMemoContent = async (memo_id: string) => {
    const res = await fetch(`/api/memos/${memo_id}`);
    return await res.text();
  };

  const saveMemo = async (memo_id: string, content: string) => {
    await fetch(`/api/memos/${memo_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'text/plain' },
      body: content,
    });
  };

  const createMemo = async () => {
    try {
      const res = await fetch('/api/memos', { method: 'POST' });

      if (!res.ok) throw new Error(await res.text());

      const result = await res.json();
      console.log(result.message);

      fetchMemoList().then(setFiles);
    } catch (err: any) {
      console.error('新規作成失敗:', err.message);
      alert('新しいファイルの作成に失敗しました');
    }
  };

  const deleteMemo = async (memo_id: string) => {
    try {
      const res = await fetch(`/api/memos/${memo_id}`, { method: 'DELETE' });

      if (!res.ok) throw new Error(await res.text());

      const result = await res.json();
      console.log(result.message);

      fetchMemoList().then(setFiles);
    } catch (err: any) {
      console.error('削除失敗:', err.message);
      alert('削除に失敗しました');
    }
  };

  //useEffect

  useEffect(() => {
    fetchMemoList().then(setFiles);
  }, []);

  useEffect(() => {
    if (!currentFile) return;

    const timeoutId = setTimeout(() => {
      saveMemo(currentFile, text).catch((err) => {
        console.error('自動保存失敗:', err);
      });
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [text]);

  const handleFileSelect = async (filename: string) => {
    try {
      if (currentFile && currentFile !== filename) {
        await saveMemo(currentFile, text);
      }
      const content = await fetchMemoContent(filename);
      setText(content);
      setCurrentFile(filename);
    } catch (err) {
      console.error('読み込み or 保存失敗:', err);
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Sidebar
        files={files}
        currentFile={currentFile ?? ''}
        onFileSelect={handleFileSelect}
        onDelete={deleteMemo}
        onCreate={createMemo}
      />
      <Editor text={text} setText={setText} />
      <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }} />
      <Preview text={text} />
    </Box>
  );
}
