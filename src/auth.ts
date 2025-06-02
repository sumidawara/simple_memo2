// src/auth.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// 型拡張は src/types/next-auth.d.ts で行われます

export const {
  handlers, // APIルートで使います
  auth,     // サーバーコンポーネントやAPIルートでセッションを取得する際に使います
  signIn,   // サインイン処理を開始する際に使います
  signOut   // サインアウト処理を開始する際に使います
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: { // 必要に応じてスコープやプロンプトをカスタマイズ
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // }
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // 最初のサインイン時 (account と profile が存在する)
      if (account && profile) {
        token.accessToken = account.access_token;
        if (profile.sub) { // Googleから提供されるユーザーID
          token.id = profile.sub; // 拡張したJWTのidプロパティに設定
        }
      }
      return token;
    },
    async session({ session, token }) {
      // token オブジェクト (jwtコールバックから返される) からセッション情報を構成
      // token.id (上記jwtコールバックで設定) を session.user.id に割り当て
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      // 他の情報をセッションに追加することも可能
      // if (token.accessToken) {
      //   session.accessToken = token.accessToken as string;
      // }
      return session;
    },
  },
  pages: {
    // signIn: '/auth/signin', // カスタムサインインページがある場合は指定
    // signOut: '/auth/signout',
    // error: '/auth/error', // エラーページ (例: サインイン失敗時)
    // verifyRequest: '/auth/verify-request', // メール認証の確認ページ
    // newUser: '/auth/new-user' // 初めてサインインしたユーザー向けページ (OAuthでは通常不要)
  },
  // セッション戦略 (デフォルトは "jwt")
  // session: {
  //   strategy: "jwt",
  // },
  // デバッグモード (開発環境でのみ有効にすると便利)
  debug: process.env.NODE_ENV === "development",
});