import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';  // MongoDBクライアントの接続用ユーティリティ

//すべてのメモを取得  GET
//新しいメモを作成　　POST

//すべてのメモを取得
export async function GET(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db('memos-db'); // 使うDB名に変更してください
        const memos = db.collection('memos');

        const metadataArray = await memos
            .find({}, { projection: { title: 1, createdAt: 1, updatedAt: 1 } }) // _id はデフォルトで含まれる
            .toArray();
        
        return NextResponse.json(metadataArray, { status: 200 });
    }
    catch (error) {
        console.error('Failed to create memo:', error);
        return NextResponse.json({ error: 'Failed to create memo' }, { status: 500 });
    }
}

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