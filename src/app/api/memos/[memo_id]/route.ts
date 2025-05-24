import fs from 'fs';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const MEMOS_DIR = path.join(process.cwd(), 'memos');/*  */

// メモ内容を取得（GET /api/memos/[memo_id]）
// メモを保存（PUT /api/memos/[memo_id])
// メモを削除（DELETE /api/memos/[memo_id]）

// メモ内容を取得（GET /api/memos/[memo_id]）
export async function GET(req: NextRequest, props: { params: { memo_id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('memos-db');
    const memos = db.collection('memos');

    const resolvedParams = await props.params;
    const memo_id = resolvedParams.memo_id;

    const memo = await memos.findOne({ _id: new ObjectId(memo_id) });

    if (!memo) {
      return NextResponse.json({ message: 'メモが見つかりません' }, { status: 404 });
    }

    return NextResponse.json(memo);
  } catch (error) {
    console.error('エラー:', error);
    return NextResponse.json({ message: 'サーバーエラー' }, { status: 500 });
  }
}

// メモを保存（PUT /api/memos/[memo_id])
export async function PUT(req: NextRequest, props: { params: { memo_id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('memos-db');
    const memos = db.collection('memos');

    const resolvedParams = await props.params;
    const memo_id = resolvedParams.memo_id;
    
    const content = await req.text();

    const result = await memos.updateOne(
      { _id: new ObjectId(memo_id) },
      { $set: {content: content} }
    );

    if(result.matchedCount == 0)
    {
      return NextResponse.json({ message: 'メモが見つかりません'}, { status: 404});
    }

    return NextResponse.json({ message: '更新成功' });

  }
  catch (error) {
    console.error('エラー:', error);
    return NextResponse.json({ message: 'サーバーエラー' }, { status: 500 });
  }
}

// メモを削除（DELETE /api/memos/[memo_id]）
export async function DELETE(req: NextRequest, props: { params: { memo_id: string } }) {
  try
  {
    const client = await clientPromise;
    const db = client.db('memos-db');
    const memos = db.collection('memos');

    const resolvedParams = await props.params;
    const memo_id = resolvedParams.memo_id;

    const result = await memos.deleteOne({ _id: new ObjectId(memo_id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: 'メモが見つかりませんでした' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'メモを削除しました' },
      { status: 200 }
    );
  }
  catch(error)
  {
    console.error('エラー:', error);
    return NextResponse.json({ message: 'サーバーエラー' }, { status: 500 });
  }
}