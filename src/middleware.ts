import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth'; // src/auth.ts からインポート

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 保護したいAPIルートのパスを指定 (例: /api/memos/ で始まるすべてのパス)
  if (pathname.startsWith('/api/memos')) {
    const session = await auth(); // セッション情報を取得

    if (!session || !session.user) {
      // 認証されていない場合は、401 Unauthorized レスポンスを返す
      return NextResponse.json(
        { message: '認証されていません。ミドルウェアによって保護されています。' },
        { status: 401 }
      );
    }
  }

  // 認証されているか、保護対象外のルートの場合は、リクエストを続行
  return NextResponse.next();
}

// ミドルウェアを適用するパスを指定します。
// matcher に指定したパスパターンのリクエストに対してのみミドルウェアが実行されます。
export const config = {
  matcher: [
    '/api/memos/:path*', // /api/memos/ およびその下のすべてのパス
    // 他にも保護したいAPIのパスパターンがあれば追加できます
    //例: '/api/another-protected-route/:path*'
  ],
};