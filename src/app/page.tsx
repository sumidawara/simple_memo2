'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Header from './components/Header';
import { Box, Button, Divider } from '@mui/material';
import { IMemo, IMemoMeta } from '@/types/IMemoMeta';

import { useSession, signIn, signOut } from 'next-auth/react'; // NextAuth.js のフックをインポート
import { useRouter } from 'next/navigation'; // Next.js のルーターフック

export default function HomePage() {
  const { data: session, status } = useSession(); // 認証セッションと状態を取得
  const router = useRouter(); // ルーターフックを初期化


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

    const data: IMemoMeta[] = await res.json();
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

  // 認証状態の監視とリダイレクト
  useEffect(() => {
    if (status === 'loading') {
      // セッションのロード中は何もしないか、ローディング表示
      return;
    }
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    // 'authenticated' の場合は何もしない（以下でメモリストフェッチが走る）
  }, [status, router]); // status と router を依存配列に追加

  // ログイン後にメモリストをフェッチする useEffect
  useEffect(() => {
    if (status === 'authenticated') {
      fetchMemoList();
    } else if (status === 'unauthenticated') {
      // ログアウトした場合、メモリストをクリア
      setMemometaArray([]);
      setMemo(null);
      setCurrentId(null);
    }
  }, [status]); // status の変更を監視

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

  // ログアウト処理関数
  const handleLogout = async () => {
    // ログアウト後、ホームページにリダイレクトすることを試みます。
    // その後、現在のuseEffectのロジックにより、再度Googleサインインに誘導されます。
    await signOut({ redirect: true, callbackUrl: '/auth/logout' });
  };


  // 認証されていない場合やローディング中は特定のUIを表示
  if (status === 'loading' || status === 'unauthenticated') {
    // ここで表示されるUIが「一瞬表示されるwebui」の一部である可能性があります。
    // もしこのローディングメッセージすら表示したくない場合は、null を返すことも検討できます。
    return <p>Loading or redirecting to sign in...</p>;
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh" sx={{ overflow: 'hidden' }}>

      <Header session={session} handleLogout={handleLogout} />

      {/* メインコンテンツエリア */}
      <Box display="flex" flexGrow={1} sx={{ overflow: 'hidden' }}>
        <Sidebar
          memometaArray={memometaArray}
          currentId={currentId ?? ''}
          onFileSelect={handleFileSelect}
          onDelete={deleteMemo}
          onCreate={createMemo}
        />
        {/* EditorとPreviewがコンテンツ量によって高さが変わる場合、
            flexGrowとoverflow:autoを適切に設定する必要があるかもしれません。
            ここではEditorとPreviewがそれぞれ適切に高さを管理すると仮定します。
        */}
        <Box
          sx={{
            display: 'flex', // Flexboxを有効にする
            flexDirection: 'row', // 子要素を横並びにする（デフォルトでもrowですが明示的に）
            width: '100%', // 親要素の幅いっぱいに広がる
            height: '100%', // 親要素の高さいっぱいに広がる (例: viewport height `vh` や、親要素の高さに応じて設定)
            flexGrow: 1, // 利用可能なスペースを占めるようにする
          }}
        >
          <Box sx={{ flex: 1 }}> {/* Editorが利用可能なスペースの半分を占める */}
            <Editor memo={memo} setMemo={setMemo} />
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }} />

          <Box sx={{ flex: 1 }}> {/* Previewが利用可能なスペースの半分を占める */}
            <Preview text={memo?.content || ''} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
