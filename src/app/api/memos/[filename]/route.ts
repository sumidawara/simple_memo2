import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const MEMOS_DIR = path.join(process.cwd(), 'memos');/*  */

// メモ内容を取得（GET /api/memos/[filename]）
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return NextResponse.json({ message: 'ファイル名が指定されていません' }, { status: 400 });
    }

    try {
        const filePath = path.join(MEMOS_DIR, filename);
        const content = await fs.promises.readFile(filePath, 'utf8');
        return NextResponse.json(content);
    } catch (err) {
        return NextResponse.json({ message: 'ファイルの読み込みに失敗しました' }, { status: 500 });
    }
}

// メモを保存（PUT /api/memos/[filename]）
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');
    const content = await req.text();

    if (!filename) {
        return NextResponse.json({ message: 'ファイル名が指定されていません' }, { status: 400 });
    }

    try {
        const filePath = path.join(MEMOS_DIR, filename);
        await fs.promises.writeFile(filePath, content);
        return NextResponse.json({ message: '保存成功' });
    } catch (err) {
        return NextResponse.json({ message: '保存に失敗しました' }, { status: 500 });
    }
}

// メモを削除（DELETE /api/memos/[filename]）
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return NextResponse.json({ message: 'ファイル名が指定されていません' }, { status: 400 });
    }

    try {
        const filePath = path.join(MEMOS_DIR, filename);
        await fs.promises.unlink(filePath);
        return NextResponse.json({ message: `ファイル「${filename}」を削除しました` });
    } catch (err) {
        return NextResponse.json({ message: '削除に失敗しました' }, { status: 500 });
    }
}