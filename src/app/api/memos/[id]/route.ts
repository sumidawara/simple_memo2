import fs from 'fs';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const MEMOS_DIR = path.join(process.cwd(), 'memos');/*  */

// メモ内容を取得（GET /api/memos/[id]）
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const client = await clientPromise;
        const db = client.db('memos-db'); 
        const memos = db.collection('memos');

      const { id } = params;
  
      const memo = await memos.findOne({ _id: new ObjectId(id) });
  
      if (!memo) {
        return NextResponse.json({ message: 'メモが見つかりません' }, { status: 404 });
      }
  
      return NextResponse.json(memo);
    } catch (error) {
      console.error('エラー:', error);
      return NextResponse.json({ message: 'サーバーエラー' }, { status: 500 });
    }
  }

// メモを保存（PUT /api/memos/[id]）




// メモを削除（DELETE /api/memos/[id]）
