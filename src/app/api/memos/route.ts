import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';  // MongoDBクライアントの接続用ユーティリティ

//新しいメモを作成
export async function POST(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db('memos-db'); // 使うDB名に変更してください
        const memos = db.collection('memos');

        // 新しいメモのデフォルトデータ
        const newMemo = {
            title: 'Untitled',
            content: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await memos.insertOne(newMemo);

        return NextResponse.json({
            message: 'New memo created',
            memoId: result.insertedId,
        }, { status: 201 });
    } catch (error) {
        console.error('Failed to create memo:', error);
        return NextResponse.json({ error: 'Failed to create memo' }, { status: 500 });
    }
}

//すべてのメモを取得
