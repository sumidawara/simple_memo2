'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { Box, Divider } from '@mui/material';
import { IMemo, IMemoMeta } from '@/types/IMemoMeta';

export default function HomePage() {
  const [memo, setMemo] = useState<IMemo | null>(null);
  //const [files, setFiles] = useState<string[]>([]);
  const [memometaArray, setMemometaArray] = useState<IMemoMeta[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const fetchMemoList = async () => {
    const res = await fetch(`/api/memos/`);

    if (!res.ok) { // レスポンスが成功したかを確認 (例: 200 OK)
      console.error('APIからメモリストの取得に失敗しました:', res.status, res.statusText);
      return [];
    }
  
    const data: IMemoMeta[]  = await res.json();
    setMemometaArray(data);

    return data; // パースされたデータを返す
  };

  const fetchMemoContent = async (memo_id: string) => {
    const res = await fetch(`/api/memos/${memo_id}`);

    const data: IMemo = await res.json();
    setMemo(data);

    return data;
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

      fetchMemoList();
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

      fetchMemoList();
    } catch (err: any) {
      console.error('削除失敗:', err.message);
      alert('削除に失敗しました');
    }
  };

  //useEffect

  useEffect(() => {
    fetchMemoList();
  }, []);

  useEffect(() => {
    if (!currentId) return;

    const timeoutId = setTimeout(() => {
      const content = memo?.content || '';
      saveMemo(currentId, content).catch((err) => {
        console.error('自動保存失敗:', err);
      });
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [memo]);

  const handleFileSelect = async (memo_id: string) => {
    try {
      //違うやつを選択したらセーブ
      if (currentId && currentId !== memo_id) {
        const content = memo?.content || '';
        await saveMemo(currentId, content);
      }

      fetchMemoContent(memo_id);
      setCurrentId(memo_id);

    } catch (err) {
      console.error('読み込み or 保存失敗:', err);
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Sidebar
        memometaArray={memometaArray}
        currentId={currentId ?? ''}
        onFileSelect={handleFileSelect}
        onDelete={deleteMemo}
        onCreate={createMemo}
      />
      <Editor memo={memo} setMemo={setMemo} />
      <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }} />
      <Preview text={memo?.content || ''} />
    </Box>
  );
}
