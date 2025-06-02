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
    const newContent = e.target.value;
    if (memo === null) {
      // もしメモがnullの場合でも新規作成として扱いたい場合は、
      // ここで新しいIMemoオブジェクトを作成してsetMemoを呼び出すなどの処理が考えられます。
      // 例: setMemo({ id: 'new-temp-id', title: '', content: newContent, createdAt: new Date(), updatedAt: new Date() });
      // ただし、現在の HomePage のロジックでは選択されたメモを編集する想定なので、
      // ここでは何もしないか、エラーをログに出すなどが適切かもしれません。
      // 今回の「縁まで広がる」という修正とは直接関係ないので、既存のロジックを維持します。
    } else {
      setMemo({
        ...memo,
        content: newContent,
        updatedAt: new Date(),
      });
    }
  };

  // memoがnullの場合は何も表示しない
  if (memo === null) {
    return (
      <Box
        sx={{
          // この Box が親の利用可能な領域を全て占めるようにします
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column', // アイコンとテキストを縦に並べる
          alignItems: 'center',    // 水平方向の中央寄せ
          justifyContent: 'center', // 垂直方向の中央寄せ
          color: '#666',           // テキストの色
          border: '0px solid #ccc', // 外側のボーダー（好みで調整）
          borderRadius: '4px',     // 角丸
          backgroundColor: 'transparent', // 背景は透明に
        }}>

        <span style={{ fontSize: '1rem' }}>
          メモを選択してください
        </span>
      </Box>
    );
  }

  return (

    <textarea
      style={{
        width: '100%', // 親Boxの幅いっぱいに広がる
        height: '100%', // ★変更: 固定の高さを解除
        flexGrow: 1, // ★追加: 親Box(display:flex, flexDirection:column)の中で利用可能な高さを占める
        padding: '1rem',
        fontFamily: 'monospace',
        fontSize: '1rem',
        border: '0px solid #ccc',
        borderRadius: '4px',
        outline: 'none',
        resize: 'none', // サイズ変更ハンドルを非表示（必要に応じて 'vertical' などに変更可）
        backgroundColor: 'transparent',
        color: 'inherit', // 親から文字色を継承
        boxSizing: 'border-box',
      }}
      value={memo?.content || ''}
      onChange={handleContentChange}
      placeholder={memo === null ? '' : "ここにメモを入力..."} // placeholderを追加しても良いでしょう
    />
  );
}