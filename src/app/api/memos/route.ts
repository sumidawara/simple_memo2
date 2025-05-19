import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const MEMOS_DIR = path.join(process.cwd(), 'memos');

// メモ一覧を取得（GET /api/memos）
export async function GET() {
    try {
        const files = await fs.promises.readdir(MEMOS_DIR);
        const fileNames = files.filter(file => fs.statSync(path.join(MEMOS_DIR, file)).isFile());
        return NextResponse.json(fileNames);
    } catch (err) {
        return NextResponse.json({ message: 'ディレクトリの読み込みに失敗しました' }, { status: 500 });
    }
}

// 新規メモ作成（POST /api/memos）
export async function POST() {
    try {
        const newFileName = generateUniqueFileName();
        const newFilePath = path.join(MEMOS_DIR, newFileName);

        // 新しいファイルを作成
        await fs.promises.writeFile(newFilePath, '');
        return NextResponse.json({ message: `新しいファイル「${newFileName}」が作成されました`, fileName: newFileName });
    } catch (err) {
        return NextResponse.json({ message: '新しいファイルの作成に失敗しました' }, { status: 500 });
    }
}

// 新規ファイルの名前を生成する関数
const generateUniqueFileName = () => {
    let counter = 1;
    let fileName = `new${counter}.md`;
    while (fs.existsSync(path.join(MEMOS_DIR, fileName))) {
        counter++;
        fileName = `new${counter}.md`;
    }
    return fileName;
};
